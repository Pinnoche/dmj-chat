"use client";
import Chat from "@/components/Chat";
import Modal from "@/components/Modal";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDMJChat, setIsDMJChat] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      await apiClient.get("/auth/me");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const chatTitle = isDMJChat ? "DMJ CHAT" : "ZUBIN CHAT";
  const [openDonateModal, setOpenDonateModal] = useState<boolean>(false);
  const [isBlur, setIsBlur] = useState<boolean>(false);
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
