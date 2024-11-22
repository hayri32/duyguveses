"use client";

import { cn } from "@/utils";
import { Message } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";

export interface MessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  MessagesProps
>(function Messages({ messages, isLoading }, ref) {
  return (
    <motion.div
      layoutScroll
      className="grow rounded-md overflow-auto p-4"
      ref={ref}
    >
      <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        {messages.length === 0 && !isLoading && (
          <div className="text-base text-muted-foreground">
            Welcome to English Learning Assistant! Ask me anything about:
            • Pronunciation
            • Speaking practice
            • Vocabulary
            • Grammar
          </div>
        )}
        
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-[80%]",
                "bg-card",
                "border border-border rounded",
                msg.role === "user" ? "ml-auto" : ""
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
            >
              <div className="text-xs capitalize font-medium leading-none opacity-50 pt-4 px-3">
                {msg.role === "assistant" ? "Teacher" : "Student"}
              </div>
              <div className="pb-3 px-3">{msg.content}</div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div className="w-[80%] bg-card border border-border rounded">
              <div className="p-3">Thinking...</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;
