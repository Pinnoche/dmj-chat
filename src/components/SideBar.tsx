"use client";

import { apiClient } from "@/lib/api-client";
import { LogOut } from "lucide-react";
import Image from "next/image";

export default function SideBar({
  setIsBlur,
}: {
  setIsBlur: (value: boolean) => void;
}) {
  const handleX = () => {
    window.open("https://x.com/dmj_wise", "_blank");
  };

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      setIsBlur(true);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="w-[20%]  border-r border-white/60 p-4 fixed top-0 left-0 h-full flex flex-col gap-8">
      <div
        onClick={handleX}
        className="rounded-full w-16 h-16 border border-white/30 cursor-pointer max-sm:w-12 max-sm:h-12 overflow-hidden"
      >
        <Image
          src="https://pbs.twimg.com/profile_images/1651878382072733697/KtLYM224_400x400.jpg"
          alt="Logo"
          priority
          width={64}
          height={64}
          className="w-full h-full rounded-full "
        />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <p className="max-sm:text-[20px] rotate-90 font-semibold animate-pulse text-2xl text-center whitespace-nowrap">
          CHAT MEMORY COMING SOON!
        </p>
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center gap-2 hover:text-red-700 cursor-pointer"
      >
        <LogOut className="cursor-pointer text-red-500 hover:text-red-700 self-end" />
        SignOut
      </div>
      <p className="mt-auto text-xs text-center text-white/60">
        Powered by{" "}
        <a
          href="https://x.com/sentientagi"
          target="_blank"
          className="font-semibold text-white max-sm:text-[8px]"
        >
          SentientAGI ROMA v2
        </a>{" "}
        © 2025
      </p>
    </div>
  );
}
