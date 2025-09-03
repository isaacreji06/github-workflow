"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  

  useEffect(() => {
    if (status === "loading") return; 
    if (!session?.user) {
      router.push("/");
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
const user=session?.user.name;
  return (
    <div>
     
      <button onClick={handleSignOut}>Logout</button>
      <div>
        User name :{user}
      </div>
    </div>
  );
};

export default Dashboard;
