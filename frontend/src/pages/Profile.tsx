import { motion } from "motion/react";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import HomeButton from "../components/HomeButton";
import UserIcon from "../components/Profile/UserIcon";
import { LogOut } from "lucide-react";
import { authRepository } from "../modules/auth/auth.repository";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const currentUserStore = useCurrentUserStore();
  const { currentUser } = useCurrentUserStore();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authRepository.signOut();
    currentUserStore.set(undefined);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <HomeButton />

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
            <UserIcon />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {currentUser?.user_metadata.name}
              </h1>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 pt-8 border-t border-white/10"
        >
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>ログアウト</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
