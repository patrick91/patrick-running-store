import NextAuth from "next-auth";
import Strava from "next-auth/providers/strava";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Strava],
});
