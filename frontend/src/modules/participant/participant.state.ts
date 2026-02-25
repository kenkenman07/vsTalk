import { atom, useAtom } from "jotai";
import type { Participant } from "./participant.entity";

const participantAtom = atom<Participant[]>([]);

export const useParticipantStore = () => {
  const [participant, setParticipant] = useAtom(participantAtom);

  const setUser = (usersName: string[]) => {
    setParticipant((prev) => {
      const prevLikes = new Map(prev?.map((p) => [p.name, p.likes]));

      return usersName.map((name) => ({
        name,
        likes: prevLikes.get(name) ?? 0,
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
