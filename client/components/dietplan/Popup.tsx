import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Popup = () => {
  const [dietName, setDietName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (dietName.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setDietName("");
        setSubmitted(false);
        router.push("/diet-plan/chat")
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-transparent bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-96">
        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Name your diet plan
          </p>
          <input
            type="text"
            value={dietName}
            onChange={(e) => setDietName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter diet plan name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleContinue}
          disabled={!dietName.trim()}
          className="w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 rounded-md text-white font-medium transition-colors"
        >
          {submitted ? "✓ Submitted!" : "Continue"}
        </button>
        {submitted && (
          <p className="mt-3 text-sm text-green-600 text-center">
            Diet plan "{dietName}" created!
          </p>
        )}
      </div>
    </div>
  );
};

export default Popup;
