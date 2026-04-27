'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

type Detail = {
    title: string
    desc: string | string[]
}

type Character = {
    id: string
    title: string
    image: string
    short: string
    full: Detail[]
}

const characters: Character[] = [
    {
        id: "coco",
        title: "Si Coco",
        image: "/img/coco-full.png",
        short: "Kuat di luar, lembut di dalam.",
        full: [
            {
                title: "Coco itu kayak kelapa, punya tempurung yang keras, tapi isinya super lembut dan menenangkan.",
                desc: "Coco melambangkan remaja yang kelihatan kuat dari luar, tapi punya dunia batin yang lembut dan butuh ruang aman buat didengar."
            },
            {
                title: "Serbaguna & Banyak Manfaat. Air kelapa, dagingnya, minyaknya – semuanya berguna.",
                desc: "Coco adalah karakter yang “multifungsi”: suportif, menenangkan, dan selalu punya cara membantu kamu memaknai perasaan."
            },
            {
                title: "Tahan Banting & Tumbuh di Mana Aja. Pohon kelapa bisa tumbuh dari pantai sampai tanah keras.",
                desc: "Coco melambangkan resilience – kemampuan bangkit bahkan di situasi hidup yang nggak ideal."
            },
            {
                title: "Memberi Kesegaran (Refreshing). Air kelapa itu nyegerin banget.",
                desc: "Coco adalah karakter yang kasih perspektif baru, adem, dan penuh ketenangan untuk kamu yang lagi kusut pikiran."
            },
            {
                title: "Natural & Apa Adanya. Kelapa itu natural, nggak neko-neko.",
                desc: "Coco menggambarkan kehadiran yang jujur, santai, dan nerima kamu apa adanya."
            }
        ]
    },
    {
        id: "necta",
        title: "Si Necta",
        image: "/img/necta-full.png",
        short: "Sumber energi dan semangat.",
        full: [
            {
                title: "Necta = Energi Positif",
                desc: [
                    "Nectar memberi energi ke lebah.",
                    "Necta memberi energi ke remaja.",
                    "Karakter ini adalah sumber “boost” untuk audiens yaitu semangat, keberanian, optimisme, motivasi yang bikin hari terasa lebih ringan."
                ]
            },
            {
                title: "Nectar = Bahan Mentah Jadi Sesuatu yang Berharga. Nectar diolah oleh lebah jadi madu (valuable).",
                desc: [
                    "Masalah, kebingungan, atau pengalaman pahit remaja bisa diolah jadi pelajaran yang berharga.",
                    "Jadi Necta bisa membawa pesan:",
                    "“Apa pun yang kamu alami sekarang, kita bisa olah jadi versi dirimu yang lebih kuat.”"
                ]
            },
            {
                title: "Necta = Manis, Cerah, Menghidupkan",
                desc: [
                    "Nectar = sesuatu yang membawa rasa manis dan kehidupan pada alam.",
                    "Necta sebagai karakter membawa: senyum, keceriaan, humor, warna, harapan.",
                ]
            },
            {
                title: "Necta = Mengajak, Bukan Menggurui",
                desc: [
                    "Nectar nggak memaksa lebah, dia menarik dengan caranya sendiri.",
                    "Necta = bukan pengkhotbah, tapi magnet energi positif yang bikin remaja mau ikut bergerak.",
                ]
            },
            {
                title: "Necta = Representasi “Connect",
                desc: [
                    "Nectar menyatukan ekosistem lebah.",
                    "Necta menghubungkan remaja dengan: ide positif, kebiasaan sehat, lingkungan suportif, cara berpikir baru. Dia bukan cuma karakter, tapi connector.",
                ]
            },
        ]
    },
    {
        id: "roboteens",
        title: "Si Roboteens",
        image: "/img/roboteens-fullyy.png",
        short: "Teman pintar yang ngerti logika & emosi.",
        full: [
            {
                title: "Cerdas & adaptif",
                desc: "Roboteens adalah representasi dari teknologi, inovasi, dan kemampuan adaptasi yang dimiliki remaja masa kini. Dia robot yang nggak kaku, punya kepribadian hangat, dan suka bantu manusia memahami dunia digital dengan cara yang fun."
            },
            {
                title: "Punya empati",
                desc: "Meski dia robot, Roboteens dibuat dengan emotional module yang bikin dia paham perasaan manusia. Dia bridging antara data dan emosi, logika dan hati – khas banget peran remaja Gen-Z yang hidup di dua dunia: real life dan digital life."
            },
            {
                title: "Bridge dua dunia",
                desc: "Dia percaya self-growth itu proses, kayak update software: kadang harus restart, kadang harus install ulang, kadang harus hapus file toxic. Dia ngajarin orang buat terus berkembang tanpa merasa gagal itu akhir."
            },
            {
                title: "🌿 Coco – Strength & Resilience",
                desc: "Coco ngingetin bahwa jadi kuat itu bukan soal nggak pernah jatuh, tapi gimana kamu bangkit dan jujur sama diri sendiri."
            },
            {
                title: "🍯 Necta – Healing & Growth",
                desc: "Necta adalah simbol proses. Dia lembut, penuh empati, dan ngajarin bahwa luka itu bukan akhir, tapi awal perjalanan baru."
            },
            {
                title: "🤖 Roboteens – Smart Guidance",
                desc: "Roboteens adalah representasi “teman pintar” yang bisa bantu remaja memahami teknologi, emosi, dan hidup dengan cara logis tapi tetap hangat."
            }
        ]
    }
]

