"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/admin/components/ui/table";

import { useEventStore } from "@/app/store/useEventStore";
import Loader from "@/components/Loader";

export default function RegistrantPage() {
    const params = useParams();
    const eventId = params.id as string;

    const { registrants, fetchRegistrants, loading } = useEventStore();

    useEffect(() => {
        if (eventId) fetchRegistrants(eventId);
    }, [eventId]);

    if (loading) return <Loader size="sm" />;

    return (
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1">
            <h2 className="mb-6 text-xl font-semibold">
                Daftar Pendaftar Event
            </h2>

            <Table>
                <TableHeader>
                    <TableRow className="bg-[#F7F9FC]">
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Tanggal Daftar</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {registrants.length === 0 && (
                        <TableRow key="empty">
                            <TableCell colSpan={4} className="text-center text-gray-500">
                                Belum ada pendaftar
                            </TableCell>
                        </TableRow>
                    )}

                    {registrants.map((item, index) => (
                        <TableRow key={item.id ?? index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phone || "-"}</TableCell>
                            <TableCell>
                                {item.registered_at
                                    ? new Date(item.registered_at).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "-"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
