"use client";

import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

  const suggestions = [
    "Hi! I'm Sarah, your English teacher. How can I help you today?",
    "Would you like to practice basic conversation?",
    "Let's learn some useful daily phrases.",
    "We can work on your pronunciation together."
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 w-full p-4 flex flex-col items-center",
      "bg-gradient-to-t from-card via-card/90 to-card/0"
    )}>
      {status.value === "connected" && (
        <div className="max-w-2xl w-full mb-4 flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 cursor-pointer"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className="size-4" />
              ) : (
                <Mic className="size-4" />
              )}
            </Toggle>

            <div className="relative grid h-8 w-48 shrink grow-0">
              <MicFFT fft={micFft} className="fill-current" />
            </div>

            <Button
              className="flex items-center gap-1"
              onClick={() => {
                disconnect();
              }}
              variant="destructive"
            >
              <span>
                <Phone
                  className="size-4 opacity-50"
                  strokeWidth={2}
                  stroke="currentColor"
                />
              </span>
              <span>End Session</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
