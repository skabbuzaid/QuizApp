import React, { useEffect, useState } from "react";
import Question from './Question';
import Result from "./Result";


async function fetchAIQuestions({ topic,topic2, numQuestions, difficulty }) {
const GROQ_API_KEY = topic2;

  const prompt = `
Generate ${numQuestions} multiple choice quiz questions on the topic "${topic}". 
Provide each question with 4 options (one correct answer and three wrong answers), 
indicate the correct answer, and make difficulty level ${difficulty}.

Format the response as a JSON array of objects with properties: 
question (string), options (array of strings), correct_answer (string).

Example:
[
  {
    "question": "What is X?",
    "options": ["A", "B", "C", "D"],
    "correct_answer": "B"
  },
  ...
]
Respond ONLY with JSON array. Do not include any extra text, explanation, or Markdown.
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct", // Your model unchanged
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

  // Log full response to help debugging if needed:
  // console.log("Groq AI raw response:", content);

  try {
    // Use regex to extract the first JSON array in the string
    const match = content.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("No JSON array found in model response.");

    return JSON.parse(match[0]);
  } catch (err) {
    console.error("Failed to parse Groq AI response JSON. Full response:", content);
    throw new Error("Failed to parse Groq AI response JSON. Check the Console of the browser if not then Buy the Prime For this Topic.");
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

    setTimeout(() => {
      setAnswerFeedback(null);

      if (currentIdx + 1 === questions.length) {
        setFinished(true);
      } else {
        setCurrentIdx((idx) => idx + 1);
      }
    }, 1500);
  }

  const getBackgroundClass = () => {
    if (answerFeedback === "correct") {
      return "bg-green-800";
    } else if (answerFeedback === "wrong") {
      return "bg-red-800";
    } else {
      return "bg-gray-800";
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md w-full max-w-xl bg-gray-700 gap-4">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="text-gray-200 text-lg font-medium">Generating quiz questions...</div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 rounded-lg shadow-md w-full max-w-xl bg-white text-center text-red-600">
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
      className={`p-8 rounded-lg shadow-md w-full max-w-1/2 transition-colors duration-500 ${getBackgroundClass()}`}
    >
      <Question
        question={q.question}
        options={q.options}
        onAnswer={handleAnswer}
        qNumber={currentIdx + 1}
        total={questions.length}
        correctAnswer={q.correct_answer}
      />

      <div className="mt-6 flex justify-between items-center text-blue-800 font-semibold text-xl select-none">
        <div>
          Score:{" "}
          <span className="text-blue-600 font-bold">
            {score} / {questions.length}
          </span>
        </div>
        <div>
          Question:{" "}
          <span className="text-blue-600 font-bold">
            {currentIdx + 1} / {questions.length}
          </span>
        </div>
      </div>

      {answerFeedback && (
        <div
          className={`mt-6 text-center font-bold ${
            answerFeedback === "correct"
              ? "text-green-700"
              : "text-red-700"
          }`}
        >
          {answerFeedback === "correct" ? (
            "✓ Correct!"
          ) : (
            <>
              <div>✗ Wrong!</div>
              <div className="mt-1 text-sm text-gray-700">
                Correct answer:{" "}
                <span className="font-semibold">{q.correct_answer}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
