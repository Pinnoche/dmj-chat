"use client";
import Chat from "@/components/Chat";
import Modal from "@/components/Modal";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { apiClient } from "@/lib/api-client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isDMJChat, setIsDMJChat] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorStat, setErrorStat] = useState<string | number>("");
  const chatTitle = isDMJChat ? "DMJ CHAT" : "ZUBIN CHAT";
  const [openDonateModal, setOpenDonateModal] = useState<boolean>(false);
  const [isBlur, setIsBlur] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/auth/me");
        setUsername(res.data.username);
        setIsLoading(false);
      } catch (error: any) {
        setErrorStat(error.response?.status || "Unknown error");
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading || errorStat === 401 || errorStat === 404) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-primary text-text-primary">
        <div className="flex flex-col items-center">
          <div className="rounded-full border-8 border-t-transparent border-gray-200 h-32 w-32 mb-4 animate-spin"></div>
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-dvh flex bg-primary font-sans text-text-primary overflow-hidden">
      {isBlur && (
        <div className="w-full h-dvh fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="text-white text-lg">See you soon...</div>
        </div>
      )}

      <SideBar
        setIsBlur={setIsBlur}
        handleSideBar={handleSideBar}
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={() => setIsOpen(false)}
        username={username}
      />
      <main
        className={`${
          !isOpen ? "w-full" : "w-[80%] ml-[20%]"
        } flex flex-col bg-primary/80`}
      >
        <NavBar
          chatTitle={chatTitle}
          setIsDMJChat={setIsDMJChat}
          setOpenDonateModal={setOpenDonateModal}
          handleSideBar={handleSideBar}
          isOpen={isOpen}
        />

        <Chat chatTitle={chatTitle} />

        {openDonateModal && (
          <Modal onCancel={() => setOpenDonateModal(false)} />
        )}
      </main>
    </div>
  );
}
