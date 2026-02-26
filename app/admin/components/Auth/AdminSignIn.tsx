"use client"
import { EmailIcon, PasswordIcon } from "@/app/admin/assets/icons";
import React, { useState } from "react";
import InputGroup from "@/app/admin/components/FormElements/InputGroup";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function AdminSignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated, setUser } = useAuthStore()

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // optional: validasi sederhana
    if (!data.email || !data.password) {
      toast.error("Email dan password wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        "/auth/admin/login",
        data
      );

      const responseData = res.data;

      toast.success(responseData.message || "Login berhasil");

      setUser(responseData.user)

      router.push('/admin/page')

    } catch (err) {
      const error = err as AxiosError<any>;

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan, silakan coba lagi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="email"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}
