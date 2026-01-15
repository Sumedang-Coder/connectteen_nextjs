'use client';

import { useState } from "react";
import { Music, Search, Heart, MessageCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");

    const allMessages = [
        {
            id: 1,
            from: "Emma R.",
            recipient: "Sarah M.",
            message: "This song literally describes exactly how I feel! Thank you for introducing me to it 💙",
            song: { title: "Drivers License", artist: "Olivia Rodrigo", album: "SOUR" },
            likes: 156,
            comments: 23,
            timestamp: "2 hours ago"
        },
        {
            id: 2,
            from: "Michael T.",
            recipient: "Alex K.",
            message: "Found this gem while scrolling and immediately thought of you. The vibes are immaculate! ✨",
            song: { title: "Sunflower", artist: "Post Malone & Swae Lee", album: "Hollywood's Bleeding" },
            likes: 142,
            comments: 18,
            timestamp: "5 hours ago"
        },
        {
            id: 3,
            from: "Sophie L.",
            recipient: "Jordan P.",
            message: "Can't stop listening to this! Every time it comes on I think about our summer adventures 🌊",
            song: { title: "Good Days", artist: "SZA", album: "Good Days" },
            likes: 138,
            comments: 15,
            timestamp: "8 hours ago"
        },
        {
            id: 4,
            from: "Chris B.",
            recipient: "Taylor M.",
            message: "This track has been on repeat all week! Perfect for our road trip playlist 🚗",
            song: { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
            likes: 124,
            comments: 12,
            timestamp: "1 day ago"
        },
        {
            id: 5,
            from: "Maya P.",
            recipient: "Olivia K.",
            message: "You NEED to hear this right now. It's giving main character energy! 💫",
            song: { title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights" },
            likes: 119,
            comments: 14,
            timestamp: "1 day ago"
        },
        {
            id: 6,
            from: "Ryan L.",
            recipient: "Marcus D.",
            message: "Bro, this song goes so hard! Adding it to every single one of my playlists 🔥",
            song: { title: "Heat Waves", artist: "Glass Animals", album: "Dreamland" },
            likes: 107,
            comments: 9,
            timestamp: "2 days ago"
        },
        {
            id: 7,
            from: "Jessica W.",
            recipient: "Emma H.",
            message: "This reminds me so much of you! Can we please add this to our study playlist? 📚",
            song: { title: "Vampire", artist: "Olivia Rodrigo", album: "GUTS" },
            likes: 98,
            comments: 11,
            timestamp: "2 days ago"
        },
        {
            id: 8,
            from: "Daniel K.",
            recipient: "Jake S.",
            message: "Found the perfect song for those late night drives. Pure vibes! 🌙",
            song: { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
            likes: 92,
            comments: 8,
            timestamp: "3 days ago"
        },
        {
            id: 9,
            from: "Aria M.",
            recipient: "Sophia R.",
            message: "I'm literally crying over this song. It hits different at 2am 😭✨",
            song: { title: "Flowers", artist: "Miley Cyrus", album: "Endless Summer Vacation" },
            likes: 87,
            comments: 10,
            timestamp: "3 days ago"
        }
    ];

    const filteredMessages = searchQuery
        ? allMessages.filter(
            (msg) =>
                msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.song.artist.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : allMessages;

    return (
        <div className="min-h-screen bg-linear-to-br bg-white">
            <div className="bg-linear-to-br from-cyan-600 to-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in">
                        <div >
                            <h2 className="text-4xl mb-4">
                                Jelajahi Pesan
                            </h2>
                            <p className="text-lg text-cyan-50 mb-8">
                                Lihat apa yang sedang dibagikan teman-teman dan temukan ide untuk pesanmu selanjutnya
                            </p>

                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search messages, songs, or people..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 pl-12 pr-4 bg-white text-gray-900 border-0 shadow-lg"
                                />
                            </div>
                        </div>
                        <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src="/img/hero-explore.jpg"
                                alt="Motivations"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="mb-8 animate-fade-in md:px-15">
                    <h2 className="text-2xl text-gray-900 mb-2">
                        {searchQuery ? `Hasil Pencarian (${filteredMessages.length})` : 'Semua Pesan'}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {searchQuery
                            ? `Menampilkan hasil untuk "${searchQuery}"`
                            : 'Lihat pesan-pesan yang dibagikan oleh teman kita untuk sahabat mereka'
                        }
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:grid-cols-3 md:px-15 gap-6">
                    {filteredMessages.map((msg) => (
                        <Card key={msg.id} className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white shadow-lg">
                            <CardHeader className={`pb-3 bg-linear-to-br bg-cyan-50`}>
                                <div className="flex items-center gap-3">
                                    <Avatar className="border-3 border-white shadow-md">
                                        <AvatarFallback className={`bg-linear-to-br bg-blue-400 text-white`}>
                                            {msg.from.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-medium">To: {msg.recipient}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-4 flex flex-col h-full justify-between space-y-3">
                                <p>{msg.message}</p>
                                <div className={`bg-linear-to-br bg-cyan-50 mt-1 p-4 rounded-2xl border-2 border-white shadow-md`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`bg-linear-to-br bg-blue-400 rounded-xl p-2 shrink-0 shadow-lg`}>
                                            <Music className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{msg.song.title}</p>
                                            <p className="text-sm text-muted-foreground">{msg.song.artist}</p>
                                            <p className="text-xs text-muted-foreground">{msg.song.album}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
