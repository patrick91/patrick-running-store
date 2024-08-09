import { signIn } from "@/auth";

export function SignIn() {
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
