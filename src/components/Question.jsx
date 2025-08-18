import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Question({
  question,
  options,
  onAnswer,
  qNumber,
  total,
  correctAnswer
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(null);
  }, [question]);

  const handleClick = (option) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);
    const correct = option === correctAnswer;
    setIsCorrect(correct);

    // After short delay, tell parent to go to next question
    setTimeout(() => {
      onAnswer(option);
    }, 1500);
  };

  const getButtonClass = (option) => {
    if (!answered) {
      return "bg-white/20 border border-white/30 text-white hover:bg-cyan-500 hover:text-black";
    }
    if (option === correctAnswer) {
      return "bg-green-500 text-white shadow-lg scale-105";
    }
    if (option === selectedOption && option !== correctAnswer) {
      return "bg-red-500 text-white shadow-lg";
    }
    return "bg-gray-500 text-gray-300 opacity-50";
  };

  const progressPercent = (qNumber / total) * 100;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-8">
      
      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-6">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-300 text-center">
          Question {qNumber} of {total}
        </p>
      </div>

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20"
      >
        <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
          {question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {options.map((opt) => (
            <motion.button
              whileHover={{ scale: answered ? 1 : 1.02 }}
              whileTap={{ scale: answered ? 1 : 0.98 }}
              key={opt}
              onClick={() => handleClick(opt)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${getButtonClass(opt)}`}
            >
              {opt}
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {answered && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`mt-6 text-center text-lg font-semibold ${
                isCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              {isCorrect ? "✅ Correct!" : "❌ Wrong!"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
