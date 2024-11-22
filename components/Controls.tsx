"use client";

import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, Square } from "lucide-react";

export default function Controls() {
  const { connect, disconnect, connected, status } = useVoice();

  const suggestions = [
    "Help me learn English",
    "Teach me new vocabulary",
    "Practice pronunciation with me",
    "Let's have a conversation"
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
      <div className="flex flex-col items-center max-w-2xl mx-auto gap-4">
        {status.value === "connected" && (
          <div className="flex flex-wrap justify-center gap-2 w-full">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 cursor-pointer"
              >
                "{suggestion}"
              </div>
            ))}
          </div>
        )}
        
        <Button
          size="lg"
          variant={connected ? "destructive" : "default"}
          onClick={() => (connected ? disconnect() : connect())}
          className="w-full sm:w-auto"
        >
          {connected ? (
            <><Square className="w-4 h-4 mr-2" />Stop</>
          ) : (
            <><Mic className="w-4 h-4 mr-2" />Start Speaking</>
          )}
        </Button>
      </div>
    </div>
  );
}
