import { cookies } from "next/headers";

import LoginForm from "@/app/login/_components/LoginForm";

export default async function LoginPage() {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get("demoAuthCookie") !== undefined;

  return <LoginForm initialLoggedIn={isLoggedIn} />;
}
