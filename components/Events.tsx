"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEventStore } from "@/app/store/useEventStore";

export function Events() {
  const { events, fetchEvents, toggleRegisterEvent } = useEventStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-yellow-50 to-orange-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
            Events yang akan datang!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:grid-cols-3 md:px-15 gap-6">
          {events.map((event) => {
            const isLoading = loadingId === event.id;

            return (
              <Card
                key={event.id}
                className="flex flex-col overflow-hidden border-4 border-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl max-h-[500px]"
              >
                <div className="h-2 bg-linear-to-r from-blue-400 to-cyan-400" />

                <CardHeader className="bg-linear-to-br from-cyan-50 to-blue-50">
                  <CardTitle className="text-lg font-semibold">
                    {event.event_title}
                  </CardTitle>
                </CardHeader>

                {event.image_url && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image_url}
                      alt={event.event_title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <CardContent className="flex flex-col space-y-4">
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <InfoRow icon={<Calendar />} color="blue">
                      {formatDate(event.date)}
                    </InfoRow>

                    <InfoRow icon={<MapPin />} color="purple">
                      {event.location}
                    </InfoRow>

                    <InfoRow icon={<Users />} color="pink">
                      {event.registrants_count ?? 0} Kehadiran
                    </InfoRow>
                  </div>

                  <Button
                    disabled={isLoading}
                    onClick={async () => {
                      setLoadingId(event.id);
                      await toggleRegisterEvent(event.id);
                      setLoadingId(null);
                    }}
                    className={`mt-auto w-full text-white ${event.is_registered
                        ? "bg-red-500 hover:bg-red-600" // jika true → Batalkan Pendaftaran
                        : "bg-linear-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500" // jika false → Daftar Sekarang
                      }`}
                  >
                    {isLoading
                      ? "Memproses..."
                      : event.is_registered
                        ? "Batalkan Pendaftaran"
                        : "Daftar Sekarang"}
                  </Button>


                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
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
    <div className={`flex items-center gap-2 rounded-lg p-2 ${map[color]}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
}
