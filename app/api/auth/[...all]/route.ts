import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

/** Better Auth's endpoints (sign in, sign out, password reset, staff management): lib/auth. */
const handler = auth ? toNextJsHandler(auth) : null;

function unavailable() {
  return Response.json({ message: "The admin needs a database (DATABASE_URL)." }, { status: 503 });
}

export const GET = handler?.GET ?? unavailable;
export const POST = handler?.POST ?? unavailable;
