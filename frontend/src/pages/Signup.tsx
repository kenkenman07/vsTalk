import { Link, useNavigate } from "react-router";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "ユーザー名を入力してください";
    } else if (formData.username.length < 3) {
      newErrors.username = "ユーザー名は3文字以上で入力してください";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!formData.password) {
      newErrors.password = "パスワードを入力してください";
    } else if (formData.password.length < 6) {
      newErrors.password = "パスワードは6文字以上で入力してください";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "パスワード（確認）を入力してください";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: 実際の登録処理を実装
      console.log("Registration data:", formData);

      // 仮の成功処理
      alert("アカウントが作成されました！");
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>ホームに戻る</span>
          </Link>
        </motion.div>

        {/* Registration Card */}
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
              className="inline-flex w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full items-center justify-center mb-6 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
            >
              <UserPlus className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              アカウント登録
            </h1>
            <p className="text-gray-400">新しいアカウントを作成しましょう</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-300 mb-2"
              >
                ユーザー名
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${
                    errors.username ? "border-red-400" : "border-white/10"
                  } rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors`}
                  placeholder="山田太郎"
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-sm mt-2">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-2"
              >
                メールアドレス
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${
                    errors.email ? "border-red-400" : "border-white/10"
                  } rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors`}
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 mb-2"
              >
                パスワード
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${
                    errors.password ? "border-red-400" : "border-white/10"
                  } rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors`}
                  placeholder="6文字以上"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-300 mb-2"
              >
                パスワード（確認）
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-white/10"
                  } rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors`}
                  placeholder="パスワードを再入力"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative mt-8 px-8 py-4 rounded-xl overflow-hidden transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              <span className="relative flex items-center justify-center gap-2 text-lg text-white font-medium">
                <UserPlus className="w-5 h-5" />
                アカウント作成
              </span>
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              すでにアカウントをお持ちですか？{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                ログイン
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
