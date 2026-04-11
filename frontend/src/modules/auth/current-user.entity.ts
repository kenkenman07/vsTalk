import type { User } from "@supabase/supabase-js";

export type CurrentUser = User & {
  displayName: string;
};
