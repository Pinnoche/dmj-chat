"use client";
import Chat from "@/components/Chat";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function Home() {
  const [isDMJChat, setIsDMJChat] = useState<boolean>(true);
  const chatTitle = isDMJChat ? "DMJ CHAT" : "ZUBIN CHAT";
  return (
    <div className=" w-full h-screen flex bg-black font-sans dark:bg-black text-white">
      <SideBar />
      <main className="w-[80%] bg-[#212121] ml-[20%] flex flex-col">
        <NavBar chatTitle={chatTitle} setIsDMJChat={setIsDMJChat} />
        <Chat chatTitle={chatTitle} />
      </main>
    </div>
  );
}