export default function AboutUs() {
    const [active, setActive] = useState<Character | null>(null)

    // ESC close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActive(null)
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    return (
        <div className="min-h-screen bg-linear-to-br from-white via-blue-50/70 to-indigo-100">

            <section className="max-w-6xl mx-auto px-5 md:px-6 py-20 md:py-24 space-y-14">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
                        Tokoh Utama
                    </h2>

                    <p className="text-sm md:text-base text-gray-500 italic leading-relaxed max-w-xl mx-auto">
                        Kamu kuat (Coco), kamu bertumbuh (Necta), dan kamu selalu bisa belajar (Roboteens).
                    </p>
                </motion.div>

                {/* CARD */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {characters.map((char, i) => (
                        <motion.div
                            key={char.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -6 }}
                            onClick={() => setActive(char)}
                            className="group cursor-pointer bg-white/80 backdrop-blur rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all"
                        >
                            <div className="relative h-44 md:h-52 w-full mb-4">
                                <Image
                                    src={char.image}
                                    alt={char.title}
                                    fill
                                    className="object-contain group-hover:scale-105 transition"
                                />
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600">
                                {char.title}
                            </h3>

                            <p className="text-gray-600 mt-2 text-sm md:text-base">
                                {char.short}
                            </p>

                            <div className="mt-3 text-xs md:text-sm text-blue-500 font-semibold">
                                Lihat Detail →
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* MODAL */}
                <AnimatePresence>
                    {active && (
                        <>
                            {/* BACKDROP */}
                            <motion.div
                                className="fixed inset-0 bg-black/40 h-screen backdrop-blur-sm z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setActive(null)}
                            />

                            {/* MODAL */}
                            <motion.div
                                className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div className="bg-white rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90dvh] shadow-2xl relative overflow-y-auto">

                                    {/* CLOSE */}
                                    <button
                                        onClick={() => setActive(null)}
                                        className="md:absolute md:top-4 md:right-4 fixed top-14 right-6 z-50 bg-white/80 cursor-pointer backdrop-blur rounded-full px-3 py-1 shadow"
                                    >
                                        ✕
                                    </button>

                                    <div className="grid lg:grid-cols-2">

                                        {/* IMAGE (FIXED) */}
                                        <div className="bg-white flex items-center justify-center p-6 md:p-10">
                                            <Image
                                                src={active.image}
                                                alt={active.title}
                                                width={240}
                                                height={240}
                                                className="object-contain drop-shadow-xl"
                                            />
                                        </div>

                                        {/* CONTENT (SCROLL) */}
                                        <div className="p-5 md:p-8 space-y-4 overflow-y-auto max-h-[70dvh] md:max-h-[80dvh] pb-10">

                                            <h3 className="text-xl md:text-2xl font-bold">
                                                {active.title}
                                            </h3>

                                            {active.full.map((item, i) => (
                                                <div key={i} className="space-y-1">
                                                    <p className="font-semibold text-gray-800">
                                                        {item.title}
                                                    </p>

                                                    {Array.isArray(item.desc) ? (
                                                        item.desc.map((text, j) => (
                                                            <p key={j} className="text-gray-600 leading-relaxed">
                                                                {text}
                                                            </p>
                                                        ))
                                                    ) : (
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {item.desc}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </section>
        </div>
    )
}