"use client";
import Chat from "@/components/Chat";
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
  return (
    <div className=" w-full h-screen flex bg-primary font-sans text-text-primary">
      <SideBar />
      <main className="w-[80%] bg-primary/80 ml-[20%] flex flex-col">
        <NavBar chatTitle={chatTitle} setIsDMJChat={setIsDMJChat} />
        <Chat chatTitle={chatTitle} />
      </main>
    </div>
  );
}
