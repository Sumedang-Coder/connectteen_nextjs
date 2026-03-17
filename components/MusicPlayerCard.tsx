"use client";

import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";

type Song = {
    song_image: string;
    song_name: string;
    song_artist: string;
    preview_url?: string;
};

export default function MusicPlayerCard({ song }: { song: Song }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);

    const [bgColor, setBgColor] = useState("rgb(40,40,40)");
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (!song.song_image) return;

        const fac = new FastAverageColor();
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = song.song_image;

        img.onload = async () => {
            const color = await fac.getColorAsync(img);
            setBgColor(color.rgb);
        };
    }, [song.song_image]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) return;

        setCurrent(audio.currentTime);
        setDuration(audio.duration);

        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        const bar = progressRef.current;

        if (!audio || !bar) return;

        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;

        audio.currentTime = percent * audio.duration;
    };

    const formatTime = (time: number) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <div
            className="rounded-3xl p-4 sm:p-6 text-white shadow-xl"
            style={{
                background: `linear-gradient(to bottom, ${bgColor}, #000)`
            }}
        >
            <div className="flex items-center gap-4">

                {/* COVER */}
                <img
                    src={song.song_image}
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl object-cover shadow-lg shrink-0"
                />

                <div className="flex-1 min-w-0">

                    {/* TITLE */}
                    <h3 className="text-sm sm:text-lg font-bold truncate">
                        {song.song_name}
                    </h3>

                    <p className="text-white/80 mb-2 text-xs sm:text-base truncate">
                        {song.song_artist}
                    </p>

                    {/* PLAYER */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* PLAY BUTTON */}
                        <button
                            onClick={togglePlay}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center font-bold hover:scale-105 transition"
                        >
                            {isPlaying ? "❚❚" : "▶"}
                        </button>

                        {/* CURRENT TIME */}
                        <span className="text-xs sm:text-sm w-8 sm:w-10 text-right">
                            {formatTime(current)}
                        </span>

                        {/* PROGRESS BAR */}
                        <div
                            ref={progressRef}
                            onClick={handleSeek}
                            className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                        >
                            <div
                                className="h-full bg-white"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* DURATION */}
                        <span className="text-xs sm:text-sm w-8 sm:w-10">
                            {formatTime(duration)}
                        </span>

                    </div>
                </div>
            </div>

            {song.preview_url && (
                <audio
                    ref={audioRef}
                    src={song.preview_url}
                    onTimeUpdate={handleTimeUpdate}
                />
            )}
        </div>
    );
}