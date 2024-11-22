"use client";

import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="fixed inset-0 p-4 flex flex-col items-center justify-center bg-background"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your English Lesson</h2>
            <p className="text-gray-600 mb-2">Try saying:</p>
            <ul className="space-y-2 text-blue-600">
              <li>"Hello, I want to practice English"</li>
              <li>"Can you help me with pronunciation?"</li>
              <li>"Let's have a conversation"</li>
            </ul>
          </div>
          
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className="z-50 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg"
                onClick={() => {
                  connect()
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {});
                }}
              >
                <Mic className="w-5 h-5" />
                <span>Start English Lesson</span>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
