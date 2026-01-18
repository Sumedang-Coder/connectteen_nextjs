'use client'
import { useState } from "react";
import { Music, User, Clock, LogOut, Send as SendIcon, Inbox, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function HistoryPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Mock Google Sign In
    const handleGoogleSignIn = () => {
        setIsAuthenticated(true);
        setUserName("You");
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
        setUserName("");
        setSearchQuery("");
    };

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


    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-cyan-50 flex items-start justify-center pt-24 px-4">
                <div className="max-w-md w-full">
                    {/* Sign In Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 animate-fade-in">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-linear-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl text-gray-900 mb-3">
                                Lihat History Kamu
                            </h1>
                            <p className="text-lg text-gray-600">
                                Masuk untuk melihat semua pesan yang kamu kirim
                            </p>
                        </div>

                        {/* Google Sign In Button */}
                        <Button
                            onClick={handleGoogleSignIn}
                            className="w-full animate-fade-in h-14 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 shadow-md hover:shadow-lg transition-all mb-6"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Masuk dengan Google
                        </Button>
                    </div>

                    {/* Feature Preview */}
                    <div className="mt-8 mb-16 bg-white rounded-xl animate-fade-in p-6 border border-gray-200">
                        <h3 className="text-lg text-gray-900 mb-4">
                            Yang akan kamu lihat setelah masuk:
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <SendIcon className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                <span>Semua pesan yang pernah kamu kirim ke teman</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Inbox className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                <span>Bisa mengelola semua pesan yang telah kamu kirim</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Music className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                <span>Detail lagu lengkap beserta waktu pengiriman</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    // If authenticated, show history
    return (
        <div className="min-h-screen bg-linear-to-br bg-white">
            {/* Header */}
            <div className="bg-linear-to-br from-cyan-600 to-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in">
                        <div>
                            <h1 className="text-4xl mb-2">
                                History Pesan Kamu
                            </h1>
                            <p className="text-xl text-cyan-50 mb-8">
                                Lihat semua pesan yang pernah kamu kirim
                            </p>
                            <div className="relative max-w-xl">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search by recipient, message, or song..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 pl-12 pr-4 bg-white text-gray-900 border-0 shadow-lg"
                                />
                            </div>
                        </div>
                        <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                            {/* Overlay */}
                            <div className="absolute top-4 right-4 z-10">
                                <Button
                                    onClick={handleSignOut}
                                    variant="outline"
                                    className="bg-white/80 backdrop-blur border-white text-gray-800 hover:bg-white font-bold"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </Button>
                            </div>

                            {/* Image */}
                            <Image
                                src="/img/hero-history.jpg"
                                alt="History Message"
                                fill
                                priority
                                quality={80}
                                sizes="100vw"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="space-y-6">
                    <div className="animate-fade-in md:px-15">
                        <h2 className="text-2xl text-gray-900 mb-2">
                            {searchQuery
                                ? `Hasil Pencarian (${filteredMessages.length})`
                                : 'Semua Pesan Terkirim'}
                        </h2>

                        <p className="text-md text-gray-600">
                            {searchQuery
                                ? `Menampilkan pesan yang cocok dengan "${searchQuery}"`
                                : `Kamu telah mengirim total ${allMessages.length} pesan`
                            }
                        </p>
                    </div>

                    {filteredMessages.length === 0 ? (
                        <div className="bg-white rounded-xl animate-fade-in p-12 text-center border border-gray-200">
                            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl text-gray-900 mb-2">
                                Pesan tidak ditemukan
                            </h3>
                            <p className="text-gray-600">
                                Coba ubah kata kunci pencarian kamu
                            </p>

                        </div>
                    ) : (
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
                    )}
                </div>

                {/* Stats Card */}
                <div className="mt-12 bg-white rounded-xl animate-fade-in p-8 border border-gray-200">
                    <h3 className="text-2xl text-gray-900 mb-6">
                        Statistik Kamu
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="text-center">
                            <div className="text-4xl text-cyan-600 mb-2">
                                {allMessages.length}
                            </div>
                            <div className="text-sm text-gray-600">
                                Total Pesan Terkirim
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl text-purple-600 mb-2">
                                {allMessages.length}
                            </div>
                            <div className="text-sm text-gray-600">
                                Lagu yang Dibagikan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}