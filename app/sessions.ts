import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.AUTH_SECRET!],
    secure: process.env.NODE_ENV === "production",
  },
});

export { getSession, commitSession, destroySession };
