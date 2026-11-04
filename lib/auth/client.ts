import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

/** The admin's sign-in from the browser: sign in, sign out, password reset (lib/auth). */
export const authClient = createAuthClient({ plugins: [adminClient()] });
