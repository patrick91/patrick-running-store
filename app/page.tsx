import { auth, unstable_update } from "@/auth";
import { Search } from "@/components/search";
import { SignIn } from "@/components/signin";
import { UserAvatar } from "@/components/user-avatar";
import { fetchActivities, refreshToken } from "@/lib/strava";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patrick's Running Store",
};

export default async function Home() {
  const session = await auth();

  let stats = {
    totalDistance: 0,
    maxDistance: 0,
  };

  if (session?.user) {
    // @ts-ignore
    let accessToken = session.strava.accessToken as string;

    let activities: any;

    try {
      activities = await fetchActivities(accessToken, 365);
    } catch (error) {
      // @ts-ignore
      if (error.status === 401) {
        console.log("refreshing token");

        // @ts-ignore
        const newToken = await refreshToken(session.strava.refreshToken);

        // @ts-ignore
        session.strava.accessToken = newToken.access_token;
        // @ts-ignore
        accessToken = newToken.access_token;
        // @ts-ignore
        session.strava.refreshToken = newToken.refresh_token;

        // TODO: this can only be done in a server action or route handler :(
        // await unstable_update(session);
      }

      try {
        activities = await fetchActivities(accessToken, 365);
      } catch (error) {
        console.log("something went wrong", error);
      }
    }

    if (activities) {
      stats = {
        totalDistance: activities.reduce(
          (acc: any, activity: any) => acc + activity.distance,
          0,
        ),
        maxDistance: Math.max(
          0,
          ...activities.map((activity: any) => activity.distance),
        ),
      };
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-24 gap-4">
      <header className="flex justify-between items-center">
        <h1 className="text-7xl font-bold">Patrick&apos;s Running Store</h1>

        <UserAvatar />
      </header>

      <Search maxDistance={stats.maxDistance} />

      <SignIn />
    </main>
  );
}
