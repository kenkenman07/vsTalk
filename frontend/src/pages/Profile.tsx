import { Link } from "react-router";
import { ArrowLeft, ThumbsUp, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { likesRepository } from "../modules/likes/likes.repository";
import { useCurrentUserStore } from "../modules/auth/current-user.state";

export default function Profile() {
  const { currentUser } = useCurrentUserStore();
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    const likesRow = await likesRepository.find(currentUser!.id);
    if (likesRow == null) return;
    setLikes(likesRow.likes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>ホームに戻る</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
        >
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          </div>

          <div className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
              className="relative -mt-20 mb-4"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center border-4 border-black shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                <User className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                ユーザー名
              </h1>
              <p className="text-gray-400 mb-8">@username</p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mb-8"
            >
              <div className="grid grid-cols-3 gap-4">
                {/* Total Likes */}
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
                      <ThumbsUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent mb-1">
                    {likes}
                  </p>
                  <p className="text-sm text-gray-400">獲得いいね</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <h2 className="text-xl md:text-2xl mb-4 text-white">自己紹介</h2>
              <p className="text-gray-400 leading-relaxed">
                こんにちは！このアプリケーションを使用しています。プロフィールページでは、ユーザー情報を表示できます。
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
