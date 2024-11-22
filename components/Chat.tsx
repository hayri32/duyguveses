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

  const teacherConfig = {
    persona: {
      role: "English Teacher",
      name: "James",
      description: "A friendly and patient English teacher who helps students improve their pronunciation and speaking skills.",
      systemPrompt: `You are James, an experienced and encouraging English teacher. Your goals are to:
- Help students improve their pronunciation
- Correct grammar mistakes gently
- Give positive reinforcement
- Engage in natural conversations
- Provide clear explanations
- Be patient and supportive
Always maintain a friendly, professional teaching tone.`
    },
    voice: {
      languageCode: "en-US",
      name: "Michael", // Erkek ses
      speakingRate: 0.9 // Anlaşılır hız için biraz yavaş
    },
    conversation: {
      temperature: 0.7,
      keepTurn: false,
      modelName: "anthropic/claude-3-sonnet",
      initialPrompt: "Hi! I'm James, your English teacher. I'll help you practice speaking and improve your English skills. Would you like to practice conversation, pronunciation, or learn new vocabulary?"
    }
  };

  return (
    <div className="relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]">
      <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 text-center z-50">
        <h1 className="text-xl font-bold">English Learning Assistant</h1>
        <p className="text-sm opacity-80">Practice with Mr. James</p>
      </div>

      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        config={teacherConfig}
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
