import type { CurrentUser } from "../../modules/auth/current-user.entity";
import { profileRepository } from "../../modules/profile/profile.repository";

export const profileService = {
  async update(
    userId: string,
    newName: string,
    currentUser: CurrentUser,
    set: (currentUser: CurrentUser) => void,
  ) {
    const profile = await profileRepository.createAndUpdate(userId, newName);
    if (profile != null) {
      set({ ...currentUser, displayName: profile.display_name });
    }
  },
};
