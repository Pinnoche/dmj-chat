"use client";
import { MenuIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function NavBar({
  chatTitle,
  setIsDMJChat,
  setOpenDonateModal,
  handleSideBar,
  isOpen,
}: {
  chatTitle: string;
  setIsDMJChat: Dispatch<SetStateAction<boolean>>;
  setOpenDonateModal: Dispatch<SetStateAction<boolean>>;
  handleSideBar: () => void;
  isOpen: boolean;
}) {
  // const handleX = () => {
  //   window.open("https://x.com/sentientagi", "_blank");
  // };
  return (
    <div className="w-full px-3 py-4 sm:border-b sm:border-white/60 flex items-center justify-between max-sm:px-2">
      {!isOpen && <div  className="md:hidden flex items-center gap-2 hover:text-white cursor-pointer">
        <MenuIcon onClick={handleSideBar} className="cursor-pointer text-white/70 hover:text-white self-start" />
      </div>}
      <h2 className="cursor-default">{chatTitle}</h2>
      {/* <div
        onClick={handleX}
        className="w-12 h-12 rounded-full overflow-hidden border border-white/30 cursor-pointer max-sm:w-8 max-sm:h-8"
      >
        <Image
          src="https://pbs.twimg.com/profile_images/1966252290500710400/iacpKDQc_400x400.jpg"
          alt="sentient_logo"
          width={30}
          height={30}
          className="w-full rounded-full ]"
        />
      </div> */}

      <div className="flex gap-2 items-center">
        <button
          onClick={() => setIsDMJChat((prev) => !prev)}
          className="bg-black text-white px-4 py-2 rounded-2xl cursor-pointer outline-none shadow-md hover:bg-gray-800 max-sm:text-[12px] max-sm:px-2 max-sm:py-1"
        >
          Switch Model
        </button>

        <button
          className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse max-sm:text-[12px] max-sm:px-2 max-sm:py-1"
          onClick={() => setOpenDonateModal(true)}
        >
          🎁 Donate
        </button>
      </div>
    </div>
  );
}
