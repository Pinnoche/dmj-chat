"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function NavBar({
  chatTitle,
  setIsDMJChat,
}: {
  chatTitle: string;
  setIsDMJChat: Dispatch<SetStateAction<boolean>>;
}) {
  const handleX = () => {
    window.open("https://x.com/sentientagi", "_blank");
  };
  return (
    <div className="w-full px-3 py-4 border-b border-white/60 flex items-center justify-between">
      <h2 className="cursor-default">{chatTitle}</h2>
      <div
        onClick={handleX}
        className="w-12 h-12 rounded-full overflow-hidden border border-white/30 cursor-pointer"
      >
        <Image
          src="https://pbs.twimg.com/profile_images/1966252290500710400/iacpKDQc_400x400.jpg"
          alt="sentient_logo"
          width={30}
          height={30}
          className="w-full rounded-full"
        />
      </div>
      <button
        onClick={() => setIsDMJChat((prev) => !prev)}
        className="bg-black text-white px-4 py-2 rounded-2xl cursor-pointer outline-none shadow-md hover:bg-gray-800"
      >
        Switch Model
      </button>
    </div>
  );
}
