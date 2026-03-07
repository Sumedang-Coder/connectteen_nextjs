"use client";

import { useEffect, useState, useRef, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import Link from "next/link";

import { useEventStore } from "@/app/store/useEventStore";

export default function Events() {
  const { events, fetchEvents, toggleRegisterEvent, loading } =
    useEventStore();

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredEvents = useMemo(() => {
    if (!debouncedQuery) return events;

    return events.filter((event) =>
      event.event_title
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase())
    );
  }, [events, debouncedQuery]);

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
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
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
                onClick={() => setDebouncedQuery(searchQuery)}
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

        <Link href="/events/live-doodles">
          <div className="max-w-lg mx-auto cursor-pointer rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all group">

            {/* IMAGE */}
            <div className="h-72 relative overflow-hidden">
              <Image
                src="/img/doodles_new.png"
                alt="Send Message"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 flex items-center justify-between">

              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-600 transition">
                  Live Doodles Photo
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                  Tuliskan pesan mu di Event ini.
                </p>

                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                    <Tag>
                      <Calendar className="w-4 h-4" />
                      8 Maret 2026
                    </Tag>

                    <Tag color="purple">
                      <MapPin className="w-4 h-4" />
                      Sumedang Creative Center
                    </Tag>

                  </div>

              </div>

            </div>

          </div>
        </Link>

        {/* Empty State */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Tidak ada event ditemukan.
          </div>
        )}

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
                      {formatDate(event.date)}
                    </Tag>

                    <Tag color="purple">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </Tag>

                    <Tag color="pink">
                      <Users className="w-4 h-4" />
                      {event.registrants_count ?? 0} Peserta
                    </Tag>
                  </div>

                  {/* BUTTON */}
                  <button
                    disabled={isLoading}
                    onClick={async () => {
                      setLoadingId(event.id);
                      await toggleRegisterEvent(event.id);
                      setLoadingId(null);
                    }}
                    className={`mt-auto py-3 rounded-xl font-semibold transition shadow-md
                      ${event.is_registered
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-blue-600 hover:brightness-110 text-white"
                      }`}
                  >
                    {isLoading
                      ? "Memproses..."
                      : event.is_registered
                        ? "Batalkan"
                        : "Register"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
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
      <p
        ref={textRef}
        className={`text-sm whitespace-pre-line text-gray-600 ${isExpanded ? "" : "line-clamp-2"
          }`}
      >
        {description}
      </p>
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
  color?: "blue" | "purple" | "pink";
}) {
  const map = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
  };

  return (
    <span
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${map[color]}`}
    >
      {children}
    </span>
  );
}