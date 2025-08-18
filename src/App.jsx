import React, { useState } from "react";
import QuizSettings from "./components/QuizSetting";
import Quiz from "./components/Quiz";
import { Router,Route } from "react-router-dom";

export default function App() {
  const [settings, setSettings] = useState(null);

  const handleStart = (settings) => {
    setSettings(settings);
  };

  const handleRestart = () => {
    setSettings(null);
  };

  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#95daf7] via-[#d3f4ff] to-[#10a1df] text-white">
    {!settings ? (
      <QuizSettings onStart={handleStart} />
    ) : (
        <Quiz settings={settings} onRestart={handleRestart} />
      )}
      </div>
  );

}