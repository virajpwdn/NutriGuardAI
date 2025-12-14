"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import { baseUrl } from "@/lib/utils";
import axios from "axios";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const socket = io("http://localhost:2001");

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi Sarah! 👋 To personalize your diet plan, I'd love to learn more about you. Could you share the following details? 1. What's your primary goal? (Weight Loss, Weight Gain, or Maintain) 2. What are your favorite foods? 3. What's your height? 4. What's your current weight? 5. How frequently do you work out? 6. Which country are you from? I ask about your location so I can recommend foods that are readily available in your region",
      sender: "other",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [markdown, setMarkdown] = useState("");

  const handleSend = async () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: inputValue, sender: "user" },
      ]);
      const response = await axios.post(`${baseUrl}/ai/dietplan`, {
        data: inputValue,
      });
      if (response.data) {
        setMessages([
          ...messages,
          { id: messages.length + 1, text: response.data, sender: "other" },
        ]);
      }
      console.log("RESPONSE API CALL -> ", response.data);
      setInputValue("");
    }
  };

  socket.on("diet-plan", (data) => {
    console.log("data on frontend -> ", data);
    setMarkdown(data.content);
    setMessages([
      ...messages,
      { id: messages.length + 1, text: data.content, sender: "other" },
    ]);
  });

  return (
    <div className="flex flex-col h-screen w-full bg-white md:bg-linear-to-b md:from-gray-50 md:to-white max-w-200 mx-auto border-l border-r border-zinc-200">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 md:px-8 py-4 md:py-6 sticky top-0 backdrop-blur-sm bg-opacity-95">
        <h2 className="text-xl md:text-2xl font-semibold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Conversation
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1">AI Assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8 space-y-4 md:space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } animate-fade-in`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 md:px-5 md:py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none shadow-md"
                  : "bg-gray-100 text-gray-900 rounded-bl-none shadow-sm"
              }`}
            >
              {msg.sender === "other" ? (
                <div className="prose prose-sm md:prose-base max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 md:gap-3 items-end">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), handleSend())
              }
              placeholder="Message..."
              className="flex-1 px-4 md:px-5 py-3 md:py-4 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white resize-none"
            />
            <button
              onClick={handleSend}
              className="p-3 md:p-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:scale-95 transition-all duration-150 flex items-center justify-center shadow-md hover:shadow-lg"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
