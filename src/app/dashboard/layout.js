"use client"
import { useSession } from "next-auth/react";
import DashNav from "./DashNav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginLayout({ children }) {

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
     router.push("/");
    }

    if (status === "authenticated" && session.user.role === "admin") {
      router.push("/admin");
    }
  }, [status, session, router]);
  if (status === "authenticated") {
     return (
    <div>
      <DashNav />
      {children}
    </div>
  );
  }
 
}
