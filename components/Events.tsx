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
    description: "Join us for a discussion of this month's book pick! Everyone is welcome.",
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
    description: "Learn storytelling techniques from published teen authors.",
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
    description: "Open discussion about mental health with professional counselors.",
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
    description: "Casual gaming session with the community. Bring your favorite games!",
    emoji: "🎮",
    color: "from-orange-400 to-red-400",
    bgColor: "from-orange-50 to-red-50"
  }
];

export function Events() {
  return (
    <section className="py-16 px-6 bg-linear-to-b from-white via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-red-600">Upcoming Events 🎉</h2>
          <p className="text-xl">Don't miss out on the fun!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg overflow-hidden">
              <div className={`h-2 bg-linear-to-r ${event.color}`}></div>
              <CardHeader className={`bg-linear-to-br ${event.bgColor}`}>
                <div className="flex items-center gap-3">
                  <div className="text-5xl">{event.emoji}</div>
                  <CardTitle className="flex-1">{event.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
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
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <Button className={`w-full mt-4 bg-linear-to-r ${event.color} text-white border-0 shadow-lg hover:shadow-xl transition-all`}>
                  Register for Event ✨
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Cute decorative elements */}
      <div className="absolute top-20 right-10 text-6xl animate-pulse">🎊</div>
      <div className="absolute bottom-20 left-10 text-5xl">🎈</div>
    </section>
  );
}
