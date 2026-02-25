import { Link } from "react-router";
import { User, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useParticipantStore } from "../modules/participant/participant.state";

export default function Home() {
  const participantStore = useParticipantStore();

  useEffect(() => {
    participantStore.reset();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-purple-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      {/* Header with Profile Icon */}
      <header className="relative z-10 p-6 flex justify-end">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/profile"
            className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all hover:scale-110 group"
            aria-label="プロフィール"
          >
            <User className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
          </Link>
        </motion.div>
      </header>

      {/* Main Content with Start Button */}
      <div
        className="relative z-10 flex items-center justify-center px-4"
        style={{ minHeight: "calc(100vh - 96px)" }}
      >
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <h1 className="text-7xl md:text-8xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              vsTalk
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/start"
              className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 md:px-16 md:py-8 text-xl md:text-2xl overflow-hidden rounded-2xl transition-all hover:scale-105"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 transition-all group-hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              {/* Content */}
              <Play
                className="relative w-8 h-8 md:w-10 md:h-10 text-white"
                fill="currentColor"
              />
              <span className="relative text-white font-medium">
                ルーム作成
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6"
          >
            <Link
              to="/join"
              className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 md:px-16 md:py-8 text-xl md:text-2xl overflow-hidden rounded-2xl transition-all hover:scale-105"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all group-hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              {/* Content */}
              <Play
                className="relative w-8 h-8 md:w-10 md:h-10 text-white"
                fill="currentColor"
              />
              <span className="relative text-white font-medium">
                ルーム参加
              </span>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-sm text-gray-500"
          >
            クリックして始める
          </motion.p>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
      ></motion.div>
    </div>
  );
}
