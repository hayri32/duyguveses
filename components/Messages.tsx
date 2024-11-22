"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";
import { Lightbulb, Volume2, Star } from "lucide-react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();

  const getTeacherIcon = (content: string) => {
    if (content.toLowerCase().includes("pronunciation")) {
      return <Volume2 className="w-4 h-4 text-blue-500" />;
    }
    if (content.toLowerCase().includes("good") || content.toLowerCase().includes("excellent")) {
      return <Star className="w-4 h-4 text-yellow-500" />;
    }
    return <Lightbulb className="w-4 h-4 text-green-500" />;
  };

  return (
    <motion.div
      layoutScroll
      className="grow rounded-md overflow-auto p-4"
      ref={ref}
    >
      {messages.length === 0 && (
        <div className="text-center text-muted-foreground p-4">
          <h2 className="text-lg font-semibold mb-2">Welcome to your English lesson!</h2>
          <p>I'm your AI English teacher. Let's start learning together!</p>
        </div>
      )}
      
      <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => {
            if (msg.type === "user_message" || msg.type === "assistant_message") {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "bg-card",
                    "border border-border rounded",
                    msg.type === "user_message" ? "ml-auto bg-blue-50" : "bg-green-50"
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                >
                  <div className={cn(
                    "text-xs font-medium leading-none pt-4 px-3",
                    "flex items-center gap-2"
                  )}>
                    {msg.type === "user_message" ? (
                      <span className="text-blue-600">Student</span>
                    ) : (
                      <>
                        <span className="text-green-600">Teacher</span>
                        {getTeacherIcon(msg.message.content)}
                      </>
                    )}
                  </div>
                  <div className="pb-3 px-3 mt-2">
                    {msg.message.content}
                  </div>
                  <Expressions values={{ ...msg.models.prosody?.scores }} />
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;
