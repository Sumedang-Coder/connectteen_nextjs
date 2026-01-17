'use client'

import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb";
import { AdminTable } from "../../components/Tables/admin/admin-table";
import { Button } from "../../components/ui-elements/button";
import { AdminSignUpForm } from "../forms/form-layout/_components/admin-sign-up-form";
import { useState } from "react";


const AdminDataPage = () => {

  const [showModal, setShowModal] = useState(false)
  
  return (
    <>
      <Breadcrumb pageName="Admin Table" />

      <Button label="Create admin" variant="primary" shape="full" size={"small"} className="mb-4" onClick={() => setShowModal(!showModal)}/>

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
      <AdminSignUpForm modalClose={() => setShowModal(false)} />
    </div>
  </div>
</div>

      <AdminTable />
    </>
  );
};

export default AdminDataPage;
