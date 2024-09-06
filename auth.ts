import NextAuth from "next-auth";
import Strava from "next-auth/providers/strava";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Strava({ authorization: { params: { scope: "activity:read" } } }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // @ts-ignore
        token.strava = {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.strava = token.strava;

      return session;
    },
  },
});
