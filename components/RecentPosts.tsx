import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Music } from "lucide-react";

const messages = [
  {
    id: 1,
    to: "Sarah M.",
    avatar: "SM",
    message: "Hey! Just discovered this amazing song, you have to listen to it! It reminds me of our trip last summer 🌅",
    music: {
      title: "Just The Way You Are",
      artist: "Bruno Mars",
      album: "Doo-Wops & Hooligans"
    },
    color: "from-pink-400 to-rose-400",
    bgColor: "from-pink-50 to-rose-50"
  },
  {
    id: 2,
    to: "Alex K.",
    avatar: "AK",
    message: "This track has been on repeat all day! The energy is incredible 💫",
    music: {
      title: "Bad Romance",
      artist: "Lady Gaga",
      album: "The Fame Monster"
    },
    color: "from-purple-400 to-indigo-400",
    bgColor: "from-purple-50 to-indigo-50"
  },
  {
    id: 3,
    to: "Jordan P.",
    avatar: "JP",
    message: "Found this while studying, thought you'd love it for your playlist!",
    music: {
      title: "Locked Out of Heaven",
      artist: "Bruno Mars",
      album: "Unorthodox Jukebox"
    },
    color: "from-cyan-400 to-blue-400",
    bgColor: "from-cyan-50 to-blue-50"
  },
  {
    id: 4,
    to: "Taylor S.",
    avatar: "TS",
    message: "Perfect song for the weekend! Can't wait to share this at the party 🎉",
    music: {
      title: "Poker Face",
      artist: "Lady Gaga",
      album: "The Fame"
    },
    color: "from-yellow-400 to-orange-400",
    bgColor: "from-yellow-50 to-orange-50"
  },
  {
    id: 5,
    to: "Chris B.",
    avatar: "CB",
    message: "This is our new anthem! You were right about this album being fire 🔥",
    music: {
      title: "24K Magic",
      artist: "Bruno Mars",
      album: "24K Magic"
    },
    color: "from-green-400 to-emerald-400",
    bgColor: "from-green-50 to-emerald-50"
  },
  {
    id: 6,
    to: "Morgan L.",
    avatar: "ML",
    message: "Listening to this on my morning run - such good vibes!",
    music: {
      title: "Shallow",
      artist: "Lady Gaga",
      album: "A Star Is Born"
    },
    color: "from-fuchsia-400 to-pink-400",
    bgColor: "from-fuchsia-50 to-pink-50"
  }
];

export function RecentPosts() {
  return (
    <section className="py-16 px-6 bg-linear-to-b from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 text-8xl opacity-20">🎨</div>
      <div className="absolute bottom-0 left-0 text-7xl opacity-20">🎪</div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Recent Messages 💌</h2>
          <p className="text-xl">See what your friends are sharing!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <Card key={msg.id} className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg">
              <CardHeader className={`pb-3 bg-linear-to-br ${msg.bgColor}`}>
                <div className="flex items-center gap-3">
                  <Avatar className="border-3 border-white shadow-md">
                    <AvatarFallback className={`bg-linear-to-br ${msg.color} text-white`}>
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">To: {msg.to}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4 pt-4 space-y-3">
                <p>{msg.message}</p>
                <div className={`bg-linear-to-br ${msg.bgColor} p-4 rounded-2xl border-2 border-white shadow-md`}>
                  <div className="flex items-start gap-3">
                    <div className={`bg-linear-to-br ${msg.color} rounded-xl p-2 shrink-0 shadow-lg`}>
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{msg.music.title}</p>
                      <p className="text-sm text-muted-foreground">{msg.music.artist}</p>
                      <p className="text-xs text-muted-foreground">{msg.music.album}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
