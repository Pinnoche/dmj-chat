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
  const [errorStat, setErrorStat] = useState<string | number>('');
  const chatTitle = isDMJChat ? "DMJ CHAT" : "ZUBIN CHAT";
  const [openDonateModal, setOpenDonateModal] = useState<boolean>(false);
  const [isBlur, setIsBlur] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        await apiClient.get("/auth/me");
        setIsLoading(false);
      } catch (error: any) {
        setErrorStat(error.response?.status || "Unknown error");
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading || errorStat === 401) {
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
    <div className="w-full h-screen flex bg-primary font-sans text-text-primary">
      {isBlur && (
        <div className="w-full h-screen fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="text-white text-lg">See you soon...</div>
        </div>
      )}

      <SideBar setIsBlur={setIsBlur} />
      <main className="w-[80%] bg-primary/80 ml-[20%] flex flex-col">
        <NavBar
          chatTitle={chatTitle}
          setIsDMJChat={setIsDMJChat}
          setOpenDonateModal={setOpenDonateModal}
        />
        <Chat chatTitle={chatTitle} />
        {openDonateModal && (
          <Modal onCancel={() => setOpenDonateModal(false)} />
        )}
      </main>
    </div>
  );
}
