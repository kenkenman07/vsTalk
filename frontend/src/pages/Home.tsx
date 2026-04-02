import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="fixed top-7 right-7">アイコン</div>

      <div className="flex flex-col items-center justify-center min-h-screen gap-30">
        <h1 className="text-8xl font-bold">vsTalk</h1>

        <div className="flex flex-col gap-10 text-2xl">
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
