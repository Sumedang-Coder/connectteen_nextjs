import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Virtual Book Club Meetup",
    date: "Dec 2, 2025",
    time: "4:00 PM EST",
    location: "Online - Zoom",
    attendees: 24,
    description: "Diskusi buku bulanan kita tentang novel remaja populer!",
    emoji: "📚",
    color: "from-blue-400 to-cyan-400",
    bgColor: "from-blue-50 to-cyan-50"
  },
  {
    id: 2,
    title: "Creative Writing Workshop",
    date: "Dec 8, 2025",
    time: "3:00 PM EST",
    location: "Online - Discord",
    attendees: 18,
    description: "Belajar teknik menulis kreatif dengan penulis muda berbakat.",
    emoji: "✍️",
    color: "from-purple-400 to-pink-400",
    bgColor: "from-purple-50 to-pink-50"
  },
  {
    id: 3,
    title: "Mental Health Awareness Session",
    date: "Dec 15, 2025",
    time: "5:00 PM EST",
    location: "Online - Google Meet",
    attendees: 32,
    description: "Diskusi terbuka tentang pentingnya kesehatan mental di kalangan remaja.",
    emoji: "🧠",
    color: "from-green-400 to-emerald-400",
    bgColor: "from-green-50 to-emerald-50"
  },
  {
    id: 4,
    title: "Game Night Friday",
    date: "Dec 20, 2025",
    time: "7:00 PM EST",
    location: "Online - Multiple Platforms",
    attendees: 45,
    description: "Sesi permainan santai dengan teman-teman komunitas.",
    emoji: "🎮",
    color: "from-orange-400 to-red-400",
    bgColor: "from-orange-50 to-red-50"
  }
];

export function Events() {
  return (
    <section className="py-16 px-6 bg-linear-to-b from-white via-yellow-50 to-orange-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-transparent bg-clip-text bg-blue-500 drop-shadow-md">Events yang akan datang! 🎉</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:px-12 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="flex flex-col hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg overflow-hidden"
            >
              <div className="h-2 bg-linear-to-r bg-blue-400"></div>
              <CardHeader className="bg-linear-to-br bg-cyan-50">
                <div className="flex flex-col items-start gap-3">
                  <CardTitle className="text-left">{event.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-left flex flex-col h-full">
                <p className="text-muted-foreground">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm bg-blue-50 p-2 rounded-lg">
                    <Calendar className={`w-4 h-4 bg-linear-to-r ${event.color} bg-clip-text text-transparent`} />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-purple-50 p-2 rounded-lg">
                    <MapPin className={`w-4 h-4 bg-linear-to-r ${event.color} bg-clip-text text-transparent`} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-pink-50 p-2 rounded-lg">
                    <Users className={`w-4 h-4 bg-linear-to-r ${event.color} bg-clip-text text-transparent`} />
                    <span>{event.attendees} Kehadiran</span>
                  </div>
                </div>
                <Button className="w-full mt-auto bg-linear-to-r from-blue-400 to-cyan-400 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                  Daftar Sekarang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cute decorative elements */}
      <div className="absolute top-20 right-10 text-6xl animate-pulse hidden lg:block">🎊</div>
      <div className="absolute bottom-20 left-10 text-5xl">🎈</div>
    </section>
  );
}
