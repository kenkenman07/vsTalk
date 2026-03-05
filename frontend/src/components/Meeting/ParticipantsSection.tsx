import { ThumbsUp, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Participant } from "../../modules/participant/participant.entity";
import { useParticipantStore } from "../../modules/participant/participant.state";

type ParticipantsSectionProps = {
  participant: Participant[];
};

const ParticipantsSection = ({ participant }: ParticipantsSectionProps) => {
  const participantStore = useParticipantStore();

  const handleLike = (participantId: string) => {
    participantStore.setLike(participantId);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6 text-gray-300">
        <Users className="w-5 h-5" />
        <span className="text-lg">参加者</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {participant?.map((participant, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {participant.name.charAt(0)}
                </div>
                {/* Online Status */}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
              </div>

              {/* Name */}
              <div className="flex-1">
                <h3 className="text-white font-medium text-lg">
                  {participant.name}
                </h3>
                <p className="text-gray-400 text-sm">オンライン</p>
              </div>
            </div>

            {/* Like Button */}
            <button
              onClick={() => handleLike(participant.name)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group/like"
            >
              <ThumbsUp className="w-5 h-5 text-pink-400 group-hover/like:scale-125 transition-transform" />
              <span className="text-white font-medium">
                {participant.likes}
              </span>
              <span className="text-gray-400 text-sm">いいね</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default ParticipantsSection;
