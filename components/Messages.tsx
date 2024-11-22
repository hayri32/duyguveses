use client;

import { type Message } from "ai";
import { useRef } from "react";

export interface MessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function Messages({ messages, isLoading }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.length === 0 && !isLoading && (
        <div className="whitespace-pre-wrap">
          <p className="text-base text-muted-foreground">
            Welcome to English Learning Assistant! You can:
            • Ask for pronunciation help
            • Practice speaking exercises
            • Learn new vocabulary
            • Get grammar explanations
          </p>
        </div>
      )}
      
      <div className="space-y-4 mt-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`
              flex
              ${message.role === "user" ? "justify-end" : "justify-start"}
            `}
          >
            <div
              className={`
                whitespace-pre-wrap
                max-w-[90%]
                rounded-lg
                px-4
                py-2
                ${message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"}
              `}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2">
              Thinking...
            </div>
          </div>
        )}
      </div>
      
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
