import { useEffect } from "react";
import { useParticipantStore } from "../modules/participant/participant.state";

export default function Home() {
  const participantStore = useParticipantStore();

  useEffect(() => {
    participantStore.reset();
  }, []);

  return (
    <div>
      <div>アイコン</div>

      <h1>vsTalk</h1>

      <div>ルーム作成</div>
      <div>ルーム参加</div>
    </div>
  );
}
