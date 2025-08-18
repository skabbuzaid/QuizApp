import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck, Brain, Rocket, Code2, Lock, Database, Crown, Play, LogIn
} from "lucide-react";


const questionNums = [10, 15, 20, 30];
const difficulties = ["easy", "medium", "hard"];

export default function QuizSettings({ onStart }) {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [topic2, setTopic2] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const suggestedTopics = [
    "General Knowledge",
    "Science",
    "Mathematics",
    "History",
    "Geography",
    "Computer Basics",
    "Artificial Intelligence",
    "Machine Learning",
    "JavaScript",
    "Python",
    "React",
  ];

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleTopicClick = (suggested) => {
    setTopic(suggested);
  };

  const startQuiz = () => {
    localStorage.setItem("groq_api_key", topic2);
    if (topic.trim() !== "") {
      setLoading(true);
      setTimeout(() => {
        onStart({ topic: topic.trim(), numQuestions, difficulty, topic2 });
      }, 1000);
    }
  };
  const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };


  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-r from-[#181818] via-[#1e1e2f] to-[#0e0e15] text-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-5 shadow-lg bg-[#1e1e2f] backdrop-blur-md ">
        <img src="/Logo.png" alt="LOGO" className="w-28 drop-shadow-lg invert" />
        <div className="text-2xl text-blue-400 font-semibold max-[600px]:hidden">Create, <span className="text-3xl text-blue-600 underline">Quiz</span> With the Grok Api Key.</div>
        <div className="flex  max-[425px]:flex-col items-center gap-6">

          {user ? (
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500 text-white font-bold cursor-pointer"
              title={user.email}
            >
              {user.email.charAt(0).toUpperCase()}
            </div>
          ) : (
            <>
              <button
                onClick={() => window.open("https://github.com/skabbuzaid", "_blank")}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-all active:scale-[.98]"
              >
                <LogIn className="h-4 w-4" /> GO To GitHub! <span className="max-md:hidden">, See My Idea's</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Quiz Form */}
      <div className="flex flex-row-reverse gap-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl shadow-2xl w-1/2 max-md:w-full m-auto bg-white/20 backdrop-blur-xl border border-white/20"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Create Your Premium Quiz
          </h2>

          {/* Topic Input */}
          <label className="block mb-2 font-medium">Enter Grok Api Key! Scroll, To Help</label>
          <input
            type="text"
            value={topic2}
            onChange={(e) => setTopic2(e.target.value)}
            placeholder="E.g., gsk-...... "
            className="w-full p-3 mb-4 rounded-lg bg-[#252542] border-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
          />
          <label className="block mb-2 font-medium">Topic / Question Theme</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., JavaScript, React best practices"
            className="w-full p-3 mb-4 rounded-lg bg-[#252542] border-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
          />

          {/* Trending Topics */}
          <h2 className="text-xl font-semibold pb-2">Top Trending</h2>
          <div className="flex flex-wrap gap-3">
            {suggestedTopics.map((suggested, index) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={index}
                onClick={() => handleTopicClick(suggested)}
                className={`px-4 py-2 rounded-lg shadow-md transition ${topic === suggested
                  ? "bg-cyan-500 text-white"
                  : "bg-white/20 text-gray-200 hover:bg-cyan-500 hover:text-white"
                  }`}
              >
                {suggested}
              </motion.button>
            ))}
          </div>

          {/* Question Count */}
          <label className="block mb-1 font-medium pt-4">Number of Questions</label>
          <select
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full p-3 mb-4 rounded-lg bg-[#252542] text-white border-none focus:ring-2 focus:ring-cyan-400"
          >
            {questionNums.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          {/* Difficulty */}
          <label className="block mb-1 font-medium">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-[#252542] text-white border-none focus:ring-2 focus:ring-cyan-400"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>

          {/* Start Button */}
          <motion.button
            onClick={startQuiz}
            disabled={!topic || loading || !topic2}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className="w-full text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 disabled:opacity-50 px-5 py-3 rounded-lg shadow-lg transition-all"
          >
            {loading ? "Loading..." : "🚀 Get Started"}
          </motion.button>
          <div className="flex items-center justify-center mt-3">
            <p className="text-lg">Help For The Grok Api Key! <a
              href="https://groq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-400"
            >
              Go, To Link!
            </a>
            </p>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="
        w-1/2 min-h-[70vh] p-8 md:p-10 rounded-2xl shadow-xl
        border border-slate-200 max-md:hidden
        bg-gradient-to-br from-sky-50/50 via-white/50 to-indigo-50/30
      "
        >
          {/* Top: name + secure tag */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">
              IAmZaid
            </h1>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-700">
              <ShieldCheck className="h-4 w-4" />
              Secure Login • Premium-ready
            </div>

            {/* About me */}
          </div>

          {/* Highlights grid (boxes) */}
          <div className="flex flex-col gap-4 md:gap-5 mb-8">
            <a href="https://github.com/skabbuzaid/NetflixClone.jsx" target="_blank" rel="noopener noreferrer">
              <InfoBox
                icon={Brain}
                title="AI Quiz (Unlimited)"
                desc="React + Tailwind • Groq/OpenAI ready • instant feedback"
              />
            </a>

            <a href="https://github.com/skabbuzaid/NetflixClone.jsx" target="_blank" rel="noopener noreferrer">
              <InfoBox
                icon={Code2}
                title="Netflix Clone"
                desc="Clean UI, browsing flows, auth & routing"
              />
            </a>

            <a href="https://github.com/skabbuzaid/NetflixClone.jsx" target="_blank" rel="noopener noreferrer">
              <InfoBox
                icon={Lock}
                title="Password Saver"
                desc="Secure patterns, auth flows, tidy UX"
              />
            </a>

            <a href="https://github.com/skabbuzaid/NetflixClone.jsx" target="_blank" rel="noopener noreferrer">
              <InfoBox
                icon={Database}
                title="API Keys 101"
                desc="Safe storage, usage limits, env secrets"
              />
            </a>

          </div>

          {/* Stats (compact) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatBox value="50+" label="Projects" />
            <StatBox value="3+" label="Years Exp" />
            <StatBox value="99%" label="Uptime" />
            <StatBox value="24/7" label="Support" />
          </div>

          {/* Calls to action */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-medium text-slate-800 hover:bg-gray-950 transition"
            >
              <Rocket className="h-5 w-5 invert-100" />
              <a
                href="https://github.com/skabbuzaid?tab=projects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                See My Idea's
              </a>
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50 transition"
            >
              <Rocket className="h-5 w-5" />
              <a
                href="https://github.com/skabbuzaid?tab=projects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
              >
                Go, To github!
              </a>
            </motion.button>
            <motion.button
              initial={{ opacity: 1, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.08 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-5 py-3 text-sm font-medium text-slate-800 hover:bg-gray-900 transition"
            >
              <Rocket className="h-5 w-5 invert-100" />
              <button
                onClick={() => navigate("/")}
                rel="noopener noreferrer"
                className="text-white"
              >
                Go, To Home!
              </button>
            </motion.button>
          </div>
        </motion.div>






      </div>


    </div>
  );
}

function InfoBox({ icon: Icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
          <Icon className="h-5 w-5 text-slate-800" />
        </div>
        <div>
          <h4 className="font-semibold tracking-tight text-slate-900">{title}</h4>
          <p className="mt-1 text-sm text-slate-600">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
};

function StatBox({ value, label }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-xl border border-slate-200 bg-white/50 p-4 text-center shadow-sm"
    >
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </motion.div>
  );
}

