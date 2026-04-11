import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { LogOut, Pencil, X } from "lucide-react";
import { authRepository } from "../modules/auth/auth.repository";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../components/ReturnButton";
import { useState } from "react";
import { profileService } from "../services/profile/profile.service";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const currentUserStore = useCurrentUserStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authRepository.signOut();
    currentUserStore.set(undefined);
    navigate("/signin");
  };

  const handleChangeName = async () => {
    if (!currentUserStore.currentUser) return;
    await profileService.update(
      currentUserStore.currentUser?.id,
      newName,
      currentUserStore.currentUser,
      currentUserStore.set,
    );

    setOpen(false);
  };

  if (!currentUserStore) return <></>;
  const user = currentUserStore.currentUser;

  return (
    <div className="min-h-screen bg-gray-100 px-5 sm:px-6">
      <ReturnButton />

      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm flex flex-col items-center gap-20 bg-white p-4 sm:py-12 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold">プロフィール</h1>

          <div className="w-full max-w-md h-32  bg-red-300 px-15 py-6 rounded-lg">
            {open ? (
              <div className="flex flex-col gap-6 items-center">
                <div className="flex h-7 gap-2 items-center font-medium">
                  <input
                    type="text"
                    placeholder="新しい名前"
                    onChange={(e) => setNewName(e.target.value)}
                    className="border rounded-lg  px-1 py-2"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="border rounded-full"
                  >
                    <X size={22} />
                  </button>
                </div>

                <button
                  onClick={handleChangeName}
                  className="rounded-xl px-3 py-1 bg-black text-white"
                >
                  変更
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex gap-2 items-center text-xl font-medium">
                  {user?.displayName}
                  <button onClick={() => setOpen(true)}>
                    <Pencil size={22} />
                  </button>
                </div>
                <div>{user?.email}</div>
              </div>
            )}
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
