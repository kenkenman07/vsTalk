import { authRepository } from "../../modules/auth/auth.repository";
import type { CurrentUser } from "../../modules/auth/current-user.entity";
import { profileRepository } from "../../modules/profile/profile.repository";

export const authService = {
  async signInGoogle() {
    await authRepository.signInGoogle();
  },

  async checkUserSignin(set: (user: CurrentUser) => void) {
    const currentUser = await authRepository.getCurrentUser();
    if (currentUser != null) {
      const profile = await profileRepository.createAndUpdate(
        currentUser?.id,
        currentUser.user_metadata.name,
      );

      set({
        ...currentUser,
        displayName: profile.display_name,
      });
    }
  },
};
