"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEventStore } from "@/app/store/useEventStore";
import Loader from "./Loader";

export function Events() {
  const { events, fetchEvents, toggleRegisterEvent } = useEventStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loadingId) {
    return <Loader size="md" fullScreen />;
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
    <section className="relative overflow-hidden bg-linear-to-b from-white via-yellow-50 to-orange-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
            Events yang akan datang!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-auto-rows-min px-3 md:px-15 gap-6">
          {events.map((event) => {
            const isLoading = loadingId === event.id;
            const isExpanded = expandedEvents.has(event.id);

            return (
              <Card
                key={event.id}
                className="flex flex-col overflow-hidden rounded-2xl shadow-md  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-h-0 "
              >
                {/* image */}
                {event.image_url ? (
                  <div className="relative h-44 w-full">
                    <Image
                      src={event.image_url}
                      alt={event.event_title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ) : (
                  <div className="h-44 w-full bg-gray-100" />
                )}

                {/* content */}
                <CardContent
                  className="flex flex-col flex-1 justify-between"
                >
                  <div className="space-y-4">
                    <h3 className="text-md font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {event.event_title}
                    </h3>

                    <div className="min-h-12">
                      <DescriptionWithToggle
                        description={event.description}
                        isExpanded={isExpanded}
                        onToggle={() => toggleExpand(event.id)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="space-y-2 text-sm">
                      <InfoRow icon={<Calendar className="h-4 w-4" />} color="blue">
                        {formatDate(event.date)}
                      </InfoRow>

                      <InfoRow icon={<MapPin className="h-4 w-4" />} color="purple">
                        {event.location}
                      </InfoRow>

                      <InfoRow icon={<Users className="h-4 w-4" />} color="pink">
                        {event.registrants_count ?? 0} Peserta
                      </InfoRow>
                    </div>

                    <Button
                      disabled={isLoading}
                      onClick={async () => {
                        setLoadingId(event.id);
                        await toggleRegisterEvent(event.id);
                        setLoadingId(null);
                      }}
                      className={`
          w-full rounded-xl font-medium
          mt-6 md:mt-0
          ${event.is_registered
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-blue-500 hover:bg-blue-600"
                        }
        `}
                    >
                      {isLoading
                        ? "Memproses..."
                        : event.is_registered
                          ? "Batalkan Pendaftaran"
                          : "Daftar Sekarang"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
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
      // Cek apakah tinggi scroll > tinggi client (artinya overflow)
      setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [description]);

  return (
    <div>
      <p
        ref={textRef}
        className={`text-sm whitespace-pre-line text-gray-600 ${isExpanded ? '' : 'line-clamp-2'}`}
      >
        {description}
      </p>
      {isOverflowing && (
        <button
          onClick={onToggle}
          className="text-blue-500 text-sm mt-1 hover:underline"
        >
          {isExpanded ? 'Tutup' : 'Baca Selengkapnya'}
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

function InfoRow({
  icon,
  color,
  children,
}: {
  icon: React.ReactNode;
  color: "blue" | "purple" | "pink";
  children: React.ReactNode;
}) {
  const map = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    pink: "bg-pink-50 text-pink-600",
  };

  return (
    <div
      className={`
        flex items-center gap-2
        rounded-lg px-3 py-2
        ${map[color]}
      `}
    >
      {icon}
      <span className="truncate">{children}</span>
    </div>
  );
}