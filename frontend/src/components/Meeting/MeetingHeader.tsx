import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

type MeetingHeaderProps = {
  roomName: string;
};

const MeetingHeader = ({ roomName }: MeetingHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex items-center justify-between mb-8"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>ホーム</span>
      </Link>
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          {roomName}
        </h1>
      </div>
      <div className="w-20"></div> {/* Spacer for centering */}
    </motion.div>
  );
};
export default MeetingHeader;
