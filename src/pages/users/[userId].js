import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserProfile from "@/components/users/UserProfile";
import UserBio from "@/components/users/userbio/UserBio";
import Home from "../Home";
import Layout from "@/components/Layout";
import FullProfile from "@/components/fullProfile.js/FullProfile";
const User = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      if (typeof userId !== "string") throw new Error("Invalid User");
      const res = await fetch(`/api/users/${userId}`);

      const data = await res.json();

      if (res.ok) setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <Layout>
        <Header label={user?.name} />
        <UserProfile user={user} />
        <Home ownProfile={true} userId={userId} />
      </Layout>
    </div>
  );
};

export default User;
