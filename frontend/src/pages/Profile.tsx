import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { ArrowLeftToLine, LogOut } from "lucide-react";
import { authRepository } from "../modules/auth/auth.repository";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const currentUserStore = useCurrentUserStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authRepository.signOut();
    currentUserStore.set(undefined);
    navigate("/signin");
  };

  if (!currentUserStore) return;
  const user = currentUserStore.currentUser;

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-6">
      <Link
        to="/"
        className="fixed left-7 top-6 sm:left-20 sm:top-10 flex gap-2"
      >
        <ArrowLeftToLine />
        戻る
      </Link>

      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm flex flex-col items-center gap-20 bg-white p-4 sm:py-12 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold">プロフィール</h1>

          <div className="flex flex-col gap-4 bg-red-300 px-15 py-6 rounded-lg">
            <div className="text-xl font-medium">
              {user?.user_metadata.name}
            </div>
            <div>{user?.email}</div>
          </div>
        </div>
        <div className="fixed right-10 bottom-10">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-black transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </div>
  );
}
