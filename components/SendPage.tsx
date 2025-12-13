'use client';
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Search, Send, Music, Users } from "lucide-react";

export function SendPage() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [showSongSearch, setShowSongSearch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mockSongs = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
    { id: 2, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
    { id: 3, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR" },
    { id: 4, title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*ck Love 3: Over You" },
    { id: 5, title: "Heat Waves", artist: "Glass Animals", album: "Dreamland" },
  ];

  const filteredSongs = searchQuery
    ? mockSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockSongs;

  const handleSendMessage = () => {
    if (recipient && message) {
      alert(`Message sent to ${recipient}! 🎉`);
      setRecipient("");
      setMessage("");
      setSelectedSong(null);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-cyan-600 to-blue-600
    transition-all duration-500 ease-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl text-white mb-3">
            Send a Message
          </h1>
          <p className="text-lg text-white">
            Share your thoughts and favorite music with friends
          </p>
        </div>

        {/* Main form card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="space-y-6">
            {/* Recipient field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                To
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter recipient's name..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="h-12 pl-10 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Message field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Your Message
              </label>
              <Textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="p-4 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
              />
            </div>

            {/* Spotify section */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Add a Song (Optional)
              </label>
              
              {!showSongSearch && !selectedSong && (
                <Button
                  onClick={() => setShowSongSearch(true)}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-cyan-500 hover:bg-cyan-50 text-gray-600 hover:text-cyan-600 transition-all"
                >
                  <Music className="mr-2 w-5 h-5" />
                  Search for a song on Spotify
                </Button>
              )}

              {showSongSearch && !selectedSong && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for songs or artists..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-11 border-gray-300 focus:border-cyan-500 bg-white"
                    />
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {filteredSongs.map((song) => (
                      <button
                        key={song.id}
                        onClick={() => {
                          setSelectedSong(song);
                          setShowSongSearch(false);
                        }}
                        className="w-full p-3 text-left bg-white hover:bg-cyan-50 rounded-lg border border-gray-200 hover:border-cyan-300 transition-all"
                      >
                        <div className="text-sm text-gray-900">{song.title}</div>
                        <div className="text-xs text-gray-500">{song.artist} • {song.album}</div>
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={() => setShowSongSearch(false)}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {selectedSong && (
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-900 mb-0.5">{selectedSong.title}</div>
                        <div className="text-xs text-gray-600">{selectedSong.artist}</div>
                        <div className="text-xs text-gray-500">{selectedSong.album}</div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedSong(null)}
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Send button */}
            <Button
              onClick={handleSendMessage}
              disabled={!recipient || !message}
              className="w-full h-12 bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="mr-2 w-5 h-5" />
              Send Message
            </Button>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-sm text-gray-700">
            <strong>Tips:</strong> Menambahkan lagu akan membuat pesanmu terasa lebih personal dan berkesan. Temanmu bisa mendengarkan lagu tersebut bersamaan dengan pesan yang kamu kirimkan.
          </p>
        </div>
      </div>
    </div>
  );
}