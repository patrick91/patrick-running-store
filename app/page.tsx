import { Search } from "@/components/search";
import { SignIn } from "@/components/signin";
import { UserAvatar } from "@/components/user-avatar";

// import "instantsearch.css/themes/satellite.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Products</h1>

      <UserAvatar />

      <Search />

      <SignIn />
    </main>
  );
}
