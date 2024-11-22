"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  
  return (
    <div className="relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]">
      <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 text-center z-50">
        <h1 className="text-xl font-bold">English Learning Assistant</h1>
        <p className="text-sm opacity-80">Interactive English Practice</p>
      </div>

      <VoiceProvider
        auth={{ 
          type: "accessToken", 
          value: accessToken 
        }}
        onStart={() => {
          console.log("Voice session started");
        }}
        onEnd={() => {
          console.log("Voice session ended");
        }}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }
          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;
              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <div className="mt-16">
          <Messages ref={ref} />
          <Controls />
          <StartCall />
        </div>
      </VoiceProvider>
    </div>
  );
}
