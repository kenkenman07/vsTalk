import { Navigate } from "react-router";
import { LogIn, ChromeIcon } from "lucide-react";
import { motion } from "motion/react";
import { authRepository } from "../modules/auth/auth.repository";
import { useEffect } from "react";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { likesRepository } from "../modules/likes/likes.repository";

export default function Signin() {
  const currentUserStore = useCurrentUserStore();

  const signInGoogle = async () => {
    await authRepository.signInGoogle();
  };

  useEffect(() => {
    const checkUserSignin = async () => {
      const currentUser = await authRepository.getCurrentUser();
      if (currentUser != null) {
        currentUserStore.set(currentUser);
        await likesRepository.insertUserRow(
          currentUser!.id,
          currentUser!.userName
        );
      }
    };

    checkUserSignin();
  }, []);

  if (currentUserStore.currentUser != null) return <Navigate replace to="/" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="inline-flex w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center mb-6 shadow-[0_0_40px_rgba(96,165,250,0.4)]"
            >
              <LogIn className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              ログイン
            </h1>
            <p className="text-gray-400">アカウントにアクセスする</p>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 mb-2"
              />

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChromeIcon className="w-5 h-5 text-white" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="google"
                  name="google"
                  onClick={signInGoogle}
                  className={`w-full bg-blue-600 border border-white/10
                  rounded-xl px-12 py-4  placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors text-white font-bold`}
                >
                  <span className="text-[25px]">Google</span>
                  でサインイン
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
