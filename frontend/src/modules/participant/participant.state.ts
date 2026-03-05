import { atom, useAtom } from "jotai";
import type { Participant } from "./participant.entity";

const participantAtom = atom<Participant[]>([]);

export const useParticipantStore = () => {
  const [participant, setParticipant] = useAtom(participantAtom);

  const setUser = (users: { id: string; name: string }[]) => {
    setParticipant((prev) => {
      const prevLikes = new Map(prev?.map((p) => [p.id, p.likes]));

      return users.map((u) => ({
        id: u.id,
        name: u.name,
        likes: prevLikes.get(u.id) ?? 0,
      }));
    });
  };

  const setLike = (userName: string) => {
    setParticipant((prev) =>
      prev?.map((p) => (p.name === userName ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const reset = () => {
    setParticipant([]);
  };

  return { participant, setUser, setLike, reset };
};
