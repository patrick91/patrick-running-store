import { signIn, auth } from "@/auth";

export async function SignIn() {
  const session = await auth();

  if (session.user) return null;

  return (
    <form
      action={async () => {
        "use server";
        await signIn("strava");
      }}
    >
      <button type="submit">Signin with Strava</button>
    </form>
  );
}
