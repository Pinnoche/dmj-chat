import copyToClipboardFallback from "@/lib/copyToClipboard";
import { Copy, X } from "lucide-react";
import { toast } from "react-toastify";

export default function Modal({ onCancel }: { onCancel: () => void }) {
  const copyToClipboard = (text: string) => {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(text)
        .catch(() => copyToClipboardFallback(text));
    } else {
      copyToClipboardFallback(text);
    }
  };
  return (
    <div className="w-full h-full fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center px-4">
      <div className="bg-[#0E1514] rounded-xl border border-gray-50/30 w-full max-w-sm sm:max-w-md py-8 relative shadow-xl flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        <div className="w-full px-8">
          <div className="flex justify-end items-center">
            <button
              onClick={onCancel}
              className="text-white hover:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-8 pt-6">
          <h2 className="text-2xl font-semibold mb-3 text-center">
            Support DegenXpert 🚀
          </h2>

          <p className="mb-3 text-sm text-gray-300 text-center">
            If this AI helps your trading journey, you can support ongoing
            development and infrastructure.
          </p>

          <p className="mb-4 text-sm text-gray-400 text-center">
            Contributions are optional and greatly appreciated by the community.
          </p>

          <div className="flex justify-center items-center flex-col gap-2 mt-4">
            <p className="text-sm">Send SOL to this address:</p>

            <p className="flex items-center gap-2 text-xs break-all text-green-400">
              8gB4HxAW4efE8xQteo2NcoJFx27uVadNKKYv9pgTzB5r
              <Copy
                onClick={() => {
                  copyToClipboard(
                    "8gB4HxAW4efE8xQteo2NcoJFx27uVadNKKYv9pgTzB5r"
                  );
                  toast.success("Wallet address copied");
                }}
                className="cursor-pointer hover:text-green-600"
              />
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Thank you for supporting the project ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
