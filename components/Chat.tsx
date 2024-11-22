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
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 text-center z-50">
        <h1 className="text-xl font-bold">English Learning Assistant</h1>
        <p className="text-sm opacity-80">Practice Speaking & Pronunciation</p>
      </div>

      {/* Main Content */}
      <div className="mt-16"> {/* Add margin-top to account for fixed header */}
        <VoiceProvider
          auth={{ 
            type: "accessToken", 
            value: accessToken 
          }}
        >
          <Messages ref={ref} />
          <Controls />
          <StartCall />
        </VoiceProvider>
      </div>
    </div>
  );
}
