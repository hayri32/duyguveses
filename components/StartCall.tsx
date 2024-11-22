"use client";

import { useVoice } from "@humeai/voice-react";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";

export default function StartCall() {
  const { connect, disconnect, connected } = useVoice();
  
  return (
    <div className="fixed bottom-4 right-4">
      <Button
        size="lg"
        variant={connected ? "destructive" : "default"}
        onClick={() => (connected ? disconnect() : connect())}
      >
        {connected ? (
          <>
            <Square className="w-4 h-4 mr-2" />
            Stop Practice
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-2" />
            Start Speaking
          </>
        )}
      </Button>
    </div>
  );
}
