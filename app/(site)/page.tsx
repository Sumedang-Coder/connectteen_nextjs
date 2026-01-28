"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/organisms/hero/Hero";
import { RecentPosts } from "@/components/RecentPosts";
import { Articles } from "@/components/Articles";
import { Events } from "@/components/Events";
import { useAuthStore } from "@/app/store/useAuthStore";
import Loader from "@/components/Loader";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { user, isAuthenticated } = useAuthStore();
  console.log(user, isAuthenticated);

  return (
    <>
      <Hero />
      <RecentPosts />
      <Articles />
      <Events />
    </>
  );
}
