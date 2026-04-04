"use client";

import { useEffect, useState, useRef, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, Search, QrCode, Globe } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import DOMPurify from "dompurify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { toast, Toaster } from "sonner";
import Loader from "@/components/Loader";

import { useEventStore } from "@/app/store/useEventStore";
import RegistrationDataModal from "./components/RegistrationDataModal";

export default function Events() {
  const { events, fetchEvents, toggleRegisterEvent, loading } =
    useEventStore();
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRegisterClick = async (event: any) => {
    const isGuest = user?.role === "guest";
    const hasMissingData =
      !user?.name || user?.name.startsWith("Anonymous") || !user?.no_hp;


    if (event.is_registered) {
      setLoadingId(event.id);
      await toggleRegisterEvent(event.id);
      setLoadingId(null);
      return;
    }

    if (!isAuthenticated || isGuest || hasMissingData) {
      setPendingEventId(event.id);
      setIsDataModalOpen(true);
      return;
    }

    setLoadingId(event.id);
    await toggleRegisterEvent(event.id);
    setLoadingId(null);
  };

  const handleDataModalSuccess = async () => {
    if (pendingEventId) {
      setLoadingId(pendingEventId);
      await toggleRegisterEvent(pendingEventId);
      setLoadingId(null);
      setPendingEventId(null);
    }
  };
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventForQR, setSelectedEventForQR] = useState<{ id: string, title: string, token: string } | null>(null);

  const handleSearch = async () => {
    await fetchEvents({ search: searchQuery });
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, isAuthenticated]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => event.visibility !== "private");
  }, [events]);

  if (loading && events.length === 0) {
    return <Loader size="sm" fullScreen />;
  }


  const toggleExpand = (eventId: string) => {
    setExpandedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };


  return (
    <div className="bg-slate-50 min-h-screen relative">

      {loading && events.length > 0 && (
        <div className="absolute inset-0 z-10 bg-white backdrop-blur-sm flex justify-center">
          <Loader size="sm" />
        </div>
      )}
      {/* HERO */}
      <section className="relative bg-linear-to-r from-cyan-500 to-blue-600 py-24 px-6 overflow-hidden">
        <div className="max-w-4xl animate-fade-in mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
            Semua Event
          </h1>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-2xl shadow-2xl p-2">
              <Search className="ml-4 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari event, workshop, atau seminar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 outline-none text-gray-700"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:brightness-110 transition"
              >
                Cari
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* EVENTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10 animate-fade-in">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <p className="text-gray-500 mt-2">
            Discover berbagai event seru untuk generasi muda.
          </p>
        </div>

        {/* EMPTY STATE */}
        {!loading && filteredEvents.length === 0 && (
          <div className="py-24 text-center animate-fade-in flex flex-col items-center">
            <div className="w-40 h-40 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Belum ada event
            </h3>
            <p className="text-slate-500">
              Coba kata kunci lain atau lihat event terbaru nanti.
            </p>
          </div>
        )}

        {filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-15 gap-8">
            {filteredEvents.map((event) => {
              const isLoading = loadingId === event.id;
              const isExpanded = expandedEvents.has(event.id);

              return (
                <div
                  key={event.id}
                  className="bg-white animate-fade-in dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col hover:shadow-xl transition-all group"
                >
                  {/* IMAGE */}
                  <div className="h-56 relative overflow-hidden">
                    {event.image_url && (
                      <Image
                        src={event.image_url}
                        alt={event.event_title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                      {event.event_title}
                    </h3>

                    <DescriptionWithToggle
                      description={event.description}
                      isExpanded={isExpanded}
                      onToggle={() => toggleExpand(event.id)}
                    />

                    {/* TAG INFO */}
                    <div className="flex flex-wrap gap-2 mt-4 mb-6">
                      <Tag>
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)} {event.time && `• ${event.time}`}
                      </Tag>

                      {event.is_online ? (
                        <Tag color="green">
                          <Globe className="w-4 h-4" />
                          Online
                        </Tag>
                      ) : (
                        <Tag color="purple">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </Tag>
                      )}

                      <Tag color="pink">
                        <Users className="w-4 h-4" />
                        {event.registrants_count ?? 0} Peserta
                      </Tag>

                      {event.is_registered && event.attendance_token && (
                        <Tag color="green">
                          <QrCode className="w-4 h-4" />
                          Tiket Tersedia
                        </Tag>
                      )}
                      {event.quota > 0 && (event.registrants_count ?? 0) >= event.quota && !event.is_registered && (
                        <Tag color="pink">
                          Penuh
                        </Tag>
                      )}
                    </div>

                    {/* QR TICKET & JOIN LINK BUTTONS */}
                    <div className="flex flex-col gap-2 mb-4">
                      {event.is_online && !event.is_registered && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-3">
                          <Globe className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-emerald-700 leading-tight">
                            Event ini dilaksanakan secara <strong>Online</strong>. Link meeting akan tersedia di sini setelah Anda mendaftar.
                          </p>
                        </div>
                      )}

                      {event.is_registered && event.attendance_token && (
                        <button
                          onClick={() => setSelectedEventForQR({
                            id: event.id,
                            title: event.event_title,
                            token: event.attendance_token!
                          })}
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition shadow-sm"
                        >
                          <QrCode className="w-5 h-5" />
                          Lihat QR Tiket
                        </button>
                      )}

                      {event.is_registered && event.is_online && event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-md animate-pulse-subtle"
                        >
                          <Globe className="w-5 h-5" />
                          Join Meeting Sekarang
                        </a>
                      )}
                    </div>

                    {/* BUTTON */}
                    <button
                      disabled={isLoading || event.status === "closed" || (!event.is_registered && event.quota > 0 && (event.registrants_count ?? 0) >= event.quota)}
                      onClick={() => handleRegisterClick(event)}
                      className={`mt-auto py-3 rounded-xl font-semibold transition shadow-md
                      ${event.status === "closed"
                          ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                          : event.is_registered
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : (!event.is_registered && event.quota > 0 && (event.registrants_count ?? 0) >= event.quota)
                              ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                              : "bg-blue-600 hover:brightness-110 text-white"
                        }`}
                    >
                      {isLoading
                        ? "Memproses..."
                        : event.status === "closed"
                          ? "Tutup"
                          : event.is_registered
                            ? "Batalkan"
                            : (!event.is_registered && event.quota > 0 && (event.registrants_count ?? 0) >= event.quota)
                              ? "Penuh"
                              : "Register"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* QR MODAL */}
      <Dialog open={!!selectedEventForQR} onOpenChange={(open) => !open && setSelectedEventForQR(null)}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Tiket Event</DialogTitle>
            <DialogDescription className="text-center">
              Tunjukkan QR Code ini ke petugas untuk absensi.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-lg font-bold text-blue-600 mb-6 text-center">
              {selectedEventForQR?.title}
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-lg border-2 border-slate-100">
              {selectedEventForQR?.token && (
                <QRCodeSVG
                  value={selectedEventForQR.token}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              )}
            </div>

            <div className="mt-8 text-sm text-slate-500 text-center bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
              "Pesan: Pastikan Anda datang tepat waktu dan mematuhi protokol yang berlaku."
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster richColors position="top-center" />

      <RegistrationDataModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        onSuccess={handleDataModalSuccess}
      />
    </div>
  );
}

function DescriptionWithToggle({
  description,
  isExpanded,
  onToggle,
}: {
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, [description]);

  return (
    <div>
      {isExpanded ? (
        <div
          className="text-sm prose prose-sm max-w-none text-gray-600 mb-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      ) : (
        <p
          ref={textRef}
          className="text-sm text-gray-600 line-clamp-2"
        >
          {stripHtml(description)}
        </p>
      )}
      {isOverflowing && (
        <button
          onClick={onToggle}
          className="text-blue-500 text-sm mt-1 hover:underline"
        >
          {isExpanded ? "Tutup" : "Baca Selengkapnya"}
        </button>
      )}
    </div>
  );
}

function stripHtml(html: string) {
  if (typeof window === "undefined") return html.replace(/<[^>]*>?/gm, '');
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Tag({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: "blue" | "purple" | "pink" | "green";
}) {
  const map = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
    green: "bg-emerald-100 text-emerald-600",
  };

  return (
    <span
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${map[color]}`}
    >
      {children}
    </span>
  );
}