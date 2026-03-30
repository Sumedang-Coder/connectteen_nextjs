'use client'

import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  Users,
  Heart,
  Sparkles,
  Globe,
  Shield,
  Brain,
  Zap,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  Instagram
} from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const stats = [
    { number: "500+", label: "Remaja Terhubung" },
    { number: "20+", label: "Workshop" },
    { number: "100%", label: "Ruang Aman" }
  ]

  const member = [
    {
      name: 'Adryan',
      role: 'Website Developer',
      image: '/img/adryan.jpeg',
      color: 'from-blue-500 to-indigo-500',
      instagram: 'https://instagram.com/ryaan.vh',
    },
    {
      name: 'Alifah',
      role: 'Illustrator',
      image: '/img/alifah.jpeg',
      color: 'from-pink-500 to-rose-500',
      instagram: 'https://instagram.com/4lz_artt',
    },
    {
      name: 'Aditya',
      role: 'Website Developer',
      image: '/img/aditya.jpeg',
      color: 'from-emerald-500 to-teal-500',
      instagram: 'https://instagram.com/adityrstu',
    }
  ]


  return (
    <div className="min-h-screen bg-linear-to-br from-white via-blue-50/50 to-indigo-100 overflow-hidden">

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg mb-8">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Komunitas Remaja #1</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black bg-linear-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Connec<span className="text-blue-500">Teen</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Kita terhubung untuk <span className="font-bold text-blue-600">menginspirasi</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href={'https://whatsapp.com/channel/0029VaxJTD1GE56idHGxL30O'} 
              target="_blank"
              className="group bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              Gabung Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button 
              onClick={() => document.getElementById('apa-itu')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 transition-colors px-6 py-4"
            >
              <MessageCircle className="w-6 h-6" />
              Pelajari Lebih Lanjut
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">
                {stat.number}
              </div>
              <p className="text-gray-700 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="apa-itu" className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-16 border border-white/50"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* FOTO FOUNDER */}
            <motion.div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/img/founder.jpeg"
                  alt="Founder ConnecTeen"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* TEXT */}
            <motion.div>
              <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
                Apa itu ConnecTeen?
              </h2>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                ConnecTeen adalah <span className="font-bold text-blue-600">program pengembangan diri</span> untuk remaja yang fokus pada
                kesehatan reproduksi, mental wellness, self love, dan social awareness.
              </p>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Kami hadir sebagai <span className="font-bold text-blue-900">ruang aman</span>, teman, dan kompas bagi remaja.
              </p>

              {/* BUTTON OPEN MODAL */}
              <button
                onClick={() => setOpen(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Baca selengkapnya →
              </button>

              {/* IDENTITAS FOUNDER */}
              <div className="mt-6">
                <p className="font-semibold text-gray-900 text-lg">Hariz Fairuz Kamal</p>
                <p className="text-gray-600">Founder ConnectTeen</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* CONTENT */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl overflow-y-auto max-h-[80vh] space-y-6">

                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600"
                >
                  ✕
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Apa itu ConnectTeen?
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  ConnectTeen adalah program pengembangan diri untuk remaja yang fokus pada
                  Kesehatan Reproduksi, Mental Wellness, Self Love, dan Social Awareness dengan pendekatan yang relatable, kreatif, dan fun.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Remaja hari ini hidup di banyak tekanan — sekolah, pertemanan, ekspektasi, body image, hingga kesehatan mental — dan sering kali nggak tahu harus cerita ke siapa.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Di sinilah ConnectTeen hadir: sebagai teman, ruang aman, dan kompas.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  ConnectTeen lahir saat Founder kami <strong>Hariz Fairuz Kamal</strong> menjalani peran sebagai Duta Genre Kabupaten Sumedang.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Dari interaksi langsung dengan remaja, terlihat bahwa banyak dari mereka menghadapi tekanan dan membutuhkan ruang aman yang relevan.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Berangkat dari kepedulian tersebut, ConnectTeen berkembang menjadi komunitas yang menghubungkan, mendukung, dan menginspirasi remaja.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Kami percaya setiap remaja berhak merasa diterima dan didukung.
                </p>



              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-linear-to-br from-blue-500/90 to-indigo-600/90 text-white rounded-3xl p-10 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <Shield className="w-16 h-16 mb-6 opacity-80" />
            <h3 className="text-3xl md:text-4xl font-black mb-6">Kenapa Kami Ada?</h3>
            <p className="text-xl opacity-95 leading-relaxed">
              Kami menciptakan komunitas sebagai ruang aman agar remaja merasa didengar, terhubung, dan terinspirasi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-black text-gray-900">Tujuan Kami</h3>
            {[
              "Memberdayakan remaja untuk berani jadi diri sendiri",
              "Memberikan edukasi dengan cara yang fun",
              "Membangun komunitas yang sehat dan suportif"
            ].map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shrink-0 mt-1 font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <p className="text-lg text-gray-700 font-medium group-hover:text-blue-600 transition-colors">{goal}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-center mb-20 bg-linear-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent"
        >
          Nilai Kami
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: 'Growth',
              desc: 'Semua orang berhak bertumbuh dengan ritmenya sendiri',
              color: 'from-yellow-400 to-orange-500'
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: 'Empathy',
              desc: 'Kami mendengarkan sebelum menilai',
              color: 'from-pink-500 to-rose-500'
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Community',
              desc: 'Ruang aman tanpa judgment',
              color: 'from-emerald-500 to-teal-500'
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: 'Connection',
              desc: 'Remaja butuh ruang untuk terhubung',
              color: 'from-blue-500 to-indigo-500'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:bg-white"
            >
              <div className={`absolute -inset-2 bg-linear-to-r ${item.color} blur-xl opacity-20 group-hover:opacity-30 transition-opacity rounded-3xl -z-10`} />
              <div className={`p-4 bg-linear-to-r ${item.color} text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                {item.icon}
              </div>
              <h4 className="text-xl font-black mb-3 text-gray-900 group-hover:text-gray-800">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-blue-600 text-white rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top,var(--tw-linear-stops))] from-white/10 to-transparent" />
          <div className="relative z-10">
            <Zap className="w-20 h-20 mb-8 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-black mb-12 max-w-3xl leading-tight">
              Apa yang Bikin Kami <span className="text-white/90">Berbeda?</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-xl">
              {[
                "Bahasa yang relate & tidak menggurui",
                "Topik dekat dengan kehidupan remaja",
                "Komunitas yang aman dan suportif",
                "Dibangun dari remaja, oleh remaja, untuk remaja"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-2xl">
                    {i + 1}
                  </div>
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Hopeless */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-600 text-white rounded-3xl p-12 md:p-20 shadow-2xl text-center relative overflow-hidden"
        >
          {/* Background effect */}
          <div className="absolute inset-0 bg-[radial-linear(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
              Harapan Kami
            </h2>

            <p className="text-xl md:text-2xl leading-relaxed mb-10 text-white/90">
              Biar setiap remaja bisa bilang:
            </p>

            <div className="space-y-4 text-2xl md:text-3xl font-semibold">
              <p className="bg-white/10 backdrop-blur-sm rounded-xl py-3">
                “Aku cukup”
              </p>
              <p className="bg-white/10 backdrop-blur-sm rounded-xl py-3">
                “Aku berarti”
              </p>
              <p className="bg-white/10 backdrop-blur-sm rounded-xl py-3">
                “Aku layak didengerin”
              </p>
            </div>

            <p className="mt-12 text-lg md:text-xl text-white/80 leading-relaxed">
              Karena kadang yang mereka butuhkan hanyalah satu hal:
              <br />
              <span className="font-semibold text-white">
                tempat di mana mereka bisa jadi diri sendiri tanpa takut.
              </span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* TEAM */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-20 bg-linear-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
          Orang di Balik ConnectTeen
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {member.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              {/* Glow */}
              <div className={`absolute -inset-1 bg-linear-to-r ${member.color} opacity-0 group-hover:opacity-20 blur-xl transition-all rounded-3xl`} />

              <div className="relative z-10">
                {/* Avatar */}
                <div className={`w-24 h-24 mx-auto rounded-2xl bg-linear-to-r ${member.color} p-0.5 mb-6`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {member.role}
                </p>

                {/* Username */}
                <p className="text-xs text-gray-500 mb-4">
                  @{member.instagram.split('/').pop()}
                </p>

                {/* Social */}
                <div className="flex justify-center gap-4">
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-pink-500 hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:scale-110"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-32 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black mb-6"
        >
          Kamu Layak Didengar
        </motion.h2>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Tempat di mana kamu bisa jadi diri sendiri tanpa takut.
        </p>

        <Link 
          href={'https://whatsapp.com/channel/0029VaxJTD1GE56idHGxL30O'}
          target="_blank"
          className="inline-block bg-linear-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:scale-105 transition"
        >
          Gabung Sekarang
        </Link>
      </section>

    </div>
  )
}