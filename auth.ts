import NextAuth from "next-auth";
import Strava from "next-auth/providers/strava";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Strava({ authorization: { params: { scope: "activity:read" } } }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // @ts-ignore
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;

      return session;
    },
  },
});
