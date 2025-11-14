export interface ChatType {
  id: number;
  sender: "user" | "assistant" | string;
  message: string;
  timestamp: Date | string;
}
