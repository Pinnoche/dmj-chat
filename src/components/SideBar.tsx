"use client";

import { apiClient } from "@/lib/api-client";
import { LogOut, MenuIcon } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function SideBar({
  setIsBlur,
  handleSideBar,
  onClose,
  isOpen,
  username,
}: {
  setIsBlur: (value: boolean) => void;
  handleSideBar: () => void;
  isMobile: boolean;
  onClose: () => void;
  isOpen: boolean;
  username: string;
}) {
  const handleX = () => {
    window.open("https://x.com/dmj_wise", "_blank");
  };

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      handleSideBar();
      setIsBlur(true);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-md:fixed max-md:inset-0 bg-black z-30"
            onClick={onClose}
          >
            <motion.aside
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className={`bg-black w-[20%] max-md:w-[80%] border-r border-white/60 p-4 fixed z-40 top-0 left-0 h-full flex flex-col gap-8`}
            >
              <div className="w-full flex items-center justify-between">
                <div
                  onClick={handleX}
                  className="rounded-full w-20 h-20 border border-white/40 cursor-pointer max-md:w-12 max-md:h-12 overflow-hidden"
                >
                  <Image
                    src="https://pbs.twimg.com/profile_images/1651878382072733697/KtLYM224_400x400.jpg"
                    alt="Logo"
                    priority
                    width={64}
                    height={64}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="sm:hidden flex items-center gap-2 hover:text-white cursor-pointer">
                  {username && (
                    <h2 className="text-white font-semibold max-md:text-sm">
                      Welcome, {username}
                    </h2>
                  )}
                  <MenuIcon
                    onClick={handleSideBar}
                    className="cursor-pointer text-white/70 hover:text-white self-start"
                  />
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p className="max-md:text-[20px] rotate-90 font-semibold animate-pulse text-2xl text-center whitespace-nowrap">
                  CHAT MEMORY COMING SOON!
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-600 mt-auto"
              >
                <LogOut size={18} />
                SignOut
              </button>
              <p className="mt-auto text-xs text-center text-white/60">
                Powered by{" "}
                <a
                  href="https://x.com/dmj_wise"
                  target="_blank"
                  className="font-semibold text-white max-md:text-[8px]"
                >
                  The DMJ&apos;s Team
                </a>{" "}
                © 2025
              </p>
            </motion.aside>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
