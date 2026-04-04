import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { LogOut } from "lucide-react";
import { authRepository } from "../modules/auth/auth.repository";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const currentUserStore = useCurrentUserStore();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authRepository.signOut();
    currentUserStore.set(undefined);
    navigate("/signin");
  };

  return (
    <div>
      <button
        onClick={handleSignOut}
        className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
      >
        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>ログアウト</span>
      </button>
    </div>
  );
}
