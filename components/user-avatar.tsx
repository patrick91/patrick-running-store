import { auth } from "@/auth";

export async function UserAvatar() {
  const session = await auth();

  if (!session.user) return null;

  console.log(session.user);

  return (
    <div>
      <img src={session.user.image} alt="User Avatar" />
    </div>
  );
}
