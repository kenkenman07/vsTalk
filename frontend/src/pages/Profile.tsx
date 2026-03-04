import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { likesRepository } from "../modules/likes/likes.repository";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import HomeButton from "../components/HomeButton";
import StatusSection from "../components/Profile/StatusSection";
import UserIcon from "../components/Profile/UserIcon";

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

            <StatusSection likes={likes} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
