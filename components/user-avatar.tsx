import { auth } from "@/auth";

export async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <img
        src={session.user.image ?? "https://placekitten.com/200/200"}
        alt="User Avatar"
        className="rounded-full"
      />
    </div>
  );
}
