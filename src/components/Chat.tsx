"use client";
import { apiClient } from "@/lib/api-client";
import { mockChats } from "@/lib/chats";
import { ChatType } from "@/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Chat({ chatTitle }: { chatTitle: string }) {
  const [messageList, setMessageList] = useState<ChatType[]>(mockChats);
  const [dmjmessageList, setDmjMessageList] = useState<ChatType[]>(mockChats);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const lastMsgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userMessage.trim() === "") return;
    try {
      const newMessage: ChatType = {
        id: messageList.length + 1,
        sender: "user",
        message: userMessage,
        timestamp: new Date(),
      };

      setIsProcessing(true);

      if (chatTitle === "DMJ CHAT") {
        setDmjMessageList((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setMessageList((prevMessages) => [...prevMessages, newMessage]);
      }
      const text = userMessage;
      setUserMessage("");

      if (chatTitle === "DMJ CHAT") {
        console.log(messageList);
        const res = await apiClient.post(
          `${process.env.NEXT_PUBLIC_API_URL2}/api/v1/agents/ask`,
          {
            question: text,
          },
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_DMJ_API_KEY || "",
            },
          }
        );
        const botMessage: ChatType = {
          id: dmjmessageList.length + 2,
          sender: "assistant",
          message: res.data,
          timestamp: new Date(),
        };
        setDmjMessageList((prevMessages) => [...prevMessages, botMessage]);
        setIsProcessing(false);
        return;
      }
      const execute = await apiClient.post(
        "/executions",
        {
          goal: text,
        },
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_ZUBIN_API_KEY || "",
          },
        }
      );
      const executionId = execute.data.execution_id;
      const executions = async (executionId: string) => {
        const botMsg = await apiClient.get(`/executions/${executionId}`, {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_ZUBIN_API_KEY || "",
          },
        });

        if (botMsg.data.status === "running") {
          setTimeout(() => executions(executionId), 5000);
        } else if (botMsg.data.status === "completed") {
          const botMessage: ChatType = {
            id: messageList.length + 2,
            sender: "assistant",
            message: botMsg.data.final_result.result,
            timestamp: new Date(),
          };
          setMessageList((prevMessages) => [...prevMessages, botMessage]);
          setIsProcessing(false);
        }
      };

      await executions(executionId);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full px-16 py-6 flex-1 flex flex-col justify-between overflow-y-auto">
      <div className="w-full flex-1 overflow-y-auto space-y-8 p-2 custom-scrollbar">
        {chatTitle === "DMJ CHAT"
          ? dmjmessageList.length > 0 &&
            dmjmessageList.map((chat) => (
              <div
                key={chat.id}
                className={`w-full flex flex-col gap-6 pb-3 ${
                  chat.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`w-full flex items-start gap-4`}>
                  <p
                    className={`px-2 py-3 rounded-2xl ${
                      chat.sender === "user"
                        ? "bg-black ml-auto"
                        : "bg-neutral-800"
                    }`}
                  >
                    {chat.message}
                  </p>
                  {chat.sender === "user" && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/izie.png"
                        alt="userPP"
                        width={40}
                        height={40}
                        className="w-full rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          : messageList.length > 0 &&
            messageList.map((chat) => (
              <div
                key={chat.id}
                className={`w-full flex flex-col gap-6 pb-3 ${
                  chat.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`w-full flex items-start gap-4`}>
                  <p
                    className={`px-2 py-3 rounded-2xl ${
                      chat.sender === "user"
                        ? "bg-black ml-auto"
                        : "bg-neutral-800"
                    }`}
                  >
                    {chat.message}
                  </p>
                  {chat.sender === "user" && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/izie.png"
                        alt="userPP"
                        width={40}
                        height={40}
                        className="w-full rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
        {isProcessing && (
          <div className="w-full flex flex-col gap-6 pb-3">
            <div className="w-full flex items-start gap-4">
              <p className="px-2 py-3 rounded-2xl bg-neutral-800 animate-pulse">
                Agent is typing...
              </p>
            </div>
          </div>
        )}
        <div ref={lastMsgRef}></div>
      </div>
      <div className="w-full sticky bottom-0 pt-3 mt-4 backdrop-blur-md">
        <form className="w-full relative" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask Questions Here"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="w-full border border-white/60 rounded-3xl px-20 py-5 outline-none"
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-4 p-2 hover:bg-black rounded-full cursor-pointer">
            <Plus className="w-7 h-7 text-white/60" />
          </div>
          <button
            onClick={handleSubmit}
            className={`absolute top-1/2 right-4 -translate-y-1/2 text-black px-4 py-1 rounded-4xl ${
              !userMessage || isProcessing
                ? "cursor-default bg-white/60"
                : "bg-white cursor-pointer hover:bg-white/90"
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
