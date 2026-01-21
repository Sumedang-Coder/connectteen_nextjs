"use client";

import { TrashIcon } from "@/app/admin/assets/icons";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/admin/components/ui/table";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { useEventStore, Event } from "@/app/store/useEventStore";
import Loader from "@/components/Loader";

export default function EventTable() {
    const router = useRouter();
    const {
        events,
        fetchEvents,
        deleteEvent,
        updateEvent,
        loading,
    } = useEventStore();

    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const [form, setForm] = useState({
        event_title: "",
        description: "",
        location: "",
        date: "",
        image_file: null as File | null,
        preview: "" as string | null,
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Apakah kamu yakin ingin menghapus event ini?");
        if (!confirmed) return;

        const success = await deleteEvent(id);
        if (success) toast.success("Event berhasil dihapus");
        else toast.error("Gagal menghapus event");
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setForm({
            event_title: event.event_title,
            description: event.description,
            location: event.location,
            date: event.date,
            image_file: null,
            preview: event.image_url || "",
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!editingEvent) return;

        const formData = new FormData();
        formData.append("event_title", form.event_title);
        formData.append("description", form.description);
        formData.append("location", form.location);
        formData.append("date", form.date);
        if (form.image_file) formData.append("image", form.image_file);

        const success = await updateEvent(editingEvent.id, formData);

        if (success) {
            toast.success("Event berhasil diupdate");
            fetchEvents();
            setShowModal(false);
        } else {
            toast.error("Gagal update event");
        }
    };

    if (loading) return <Loader size="sm" />;

    return (
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-7.5">
            {/* ===== MODAL EDIT ===== */}
            <div
                className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 ${showModal
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    } duration-300`}
                onClick={() => setShowModal(false)}
            >
                <div
                    className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold">Edit Event</h3>

                        <input
                            className="border rounded-md p-2"
                            placeholder="Judul Event"
                            value={form.event_title}
                            onChange={(e) =>
                                setForm({ ...form, event_title: e.target.value })
                            }
                        />

                        <textarea
                            className="border rounded-md p-2"
                            placeholder="Deskripsi"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />

                        <input
                            className="border rounded-md p-2"
                            placeholder="Lokasi"
                            value={form.location}
                            onChange={(e) =>
                                setForm({ ...form, location: e.target.value })
                            }
                        />

                        <input
                            type="date"
                            className="border rounded-md p-2"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            className="border rounded-md p-2"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setForm({
                                        ...form,
                                        image_file: file,
                                        preview: URL.createObjectURL(file),
                                    });
                                }
                            }}
                        />

                        {form.preview && (
                            <Image
                                src={form.preview}
                                alt="Preview"
                                width={200}
                                height={120}
                                className="rounded-md object-cover"
                            />
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-md bg-gray-300"
                                onClick={() => setShowModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 rounded-md bg-primary text-white"
                                onClick={handleSave}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== TABLE ===== */}
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#F7F9FC] [&>th]:py-4 [&>th]:text-base">
                        <TableHead className="xl:pl-7.5">Judul</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Gambar</TableHead>
                        <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {events.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="xl:pl-7.5">
                                {item.event_title}
                            </TableCell>

                            <TableCell className="max-w-xs truncate">
                                {item.description}
                            </TableCell>

                            <TableCell>{item.location}</TableCell>

                            <TableCell>
                                {new Date(item.date).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}</TableCell>

                            <TableCell>
                                {item.image_url && (
                                    <Image
                                        src={item.image_url}
                                        alt={item.event_title}
                                        width={100}
                                        height={60}
                                        className="rounded-md object-cover"
                                    />
                                )}
                            </TableCell>

                            <TableCell className="xl:pr-7.5">
                                <div className="flex items-center justify-end gap-x-3.5">
                                    {/* LIHAT REGISTRANT */}
                                    <button
                                        onClick={() => router.push(`/admin/components/Tables/events-table/${item.id}/registrants`)}
                                        className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                                    >
                                        Registrant
                                    </button>

                                    {/* EDIT */}
                                    <button
                                        className="hover:text-primary"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <span className="sr-only">Edit Event</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 14v3h3l9-9-3-3-9 9z" />
                                        </svg>
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        className="hover:text-primary"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <span className="sr-only">Delete Event</span>
                                        <TrashIcon />
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
