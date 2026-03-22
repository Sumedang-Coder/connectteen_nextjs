"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Search,
    Download,
    ChevronRight,
    Filter,
    CheckCircle2,
    Loader2,
    UserCircle,
    QrCode,
    X,
    User,
    Clock,
    Users
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import api from "@/lib/axios";
import { format } from "date-fns";
import AdminBreadcrumb from "@/components/AdminBreadcrumb";
import { toast } from "sonner";
import { useEventStore } from "@/app/store/useEventStore";
import { useDebounce } from "@/app/hooks/useDebounce";
import PaginationComponent from "@/components/PaginationComponent";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Scan result type
interface ScanResult {
    success: boolean;
    name: string;
    email: string;
    avatarUrl?: string | null;
    event: string;
    attended_at: string;
    message: string;
}

export default function EventRegistrantsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const {
        event,
        registrants,
        registrantsPagination,
        loading,
        fetchEventById,
        fetchRegistrants
    } = useEventStore();

    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearch = useDebounce(searchTerm, 500);

    // Scanner state
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const isProcessingRef = useRef(false); // Ref to avoid stale closure

    useEffect(() => {
        if (id) {
            fetchEventById(id as string);
        }
    }, [id, fetchEventById]);

    useEffect(() => {
        if (id) {
            fetchRegistrants(id as string, {
                page: currentPage,
                limit: 10,
                search: debouncedSearch
            });
        }
    }, [id, currentPage, debouncedSearch, fetchRegistrants]);

    // Scanner lifecycle — using Html5Qrcode directly for full control
    const startScanner = useCallback(async () => {
        try {
            const html5QrCode = new Html5Qrcode("reader");
            html5QrCodeRef.current = html5QrCode;

            await html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                async (decodedText) => {
                    if (isProcessingRef.current) return;
                    isProcessingRef.current = true;
                    setIsProcessing(true);

                    try {
                        // Stop scanning immediately to prevent duplicate scans
                        await html5QrCode.pause(true);

                        const res = await api.post("/attendance/verify", { token: decodedText });
                        setScanResult({
                            success: true,
                            name: res.data.data.name,
                            email: res.data.data.email,
                            avatarUrl: res.data.data.avatarUrl,
                            event: res.data.data.event,
                            attended_at: res.data.data.attended_at,
                            message: res.data.message,
                        });
                        // Refresh registrants list
                        fetchRegistrants(id as string, { page: currentPage, limit: 10, search: debouncedSearch });
                    } catch (error: any) {
                        const errData = error.response?.data;
                        setScanResult({
                            success: false,
                            name: errData?.data?.name || "Unknown",
                            email: errData?.data?.email || "",
                            avatarUrl: errData?.data?.avatarUrl || null,
                            event: errData?.data?.event || "",
                            attended_at: errData?.data?.attended_at || "",
                            message: errData?.message || "Gagal memproses absensi",
                        });
                    } finally {
                        setIsProcessing(false);
                        isProcessingRef.current = false;
                    }
                },
                () => {} // ignore scan failures (no QR in frame)
            );
        } catch (err: any) {
            console.error("Scanner start error:", err);
            toast.error("Gagal memulai kamera. Pastikan izin kamera sudah diberikan.");
        }
    }, [id, currentPage, debouncedSearch, fetchRegistrants]);

    const stopScanner = useCallback(async () => {
        if (html5QrCodeRef.current) {
            try {
                const state = html5QrCodeRef.current.getState();
                if (state === 2 || state === 3) { // SCANNING or PAUSED
                    await html5QrCodeRef.current.stop();
                }
                html5QrCodeRef.current.clear();
            } catch (err: any) {
                console.error("Scanner stop error:", err);
            }
            html5QrCodeRef.current = null;
        }
    }, []);

    const openScanner = () => {
        setScanResult(null);
        setIsScannerOpen(true);
    };

    const closeScanner = async () => {
        await stopScanner();
        setIsScannerOpen(false);
        setScanResult(null);
    };

    const scanAgain = async () => {
        setScanResult(null);
        if (html5QrCodeRef.current) {
            try {
                await html5QrCodeRef.current.resume();
            } catch {
                // If resume fails, restart
                await stopScanner();
                setTimeout(() => startScanner(), 300);
            }
        }
    };

    // Start scanner when modal opens
    useEffect(() => {
        if (isScannerOpen && !scanResult) {
            // Small delay to let the DOM render the #reader div
            const timer = setTimeout(() => startScanner(), 300);
            return () => clearTimeout(timer);
        }
    }, [isScannerOpen, scanResult, startScanner]);

    // Cleanup on unmount
    useEffect(() => {
        return () => { stopScanner(); };
    }, [stopScanner]);

    const handleManualVerify = async (token: string, name: string) => {
        if (!token) return toast.error("Token tidak ditemukan");
        setIsProcessing(true);
        try {
            const res = await api.post("/attendance/verify", { token });
            if (res.data.success) {
                toast.success(`Absensi Berhasil: ${name}`);
                fetchRegistrants(id as string, { page: currentPage, limit: 10, search: debouncedSearch });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Gagal memproses absensi");
        } finally {
            setIsProcessing(false);
        }
    };

    const [isExportOpen, setIsExportOpen] = useState(false);
    const exportRef = useRef<HTMLDivElement>(null);

    // Close export dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
                setIsExportOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleExport = async (type: 'excel' | 'pdf') => {
        setIsExportOpen(false);
        if (!event) {
            toast.error("Tidak ada data untuk diekspor");
            return;
        }

        try {
            toast.loading("Mempersiapkan data ekspor...");
            // Fetch all registrants for export bypassing pagination
            const res = await api.get(`/events/${id}/registrants`, { params: { limit: 10000, page: 1 } });
            const exportDatas = res.data.data;

            if (!exportDatas || exportDatas.length === 0) {
                toast.dismiss();
                toast.error("Tidak ada data registran untuk diekspor");
                return;
            }

            const formattedData = exportDatas.map((r: any, index: number) => ({
                "No": index + 1,
                "Nama Peserta": r.name || "Anonymous",
                "Email": r.email || "N/A",
                "No. HP": r.no_hp || "-",
                "Status Kehadiran": r.is_attended ? "Hadir" : "Belum Hadir",
                "Waktu Hadir": r.is_attended && r.attended_at ? format(new Date(r.attended_at), 'HH:mm:ss, dd MMM yyyy') : "-"
            }));

            const filename = `Peserta_${event.event_title.replace(/[^a-zA-Z0-9]/g, '_')}`;

            toast.dismiss();

            if (type === 'excel') {
                const worksheet = XLSX.utils.json_to_sheet(formattedData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Registrants");
                XLSX.writeFile(workbook, `${filename}.xlsx`);
                toast.success("Berhasil mengekspor ke Excel");
            } else if (type === 'pdf') {
                const doc = new jsPDF('landscape');
                doc.text(`Data Peserta: ${event.event_title}`, 14, 15);
                autoTable(doc, {
                    startY: 20,
                    head: [["No", "Nama Peserta", "Email", "No. HP", "Status", "Waktu Hadir"]],
                    body: formattedData.map((d: any) => [d["No"], d["Nama Peserta"], d["Email"], d["No. HP"], d["Status Kehadiran"], d["Waktu Hadir"]]),
                    theme: 'striped',
                    headStyles: { fillColor: [37, 99, 235] }
                });
                doc.save(`${filename}.pdf`);
                toast.success("Berhasil mengekspor ke PDF");
            }
        } catch (error) {
            console.error("Export Error:", error);
            toast.dismiss();
            toast.error("Gagal mengekspor data");
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading && !event) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 gap-4">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                <p className="text-sm font-bold text-slate-500 animate-pulse uppercase tracking-widest">Loading database...</p>
            </div>
        );
    }

    const { totalRegistrants, totalAttended, totalAbsent } = registrantsPagination;

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50 font-display">
            {/* Top Bar */}
            <header className="min-h-[4rem] py-3 md:py-0 md:h-16 flex items-center justify-between px-4 sm:px-8 bg-white border-b border-slate-200 shrink-0 gap-2">
                <div className="flex items-center gap-4">
                    <AdminBreadcrumb 
                        items={[
                            { label: "Admin", href: "/dashboard" },
                            { label: "Events", href: "/manage-events" },
                            { label: "Registrants" }
                        ]}
                    />
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={openScanner}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                    >
                        <QrCode size={16} />
                        <span className="hidden sm:inline">Scan Attendance</span>
                    </button>
                    <div className="relative z-40" ref={exportRef}>
                        <button
                            onClick={() => setIsExportOpen(!isExportOpen)}
                            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <Download size={16} />
                            <span>Export Data</span>
                        </button>
                        {isExportOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl flex flex-col p-2 animate-in fade-in zoom-in duration-200">
                                <button onClick={() => handleExport('excel')} className="text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">Export to Excel</button>
                                <button onClick={() => handleExport('pdf')} className="text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">Export to PDF</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10">
                <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-100 transition-all hover:scale-105 shrink-0"
                        >
                            <ChevronLeft size={20} className="sm:size-6" />
                        </button>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">{event?.event_title || "Loading Event..."}</h2>
                            <p className="text-slate-500 text-xs sm:text-sm font-medium">Viewing performance and participation list.</p>
                        </div>
                    </div>

                    {/* Stats Summary — 3 cards grid */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-6">
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-1">
                            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{totalRegistrants}</span>
                                {event?.quota && event.quota > 0 && (
                                    <span className="text-[10px] sm:text-sm font-bold text-slate-400 pb-0.5">/ {event.quota}</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col gap-1">
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 uppercase tracking-widest">Hadir</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-2xl sm:text-3xl font-black text-emerald-600 leading-none">{totalAttended}</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-1">
                            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Belum</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-2xl sm:text-3xl font-black text-slate-400 leading-none">{totalAbsent}</span>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col relative">
                        {loading && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                            </div>
                        )}
                        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Cari peserta berdasarkan nama atau email..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-600 text-slate-900"
                                />
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">
                                    Total: <span className="text-slate-900">{totalRegistrants}</span> Registrants
                                </div>
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="grid grid-cols-1 gap-3 lg:hidden p-4">
                            {registrants.length === 0 ? (
                                <div className="bg-white p-10 text-center text-slate-400 font-medium">
                                    Tidak ada peserta ditemukan.
                                </div>
                            ) : registrants.map((r: any) => (
                                <div key={r.registrant_id || r.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-white flex items-center justify-center text-slate-400 font-black text-lg border border-slate-200 overflow-hidden shrink-0">
                                            {r.avatarUrl ? <img src={r.avatarUrl} alt="" className="w-full h-full object-cover" /> : r.name?.charAt(0)}
                                        </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-sm font-black text-slate-900 truncate">{r.name || "Anonymous"}</span>
                                        <span className="text-[10px] font-bold text-slate-400 truncate mt-0.5">{r.email || "No Email"}</span>
                                        {r.no_hp && (
                                            <a 
                                                href={`https://wa.me/${r.no_hp.replace(/\D/g, '')}`} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="text-[10px] font-bold text-blue-500 hover:underline mt-0.5 flex items-center gap-1"
                                            >
                                                WA: {r.no_hp}
                                            </a>
                                        )}
                                    </div>
                                        {/* Status badge inline */}
                                        {r.is_attended ? (
                                            <span className="flex items-center gap-1 text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                                                <CheckCircle2 size={8} />
                                                Hadir
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
                                                Belum
                                            </span>
                                        )}
                                    </div>
                                    {!r.is_attended && (
                                        <button 
                                            onClick={() => handleManualVerify(r.attendance_token, r.name)}
                                            disabled={isProcessing}
                                            className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                        >
                                            Tandai Hadir
                                        </button>
                                    )}
                                    {r.is_attended && r.attended_at && (
                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                            <Clock size={10} />
                                            Hadir: {format(new Date(r.attended_at), 'HH:mm, dd MMM yyyy')}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Peserta</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Email</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">No. HP</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status Kehadiran</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Waktu Hadir</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {registrants.length === 0 ? (
                                        <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-medium">Tidak ada peserta ditemukan.</td></tr>
                                    ) : registrants.map((r: any) => (
                                        <tr key={r.registrant_id || r.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {r.avatarUrl ? (
                                                        <img src={r.avatarUrl} alt={r.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                                                    ) : (
                                                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm uppercase">
                                                            {r.name?.charAt(0) || <UserCircle size={20} />}
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-bold text-slate-900">{r.name || "Anonymous"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">{r.email || "N/A"}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                                {r.no_hp ? (
                                                    <a 
                                                        href={`https://wa.me/${r.no_hp.replace(/\D/g, '')}`} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                                    >
                                                        {r.no_hp}
                                                    </a>
                                                ) : "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {r.is_attended ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                        <CheckCircle2 size={10} /> Hadir
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                        Belum Hadir
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {r.is_attended && r.attended_at ? (
                                                    <span className="text-slate-500 text-xs font-medium">
                                                        {format(new Date(r.attended_at), 'HH:mm, dd MMM')}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-300 text-xs">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {!r.is_attended ? (
                                                    <button
                                                        onClick={() => handleManualVerify(r.attendance_token, r.name)}
                                                        disabled={isProcessing}
                                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-blue-100 hover:text-blue-700 transition-all border border-blue-100 disabled:opacity-50"
                                                        title="Tandai Hadir"
                                                    >
                                                        Tandai Hadir
                                                    </button>
                                                ) : (
                                                    <CheckCircle2 size={16} className="text-emerald-400 ml-auto" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Showing {registrants.length} of {totalRegistrants} Registrants
                            </p>
                            <PaginationComponent
                                currentPage={registrantsPagination.currentPage}
                                totalPages={registrantsPagination.totalPages}
                                onPageChange={handlePageChange}
                                activeColor="blue"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Scanner Modal */}
            {isScannerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeScanner} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
                        {/* Header */}
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <QrCode size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 leading-none">Scan Kehadiran</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Arahkan kamera ke QR peserta</p>
                                </div>
                            </div>
                            <button onClick={closeScanner} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {/* Scan Result View */}
                            {scanResult ? (
                                <div className="flex flex-col items-center gap-4">
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${scanResult.success ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                        {scanResult.success ? <CheckCircle2 size={40} /> : <X size={40} />}
                                    </div>
                                    <div className="text-center">
                                        <h4 className={`text-xl font-black ${scanResult.success ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {scanResult.success ? 'Absensi Berhasil!' : 'Gagal'}
                                        </h4>
                                        <p className="text-sm text-slate-500 mt-1">{scanResult.message}</p>
                                    </div>

                                    <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200/50">
                                            {scanResult.avatarUrl ? (
                                                <img src={scanResult.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {scanResult.name?.charAt(0) || '?'}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{scanResult.name}</p>
                                                <p className="text-[10px] text-slate-400">{scanResult.email}</p>
                                            </div>
                                        </div>
                                        {scanResult.attended_at && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Clock size={12} />
                                                <span>{format(new Date(scanResult.attended_at), 'HH:mm, dd MMM yyyy')}</span>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={scanAgain}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                    >
                                        Scan Lagi
                                    </button>
                                </div>
                            ) : (
                                /* Camera View */
                                <div>
                                    <div className="bg-slate-900 rounded-2xl overflow-hidden relative" style={{ minHeight: 300 }}>
                                        {isProcessing && (
                                            <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                                <Loader2 className="w-10 h-10 text-white animate-spin" />
                                            </div>
                                        )}
                                        <div id="reader" className="w-full"></div>
                                    </div>
                                    <p className="text-center text-xs text-slate-400 mt-4">
                                        Arahkan kamera ke QR code pada tiket peserta
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
