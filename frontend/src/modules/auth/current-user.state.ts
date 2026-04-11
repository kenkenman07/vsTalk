import { atom, useAtom } from "jotai";
import type { CurrentUser } from "./current-user.entity";

const currentUserAtom = atom<CurrentUser>();

export const useCurrentUserStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  return { currentUser, set: setCurrentUser };
};
