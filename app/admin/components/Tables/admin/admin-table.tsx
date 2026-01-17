"use client"
import { TrashIcon } from "@/app/admin/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/admin/components/ui/table";
import { cn } from "@/app/admin/lib/utils";
import { getAdminData } from "../fetch";
import { EditIcon, PreviewIcon } from "../icons";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { User, usersStore } from "@/app/store/users";
import Loader from "@/components/Loader";
import { AdminSignUpForm } from "@/app/admin/page/forms/form-layout/_components/admin-sign-up-form";
import { AdminEditForm } from "@/app/admin/page/forms/form-layout/_components/admin-edit-form";

export function AdminTable() {

  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User|null>(null)

  const {users,removeUser, updateUser, setUsers} = usersStore()

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
      const res = await axios.get('https://connectteen-server.vercel.app/api/admin',{withCredentials:true})
      const data = res.data
      setUsers(data.data)
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
    })()
  }, [])

  const handleDelete = async (id: string) => {
   try {
    setLoading(true);
      const res = await axios.delete(`https://connectteen-server.vercel.app/api/admin/${id}`,{withCredentials:true})
      const data = res.data
      removeUser(id)
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
  }
  }

  const handleEdit = (user: User) => {
    setShowModal(!showModal)
setEditingUser(user)
  }

  if(loading) return <Loader size="sm" />

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div 
        className={`fixed inset-0 z-9999 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-300`} 
        onClick={() => setShowModal(false)}
      >
        <div 
          className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Area Scrollable */}
          <div className="overflow-y-auto p-2">
            <AdminEditForm updateUser={updateUser} editingUser={editingUser!} modalClose={() => setShowModal(false)} />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((item, index) => (
            <TableRow key={index} className="border-[#eee] dark:border-dark-3">
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.name}</h5>
              </TableCell>

              <TableCell>
                {item.email}
              </TableCell>

              <TableCell>
                <div
                  className={cn(
                    "max-w-fit bg-[#219653]/[0.08] rounded-full px-3.5 py-1 text-sm font-medium text-[#219653]",
                  )}
                >
                  {item.role}
                </div>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  {/* <button className="hover:text-primary">
                    <span className="sr-only">View Admin</span>
                    <PreviewIcon />
                  </button> */}

                  <button className="hover:text-primary" onClick={() => handleDelete(item.id)}>
                    <span className="sr-only">Delete Admin</span>
                    <TrashIcon />
                  </button>

                  <button className="hover:text-primary" onClick={() => handleEdit(item)}>
                    <span className="sr-only">Edit Admin</span>
                    <EditIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
