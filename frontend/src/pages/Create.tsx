import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../modules/auth/current-user.state";

export default function Create() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserStore();

  // const handleCreateRoom = async () => {
  //   if (currentUser == null) return;
  //   const data = await roomRepository.create(
  //     roomName,
  //     currentUser?.id,
  //     );

  //   const roomId = data.id;

  //   navigate(`/meeting/${roomId}`);
  // };

  return (
    <div className="bg-gray-100">
      <Link to="/" className="fixed left-20 top-10">
        戻るボタン
      </Link>

      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center border py-40 px-20 rounded-lg gap-55 bg-white shadow-md">
          <h1 className="text-2xl font-bold">ルーム作成</h1>

          <div className="flex flex-col items-center gap-14 ">
            <label className="flex flex-col">
              ルーム名
              <input
                placeholder="ルーム名を入力"
                type="text"
                className="px-8 py-4 border rounded-2xl bg-gray-200 placeholder-gray-900 "
              />
            </label>

            <div className="rounded-lg border bg-red-500 font-medium p-5">
              作成ボタン
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
