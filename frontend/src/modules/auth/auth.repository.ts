import { supabase } from "../../lib/supabase";
const redirectTo = `${window.location.origin}/signin`;

export const authRepository = {
  async signInGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) throw new Error(error?.message);
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    if (error != null) throw new Error(error?.message);
    if (data.session == null) return null;
    return {
      ...data.session.user,
    };
  },

  async signOut() {
    await supabase.auth.signOut();
  },
};
