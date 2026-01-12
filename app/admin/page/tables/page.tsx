import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/app/admin/components/Tables/invoice-table";
import { TopChannels } from "@/app/admin/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/app/admin/components/Tables/top-channels/skeleton";
import { TopProducts } from "@/app/admin/components/Tables/top-products";
import { TopProductsSkeleton } from "@/app/admin/components/Tables/top-products/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="space-y-10">
        <Suspense fallback={<TopChannelsSkeleton />}>
          <TopChannels />
        </Suspense>
        
        <Suspense fallback={<TopProductsSkeleton />}>
          <TopProducts />
        </Suspense>

        <InvoiceTable />
      </div>
    </>
  );
};

export default TablesPage;
