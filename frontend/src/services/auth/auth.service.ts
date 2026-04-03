import { authRepository } from "../../modules/auth/auth.repository";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";

export const authService = {
  async signInGoogle() {
    await authRepository.signInGoogle();
  },

  async checkUserSignin() {
    const currentUserStore = useCurrentUserStore();
    const currentUser = await authRepository.getCurrentUser();
    if (currentUser != null) {
      currentUserStore.set(currentUser);
    }
  },
};
