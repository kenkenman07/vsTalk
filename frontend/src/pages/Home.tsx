import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Link
        to="/profile"
        className="absolute top-8 right-8 rounded-full border p-6"
      >
        <User />
      </Link>

      <div className="flex flex-col items-center justify-center min-h-screen gap-20 sm:gap-30">
        <h1 className="text-8xl font-bold">vsTalk</h1>

        <div className="flex flex-col gap-10 text-2xl font-medium">
          <button
            onClick={() => navigate("/create")}
            className="rounded-xl bg-red-500 p-7"
          >
            ルーム作成
          </button>
          <button
            onClick={() => navigate("/join")}
            className="rounded-xl bg-green-500 p-7"
          >
            ルーム参加
          </button>
        </div>
      </div>
    </div>
  );
}
