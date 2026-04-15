'use client'
import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export default function AboutUs() {
    const [active, setActive] = useState<string | null>(null)
    const characters = [
        {
            id: "coco",
            title: "Si Coco",
            image: "/img/coco-full.png",
            short: "Kuat di luar, lembut di dalam.",
            full: [
                "Coco itu kayak kelapa, punya tempurung yang keras, tapi isinya super lembut dan menenangkan.",
                "Coco melambangkan remaja yang kelihatan kuat dari luar, tapi punya dunia batin yang lembut dan butuh ruang aman buat didengar.",
                "Serbaguna & Banyak Manfaat. Air kelapa, dagingnya, minyaknya — semuanya berguna.",
                "Coco adalah karakter yang “multifungsi”: suportif, menenangkan, dan selalu punya cara untuk kamu menemukan versi kamu sendiri.",
                "Tahan Banting & Tumbuh di Mana Aja. Pohon kelapa bisa tumbuh dari pantai sampai tengah kota.",
                "Coco melambangkan resilience — kemampuan bangkit bahkan di situasi hidup yang nggak ideal.",
                "Memberi Kesegaran (Refreshing). Air kelapa itu nyegerin banget.",
                "Coco adalah karakter yang kasih perspektif baru, adem, dan penuh ketenangan untuk kamu yang lagi kusut pikiran.",
                "Natural & Apa Adanya. Kelapa itu natural, nggak neko-neko.",
                "Coco menggambarkan kehadiran yang jujur, santai, dan nerima kamu apa adanya."
            ]
        },
        {
            id: "necta",
            title: "Si Necta",
            image: "/img/necta-full.png",
            short: "Sumber energi dan semangat.",
            full: [
                "Necta = Energi Positif",
                "Necta memberi energi ke lelah.",
                "Necta memberi energi ke remaja.",
                "Karakter ini adalah sumber “boost” untuk audience.",
                "Semangat, keceriaan, optimism, motivasi yang bikin hari terasa lebih ringan.",
                "Necta = Dalam “Nectar” Jadi sesuatu yang bermakna nectar adalah inti dari bunga.",
                "Necta membawa pengalaman pahit menjadi pelajaran yang berharga.",
                "Apa pun yang kamu alami sekarang, itu bisa diolah jadi versi dirimu yang lebih kuat.",
                "Necta = Manis, Ceria, Menghidupkan",
                "Necta membawa warna, kehidupan, dan harapan.",
                "Necta = Representasi “Connect”",
                "Necta menyatukan ekosistem remaja."
            ]
        },
        {
            id: "roboteens",
            title: "Si Roboteens",
            image: "/img/roboteens-fullyy.png",
            short: "Teman pintar yang ngerti logika & emosi.",
            full: [
                "Roboteens adalah representasi dari teknologi, inovasi, dan kemampuan adaptasi yang dimiliki remaja masa kini.",
                "Dia cerdas, hangat, dan suka bantu manusia memahami dunia digital dengan cara yang fun.",
                "Mereka bisa robot, Roboteens dibuat dengan emotional module yang bikin dia paham perasaan manusia.",
                "Dia bridging antara data dan emosi, logika dan hati.",
                "Dia percaya self-growth itu proses, kayak update software.",
                "Kadang harus restart, kadang harus install ulang, kadang harus hapus file toxic.",
                "Roboteens adalah representasi “teman pintar” yang bisa bantu remaja memahami teknologi, emosi, dan hidup dengan cara yang tepat tapi hangat."
            ]
        }
    ];
    return (
        <div className="min-h-screen bg-linear-to-br from-white via-blue-50/50 to-indigo-100 overflow-hidden">
            {/* Main Character */}
            <section className="max-w-5xl mx-auto px-6 py-20 space-y-12">
                <div className="text-center space-y-3">
                    <h2 className="text-4xl font-bold">Tokoh Utama</h2>
                    <p className="text-gray-500 italic">Tiga Original Karakter Connectteen</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 justify-items-center">
                    {characters.map((char) => (
                        <div
                            key={char.id}
                            onClick={() => setActive(char.id)}
                            className="w-full max-w-sm bg-white cursor-pointer rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transition"
                        >
                            <Image src={char.image} alt={char.title} width={220} height={220} className="mx-auto mb-4" />
                            <h3 className="font-semibold">{char.title}</h3>
                            <p className="text-sm text-gray-500">{char.short}</p>
                            <p className="text-sm mt-2 text-blue-500 font-medium">Baca Selengkapnya</p>
                        </div>
                    ))}
                </div>

                {/* MODAL */}
                <AnimatePresence>
                    {active && (
                        <>
                            <motion.div
                                className="fixed inset-0 flex items-center justify-center z-50 p-6"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative">

                                    {/* CLOSE */}
                                    <button
                                        onClick={() => setActive(null)}
                                        className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 z-10"
                                    >
                                        ✕
                                    </button>

                                    {characters
                                        .filter((c) => c.id === active)
                                        .map((char) => (
                                            <div key={char.id}>

                                                {/* HEADER (INI YANG BIKIN NAIK LEVEL) */}
                                                <div className="bg-linear-to-r text-black p-6 flex items-center">
                
                                                    <h3 className="text-xl md:text-2xl font-bold leading-tight">
                                                        {char.title}
                                                    </h3>
                                                </div>

                                                {/* CONTENT */}
                                                <div className="p-6 md:p-8 space-y-4 max-h-[60vh] overflow-y-auto">

                                                    {char.full.map((text, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-start gap-3 text-gray-700 leading-relaxed"
                                                        >
                                                            {/* DOT */}
                                                            <div className="mt-2 w-2 h-2 rounded-full bg-black shrink-0" />

                                                            {/* TEXT */}
                                                            <p className="text-sm md:text-base">
                                                                {text}
                                                            </p>
                                                        </div>
                                                    ))}

                                                </div>

                                            </div>
                                        ))}

                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </section>
        </div>
    )
}