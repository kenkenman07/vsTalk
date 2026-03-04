import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Room } from "../../modules/room/room.entity";

type RoomListProps = {
  rooms: Room[];
};

const RoomList = ({ rooms }: RoomListProps) => {
  const navigate = useNavigate();

  const handleJoinRoom = (room: Room) => {
    navigate(`/meeting/${room.id}`);
  };

  return (
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
                    {room.room_name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{room.total_minutes}分</span>
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
  );
};
export default RoomList;
