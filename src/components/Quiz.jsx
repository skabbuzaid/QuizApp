   import React, { useEffect, useState } from "react";
import Question from "./Question";
import Result from "./Result";
import { motion } from "framer-motion";

// Fetch Questions
async function fetchAIQuestions({ topic, topic2, numQuestions, difficulty }) {
  const GROQ_API_KEY = topic2;

  const prompt = `
Generate ${numQuestions} multiple choice quiz questions on the topic "${topic}". 
Provide each question with 4 options (one correct answer and three wrong answers), 
indicate the correct answer, and make difficulty level ${difficulty}.

Format the response as a JSON array of objects with properties: 
question (string), options (array of strings), correct_answer (string).
Respond ONLY with JSON array.
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    let errorMsg = "Failed to fetch questions from Groq AI.";
    try {
      const errorJson = await response.json();
      if (errorJson.error) errorMsg = errorJson.error;
    } catch {}
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  try {
    const match = content.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("No JSON array found in model response.");
    return JSON.parse(match[0]);
  } catch (err) {
    console.error("Failed to parse Groq AI response JSON. Full response:", content);
    throw new Error("Failed to parse Groq AI response JSON.");
  }
}

export default function Quiz({ settings, onRestart }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  // NEW: optional voice toggle
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    setFinished(false);
    setScore(0);
    setCurrentIdx(0);
    setAnswerFeedback(null);

    fetchAIQuestions(settings)
      .then((qs) => {
        setQuestions(qs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load questions.");
        setLoading(false);
      });
  }, [settings]);

  function handleAnswer(selected) {
    if (finished) return;

    const isCorrect = selected === questions[currentIdx].correct_answer;

    if (isCorrect) {
      setScore((score) => score + 1);
      setAnswerFeedback("correct");
    } else {
      setAnswerFeedback("wrong");
    }

    // Wait 3s instead of 1.5s → shows correct answer clearly
    setTimeout(() => {
      setAnswerFeedback(null);

      if (currentIdx + 1 === questions.length) {
        setFinished(true);
      } else {
        setCurrentIdx((idx) => idx + 1);
      }
    }, 3000);
  }

  const getBackgroundClass = () => {
    if (answerFeedback === "correct") return "bg-green-800";
    if (answerFeedback === "wrong") return "bg-red-800";
    return "bg-gray-800";
  };

  // --- TTS (Future: Murf integration)
  const speak = (text) => {
    if (!voiceEnabled) return;
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  useEffect(() => {
    if (questions.length && voiceEnabled) {
      speak(`Question ${currentIdx + 1}. ${questions[currentIdx].question}`);
    }
  }, [currentIdx, questions, voiceEnabled]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-gray-700 gap-4">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="text-gray-200 text-lg font-medium">Generating quiz questions...</div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 rounded-lg shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white text-center text-red-600">
        <p className="mb-4">{error}</p>
        <button
          onClick={onRestart}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Back
        </button>
      </div>
    );

  if (finished) return <Result score={score} total={questions.length} onRestart={onRestart} />;

  const q = questions[currentIdx];

  return (
    <div
      className={`p-8 rounded-lg shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 transition-colors duration-500 ${getBackgroundClass()}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Question {currentIdx + 1}</h2>
        <button
          onClick={() => setVoiceEnabled((v) => !v)}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}
        </button>
      </div>

      <Question
        question={q.question}
        options={q.options}
        onAnswer={handleAnswer}
        qNumber={currentIdx + 1}
        total={questions.length}
        correctAnswer={q.correct_answer}
      />

      <div className="mt-6 flex justify-between items-center text-blue-200 font-semibold text-lg sm:text-xl select-none">
        <div>
          Score:{" "}
          <span className="text-blue-400 font-bold">
            {score} / {questions.length}
          </span>
        </div>
        <div>
          Question:{" "}
          <span className="text-blue-400 font-bold">
            {currentIdx + 1} / {questions.length}
          </span>
        </div>
      </div>

      {answerFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-6 text-center font-bold ${
            answerFeedback === "correct" ? "text-green-400" : "text-red-400"
          }`}
        >
          {answerFeedback === "correct" ? (
            "✓ Correct!"
          ) : (
            <>
              <div>✗ Wrong!</div>
              <div className="mt-1 text-sm text-gray-200">
                Correct answer:{" "}
                <span className="font-semibold text-white">{q.correct_answer}</span>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

