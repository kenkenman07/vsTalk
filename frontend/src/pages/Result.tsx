import { useParams } from "react-router";
import { useParticipantStore } from "../modules/participant/participant.state";
import ResultTitle from "../components/Result/ResultTitle";
import StopCount from "../components/Result/StopCount";
import TotalLikes from "../components/Result/TotalLikes";
import ParticipantRanking from "../components/Result/ParticipantRanking";
import HomeButton from "../components/Result/HomeButton";

export default function Result() {
  const params = useParams();
  const roomName = params.roomName;
  if (roomName == null) return;
  if (params.stopCount == null) return;
  const stopCount = parseInt(params.stopCount);
  const participantStore = useParticipantStore();

  const participants = participantStore.participant;

  const totalLikes = participants.reduce((sum, p) => sum + p.likes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 p-4">
      <div className="max-w-5xl mx-auto pt-8">
        <ResultTitle roomName={roomName} />

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <StopCount stopCount={stopCount} />

          <TotalLikes totalLikes={totalLikes} />
        </div>

        <ParticipantRanking participants={participants} />

        <HomeButton />
      </div>
    </div>
  );
}
