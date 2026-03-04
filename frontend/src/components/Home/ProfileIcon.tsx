import { User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  return (
    <Link
      to="/profile"
      className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all hover:scale-110 group"
      aria-label="プロフィール"
    >
      <User className="w-9 h-9 text-white group-hover:text-purple-300 transition-colors" />
    </Link>
  );
};
export default ProfileIcon;
