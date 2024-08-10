import NextAuth from "next-auth";
import Strava from "next-auth/providers/strava";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Strava({ authorization: { params: { scope: "activity:read" } } }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.stravaId = account.athlete.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.stravaId = token.stravaId;

      return session;
    },
  },
});
