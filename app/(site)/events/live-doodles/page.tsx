"use client"
import { useState } from "react"

export default function Form() {
    const [nama, setNama] = useState("")
    const [pesan, setPesan] = useState("")
    const [instagram, setInstagram] = useState("")
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append("nama", nama)
        formData.append("pesan", pesan)
        formData.append("instagram", instagram)

        try {
            const res = await fetch(
                "https://script.google.com/macros/s/AKfycbxo-zobga-VPSNkdxxJehkBUHQ6yoQ0UeL7h0wJc0PXxwBSCnJumYS_uSFd_s8oxZio/exec",
                {
                    method: "POST",
                    body: formData
                }
            )

            const result = await res.text()

            if (result === "success") {
                setShowModal(true)

                setNama("")
                setPesan("")
                setInstagram("")
            }

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-900 p-4">

            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">

                {/* HERO */}
                <div
                    className="relative p-6 text-center bg-cover bg-center"
                    style={{ backgroundImage: "url('/img/doodles.jpg')" }}
                >

                    <div className="absolute inset-0 bg-black/40"></div>

                    <div className="relative h-40 flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-bold text-white">
                            Say Hello!
                        </h1>

                        <p className="text-sm text-white/80 mt-2">
                            Drop your message below
                        </p>
                    </div>

                </div>

                {/* FOLLOW INSTAGRAM */}
                <div className="mb-2 mt-5">

                    <p className="text-sm text-slate-500 text-center mb-4">
                        Follow our Instagram ✨
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">

                        <a
                            href="https://www.instagram.com/connect.teen_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            className="flex items-center gap-2 border border-blue-500/20 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
                        >
                            <svg
                                className="w-5 h-5 text-pink-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5C19.322 22 22 19.322 22 16.25v-8.5C22 4.678 19.322 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.75 2a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>

                            <span className="text-sm font-medium">
                                @connect.teen_
                            </span>
                        </a>

                        <a
                            href="https://www.instagram.com/japanescc_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            className="flex items-center gap-2 border border-blue-500/20 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
                        >
                            <svg
                                className="w-5 h-5 text-pink-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5C19.322 22 22 19.322 22 16.25v-8.5C22 4.678 19.322 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.75 2a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>
                            <span className="text-sm font-medium">
                                @japanescc_
                            </span>
                        </a>

                        <a
                            href="https://www.instagram.com/japanese_club.nesas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            className="flex items-center gap-2 border border-blue-500/20 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
                        >
                            <svg
                                className="w-5 h-5 text-pink-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5C19.322 22 22 19.322 22 16.25v-8.5C22 4.678 19.322 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.75 2a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>
                            <span className="text-sm font-medium">
                                @japanese_club.nesas
                            </span>
                        </a>

                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* NAME */}
                    <div>
                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                            Nama kamu
                        </label>

                        <div className="mt-2 flex items-center border border-blue-500/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                            <input
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Masukan nama kamu"
                                required
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* INSTAGRAM */}
                    <div>
                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                            Instagram kamu
                        </label>

                        <div className="mt-2 flex items-center border border-blue-500/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                            <input
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                placeholder="Masukan username Instagram kamu"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* MESSAGE */}
                    <div>
                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                            Pesan kamu
                        </label>

                        <div className="mt-2 flex border border-blue-500/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                            <textarea
                                value={pesan}
                                onChange={(e) => setPesan(e.target.value)}
                                placeholder="Masukan pesan kamu"
                                rows={4}
                                required
                                className="w-full bg-transparent outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <>
                                Mengirim...
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" />
                            </>
                        ) : (
                            <>Kirim</>
                        )}
                    </button>

                </form>
            </div>

            {/* MODAL SUCCESS */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-2xl p-6 w-[320px] text-center shadow-xl">

                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Text */}
                        <h2 className="text-lg font-bold text-slate-800">
                            Pesan terkirim
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Terima kasih sudah mengirim pesan
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-5 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
                        >
                            OK
                        </button>

                    </div>
                </div>
            )}

        </div>
    )
}