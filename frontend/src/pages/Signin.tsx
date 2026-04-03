import { useEffect } from "react";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { Navigate } from "react-router-dom";
import { authService } from "../services/auth/auth.service";

export default function Signin() {
  const currentUserStore = useCurrentUserStore();

  useEffect(() => {
    authService.checkUserSignin();
  }, []);

  if (currentUserStore.currentUser != null) return <Navigate replace to="/" />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4 border rounded-2xl bg-white shadow-md p-8">
        <h1 className="text-3xl font-bold">vsTalk</h1>

        <button
          onClick={authService.signInGoogle}
          className="rounded-lg bg-blue-500 px-6 py-3 text-white font-medium"
        >
          Googleでログイン
        </button>
      </div>
    </div>
  );
}
