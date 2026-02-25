import { Link, useNavigate } from "react-router";
import { ArrowLeft, Clock, Users } from "lucide-react";
import { motion } from "motion/react";
import { useRoomStore, type Room } from "../modules/room/room.state";

export default function Join() {
  const navigate = useNavigate();
  const roomStore = useRoomStore();

  // ダミーのルーム一覧データ
  const rooms = roomStore.room;

  const handleJoinRoom = (room: Room) => {
    // ミーティングページに遷移
    navigate(`/meeting/${room.roomName}/${room.totalMinutes}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-indigo-950 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
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

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            className="inline-flex w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full items-center justify-center mb-6 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
          >
            <Users className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            ルーム参加
          </h1>
          <p className="text-xl text-gray-400">既存の会議室に参加する</p>
        </motion.div>

        {/* Room List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid gap-4 mb-8"
        >
          {rooms.length === 0 ? (
            <div className="text-center py-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
              <p className="text-gray-400 text-lg">ルームがありません</p>
            </div>
          ) : (
            rooms.map((room, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Room Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl text-white font-medium">
                        {room.roomName}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{room.totalMinutes}分</span>
                      </div>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button onClick={() => handleJoinRoom(room)}>
                    <div></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Create Room Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center pb-8"
        >
          <p className="text-gray-400 mb-4">
            参加したいルームが見つかりませんか？
          </p>
          <Link
            to="/start"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-105"
          >
            <Users className="w-5 h-5" />
            新しいルームを作成
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
