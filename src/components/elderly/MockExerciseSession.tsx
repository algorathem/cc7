import React, { useState } from "react";
import { Video, Camera, X } from "lucide-react";

interface MockExerciseSessionProps {
  exerciseName: string;
  onClose: () => void;
}

export default function MockExerciseSession({
  exerciseName,
  onClose,
}: MockExerciseSessionProps) {
  const [mode, setMode] = useState<"idle" | "call" | "record">("idle");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div
        className={`bg-white shadow-lg relative ${
          mode === "idle"
            ? "p-6 w-96 max-w-full rounded-2xl"
            : "w-full h-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-50"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Idle Mode */}
        {mode === "idle" && (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-bold">{exerciseName}</h2>
            <p className="text-gray-600 text-sm">Choose how to do the exercise:</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setMode("call")}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Video className="w-5 h-5" />
                <span>Video Call</span>
              </button>
              <button
                onClick={() => setMode("record")}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Camera className="w-5 h-5" />
                <span>Record</span>
              </button>
            </div>
          </div>
        )}

        {/* Video Call Mode */}
        {mode === "call" && (
          <div className="flex flex-col h-full w-full">
            <div className="flex-1 w-full bg-gray-200 flex items-center justify-center text-4xl">
              👵👴 Simulated Video Call
            </div>
            <div className="p-4 flex justify-center bg-white">
              <button
                onClick={() => setMode("idle")}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
              >
                End Call
              </button>
            </div>
          </div>
        )}

        {/* Record Mode */}
        {mode === "record" && (
          <div className="flex flex-col h-full w-full">
            <div className="flex-1 w-full bg-gray-200 flex items-center justify-center text-4xl">
              🎥 Recording...
            </div>
            <div className="p-4 flex justify-center bg-white">
              <button
                onClick={() => setMode("idle")}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
              >
                Stop Recording
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
