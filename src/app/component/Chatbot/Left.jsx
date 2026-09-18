"use client";

import { useState } from "react";
import { Bot, Send, Monitor } from "lucide-react";
import { careerPaths } from "@/Data/data1";

export default function CareerChat() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    alert(message);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-white border-slate-200 border rounded-2xl p-4 md:p-8">

      {/* Chat */}
      <div className=" rounded-lg p-3 min-h-[650px]">

        <h1 className="sm:text-lg text-base font-bold mb-10">
          Chat with AI Assistant
        </h1>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-[#eeeeff] flex items-center justify-center text-blue-500">
            <Bot />
          </div>

          <div className="bg-[#e4e4fa] rounded-xl p-5 max-w-xl">
            <b>Hi there!</b>

            <p className="text-gray-600">
              I'm your AI career assistant. How can I help you today?
            </p>

            <p className="text-sm text-gray-400 mt-5">
              10:30 AM
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="mt-[400px]">
          <div className="flex items-center border rounded-xl p-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your career questions..."
              className="flex-1 outline-none px-3"
            />

            <button
              onClick={sendMessage}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center"
            >
              <Send />
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-5">
            AI responses may not be perfect. Please verify important information.
          </p>
        </div>
      </div>

      {/* Career Paths */}
      <div className="bg-white border border-slate-200 rounded-2xl mt-3 p-6">

        <div className="flex justify-between mb-5">
          <h2 className="sm:text-lg text-base font-bold">
            Explore Career Paths
          </h2>

          <button className="text-blue-600 font-semibold transition-all duration-300 hover:text-blue-800 hover:underline hover:translate-x-1">
  View All Career →
</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {careerPaths.map((career, index) => (
            <CareerCard key={index} career={career} />
          ))}
        </div>

      </div>
    </div>
  );
}

function CareerCard({ career }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex gap-4">
        <div className="w-16 h-16 bg-[#eeeeff] rounded-xl flex items-center justify-center text-blue-500">
          <Monitor size={30} />
        </div>

        <div>
          <h3 className="font-semibold">
            {career.title}
          </h3>

          <p className="text-gray-400">
            {career.growth}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-gray-400">
          Avg. Salary
        </p>

        <p className="font-semibold">
          {career.salary}
        </p>
      </div>

    </div>
  );
}