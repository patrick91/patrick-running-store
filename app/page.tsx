import { auth } from "@/auth";
import { Search } from "@/components/search";
import { SignIn } from "@/components/signin";
import { UserAvatar } from "@/components/user-avatar";
import { fetchActivities } from "@/lib/strava";
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
    const activities = await fetchActivities(session.accessToken, 365);

    stats = {
      totalDistance: activities.reduce(
        (acc, activity) => acc + activity.distance,
        0,
      ),
      maxDistance: Math.max(...activities.map((activity) => activity.distance)),
    };
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
