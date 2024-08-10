import { signIn, auth, signOut } from "@/auth";

export async function SignIn() {
  const session = await auth();

  if (session?.user)
    return (
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Signout</button>
      </form>
    );

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
