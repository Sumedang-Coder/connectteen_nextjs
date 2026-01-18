"use client";

import { useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/app/store/useAuthStore";
import Loader from "@/components/Loader";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    const fetchMe = () => {
      axios
        .get("https://connectteen-server.vercel.app/api/auth/me", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
          }
        })
        .catch((err) => {
          console.log("AUTH PROVIDER ERROR:", err);
          setUser(null);
        });
    };

    fetchMe();
  }, [setUser]);

  if (loading) {
    return <Loader size="md" fullScreen={true} />;
  }

  return <>{children}</>;
}
