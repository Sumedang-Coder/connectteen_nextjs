'use client';
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Search, Send, Music, Users } from "lucide-react";
import { useMessageStore } from "@/app/store/useMessageStore";
import api from "@/lib/axios"

export function SendPage() {
  const sendMessage = useMessageStore((s) => s.sendMessage);

  const [recipient, setRecipient] = useState("");
  const [lastRecipient, setLastRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [showSongSearch, setShowSongSearch] = useState(false);
  const [songs, setSongs] = useState<any[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);

  const handleSearchSongs = async (query: string) => {
    if (!query) return setSongs([]);
    setLoadingSongs(true);

    try {
      const res = await api.get("/music", { params: { search: query } });
      setSongs(res.data.data || []);
    } catch (err: any) {
      console.error("Failed to fetch music:", err);
      setSongs([]);
    } finally {
      setLoadingSongs(false);
    }
  };

  const handleSendMessage = async () => {
    if (
      !recipient ||
      !message ||
      !selectedSong?.id ||
      !selectedSong?.name ||
      !selectedSong?.artist ||
      !selectedSong?.image
    ) {
      return;
    }

    setLoadingSend(true);

    try {
      setLastRecipient(recipient);

      await sendMessage({
        recipient_name: recipient,
        message,
        song_id: selectedSong.id,
        song_name: selectedSong.name,
        song_artist: selectedSong.artist,
        song_image: selectedSong.image,
      });

      setRecipient("");
      setMessage("");
      setSelectedSong(null);
      setSearchQuery("");
      setShowSongSearch(false);

      setShowSentModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setLoadingSend(false);
    }
  };


  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchSongs(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl text-white mb-3">
            Kirimkan Pesan Spesialmu!
          </h1>
          <p className="text-lg text-white">
            Bagikan pesan hangat dan lagu favoritmu kepada teman spesialmu
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl animate-fade-in shadow-lg border border-gray-200 p-8 mb-8 space-y-6">
          {/* Recipient */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Untuk siapa pesannya?</label>
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

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Pesanmu untuknya?</label>
            <Textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="p-4 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
            />
          </div>

          {/* Spotify */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Tambahkan Lagu dari Spotify
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

            {showSongSearch && (
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
                  {loadingSongs ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                  ) : songs.length > 0 ? (
                    songs.map((song: any) => (
                      <button
                        key={song.id}
                        onClick={() => {
                          setSelectedSong(song);
                          setShowSongSearch(false);
                        }}
                        className="w-full p-3 text-left bg-white hover:bg-cyan-50 rounded-lg border border-gray-200 hover:border-cyan-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          {song.image && (
                            <img
                              src={song.image}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                          )}

                          <div className="min-w-0">
                            <div className="text-sm text-gray-900 truncate">
                              {song.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {song.artist}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No songs found.</p>
                  )}
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
              <div className="p-4 bg-linear-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {selectedSong.image && (
                      <img
                        src={selectedSong.image}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="text-sm text-gray-900 mb-0.5">{selectedSong.name}</div>
                      <div className="text-xs text-gray-600">{selectedSong.artist}</div>
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
            disabled={!recipient || !message || !selectedSong || loadingSend}
            className="w-full h-12 bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingSend ? "Sending..." : <><Send className="mr-2 w-5 h-5" /> Send Message</>}
          </Button>
        </div>

        {showSentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col gap-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-gray-800">Pesan Terkirim!</h2>
              <p className="text-sm text-gray-600">
                Pesanmu berhasil dikirim ke {lastRecipient} 🎉
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSentModal(false)}
                  className="px-4"
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
