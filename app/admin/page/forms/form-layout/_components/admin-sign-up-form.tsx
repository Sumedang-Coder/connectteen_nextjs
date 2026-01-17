"use client"

import InputGroup from "@/app/admin/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/app/admin/components/Layouts/showcase-section";
import { Button } from "@/app/admin/components/ui-elements/button";
import { usersStore } from "@/app/store/users";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

export function AdminSignUpForm({modalClose}: {modalClose: () => void}) {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
  })
  const [loading, setLoading] = useState(false)

  const {addUser} = usersStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
setLoading(true)
    try {
      const res = await axios.post('https://connectteen-server.vercel.app/api/admin', formData, {withCredentials:true})
      const data = res.data
      addUser(data.user)
      toast.success(data.message)
    } catch (err) {
       const error = err as AxiosError<any>;
      
          toast.error(
            error.response?.data?.message ||
            error.message ||
            "Terjadi kesalahan, silakan coba lagi"
          );
    } finally {
    setLoading(false);
    modalClose()
  }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target
    setFormData({...formData, [name]: value})
  }
  return (
    <ShowcaseSection title="Admin Sign Up Form" className="!p-6.5">
      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Name"
          type="text"
          placeholder="Enter full name"
          className="mb-4.5"
          name="name"
          value={formData.name}
          handleChange={handleOnChange}
        />

        <InputGroup
          label="Email"
          type="email"
          placeholder="Enter email address"
          className="mb-4.5"
          name="email"
          value={formData.email}
          handleChange={handleOnChange}
        />

        <InputGroup
          label="Password"
          type="password"
          placeholder="Enter password"
          className="mb-4.5"
          name="password"
          value={formData.password}
          handleChange={handleOnChange}
        />

        <InputGroup
          label="Re-type Password"
          type="password"
          placeholder="Re-type password"
          className="mb-5.5"
          name="confirmPassword"
          value={formData.confirmPassword}
          handleChange={handleOnChange}
        />

        <button disabled={loading} className={`flex w-full items-center justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 ${loading ? "opacity-80" : ""}`}>
          Sign Up
           {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
        <Button type="button" onClick={modalClose} label="Cancel" size={"small"} variant="outlinePrimary" shape="rounded" className="mt-2 w-full" />
      </form>
    </ShowcaseSection>
  );
}
