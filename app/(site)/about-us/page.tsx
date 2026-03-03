'use client';

import React from 'react';
import Image from 'next/image';
import {
  Rocket,
  Target,
  Eye,
  Heart,
  Zap,
  Users,
  Award,
  Globe,
  Coffee,
  Code,
  Lightbulb,
  ArrowDown,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';

// Komponen Helper untuk Icon Mengambang
const FloatingIcon = ({
  icon: Icon,
  size = 24,
  className = '',
  delay = 0,
  duration = 6,
  top,
  left,
  right,
  bottom
}: {
  icon: React.ElementType;
  size?: number;
  className?: string;
  delay?: number;
  duration?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}) => {
  return (
    <div
      className={`absolute text-blue-500/40 z-0 pointer-events-none ${className}`}
      style={{
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        animationDelay: `${delay}s`
      }}
    >
      <div
        className="animate-float"
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        <Icon size={size} />
      </div>
    </div>
  );
};

// Data Tim
const teamMembers = [
  {
    name: "Alex Fernando",
    role: "Founder & CEO",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    bio: "Visioner di balik Nexus dengan 10 tahun pengalaman di industri Tech.",
    social: { linkedin: "#", twitter: "#", instagram: "#" }
  },
  {
    name: "Sarah Jeni",
    role: "Chief Technology Officer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Ahli arsitektur sistem yang memastikan infrastruktur tetap tangguh.",
    social: { linkedin: "#", twitter: "#", instagram: "#" }
  },
  {
    name: "Budi Santoso",
    role: "Lead Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    bio: "Sang master kode yang mengubah kopi menjadi sintaksis yang elegan.",
    social: { linkedin: "#", twitter: "#", instagram: "#" }
  },
  {
    name: "Dewi Lestari",
    role: "UI/UX Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi",
    bio: "Desainer kreatif yang mengubah ide menjadi visual yang memukau.",
    social: { linkedin: "#", twitter: "#", instagram: "#" }
  }
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white overflow-hidden font-sans">

      {/* --- SECTION 1: PEMBUKA (HERO) --- */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-linear-to-br bg-white text-white">
        {/* Latar Belakang Icon Mengambang */}
        <FloatingIcon icon={Rocket} size={80} top="10%" left="8%" delay={0} />
        <FloatingIcon icon={Lightbulb} size={60} top="15%" right="12%" delay={1} />
        <FloatingIcon icon={Zap} size={56} bottom="25%" left="15%" delay={2} />
        <FloatingIcon icon={Globe} size={100} bottom="5%" right="8%" delay={1.5} />
        <FloatingIcon icon={Code} size={70} top="40%" left="3%" delay={0.5} />
        <FloatingIcon icon={Coffee} size={50} top="60%" right="5%" delay={2.5} />
        <FloatingIcon icon={Award} size={40} top="25%" left="20%" delay={1.8} />
        <FloatingIcon icon={Target} size={45} bottom="30%" right="15%" delay={0.8} />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl text-slate-900 lg:text-8xl font-extrabold mb-6 tracking-tight">
            Connect<span className="text-blue-500 drop-shadow-lg">Teen</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-900 font-light opacity-95 max-w-2xl mx-auto leading-relaxed">
            "Kita Terhubung Untuk Menginspirasi"
          </p>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <div className="flex flex-col items-center text-slate-900">
            <span className="text-xs mb-2">Scroll untuk melihat</span>
            <ArrowDown size={24} />
          </div>
        </div>
      </section>


      <section className="py-28 px-6 relative bg-white dark:bg-slate-900 overflow-hidden">
        <FloatingIcon icon={Code} size={150} top="5%" left="-3%" className="opacity-5" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">

          {/* LEFT CONTENT */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Filosofi <span className="text-blue-600 dark:text-blue-400">ConnectTeen</span>
              </h2>
              <div className="w-20 h-1.5 bg-blue-500 rounded-full"></div>
            </div>

            <div className="space-y-8 text-lg leading-relaxed text-slate-600 dark:text-slate-300">

              {/* APA */}
              <div className="p-6 rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">
                  Apa itu ConnectTeen?
                </h3>
                <p className="relative pl-6 border-l-4 border-blue-500">
                ConnectTeen adalah program pengembangan diri untuk remaja yang fokus pada
                Kesehatan Reproduksi, Mental Wellness, Self Love, dan Social Awareness dengan
                pendekatan yang relatable, kreatif, dan fun.
                <br />
                <br />
                Kami nggak cuma bikin konten edukasi, tapi juga menciptakan pengalaman: komunitas
                sebagai ruang aman, pembelajaran yang menyenangkan, dan karakter yang dekat
                dengan dunia remaja.
                <br />
                ConnectTeen hadir sebagai jembatan agar remaja merasa terhubung, didengar, dan
                terinspirasi.
                <br />
                <br />
                Karena realitanya, remaja hari ini hidup di banyak tekanan sekolah, pertemanan,
                ekspektasi, body image, hingga kesehatan mental dan sering kali nggak tahu harus
                cerita ke siapa
                <br />
                Di sinilah ConnectTeen ada: sebagai teman, ruang aman, dan kompas.
              </p>
              </div>

              {/* KENAPA */}
              <div className="p-6 rounded-2xl border border-purple-100 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-900/20 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">
                  Kenapa ConnectTeen Ada?
                </h3>
                <p className="relative pl-6 border-l-4 border-purple-500">
                ConnectTeen lahir saat Founder kami <strong>Hariz Fairuz Kamal</strong> menjalani peran sebagai
                Duta Genre Kabupaten Sumedang. Melalui interaksi langsung dengan remaja, terlihat
                jelas bahwa banyak dari mereka menghadapi tekanan, kebingungan, dan kebutuhan
                akan ruang aman yang relevan dengan dunia mereka.
                <br />
                <br />
                Berangkat dari kepedulian tersebut, ConnectTeen dibentuk sebagai program
                pengembangan diri bagi remaja. Awalnya berfokus pada edukasi, ConnectTeen
                kemudian berkembang menjadi komunitas dan ruang aman yang menghubungkan,
                mendukung, dan menginspirasi remaja untuk tumbuh dengan kesadaran diri.
                <br />
                <br />
                Nama ConnectTeen diambil dari dua kata: Connect dan Teen, yang berarti
                menghubungkan remaja. Program ini dirancang untuk menghubungkan seluruh
                generasi remaja, termasuk remaja disabilitas, agar mereka punya akses yang setara
                terhadap edukasi, ruang aman, dan kesempatan berkembang.
                Kami percaya bahwa setiap remaja, tanpa terkecuali, berhak merasa diterima dan
                didukung.
              </p>
              </div>

            </div>
          </div>

          {/* RIGHT VISUAL FLOATING CARDS */}
          <div className="relative h-[520px] flex items-center justify-center">

            {/* Safe Space */}
            <div className="absolute top-10 left-0 w-64 p-6 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-pink-100 dark:border-pink-800 transform -rotate-6 hover:-translate-y-2 transition-all duration-300">
              <Heart className="text-pink-500 mb-4" size={36} />
              <h4 className="font-bold text-lg mb-2 dark:text-white">Safe Space</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ruang tanpa penghakiman untuk jadi diri sendiri.
              </p>
            </div>

            {/* Inclusive */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-6 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-blue-100 dark:border-blue-800 z-20 hover:-translate-y-2 transition-all duration-300">
              <Users className="text-blue-500 mb-4" size={36} />
              <h4 className="font-bold text-lg mb-2 dark:text-white">Inclusive</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Semua remaja berhak terhubung dan didukung.
              </p>
            </div>

            {/* Empowered */}
            <div className="absolute bottom-10 right-0 w-64 p-6 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-orange-100 dark:border-orange-800 transform rotate-6 hover:-translate-y-2 transition-all duration-300">
              <Rocket className="text-orange-500 mb-4" size={36} />
              <h4 className="font-bold text-lg mb-2 dark:text-white">Youth Empowered</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Memberi spark dan tools untuk bertumbuh.
              </p>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl -z-10 scale-75"></div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: TUJUAN & NILAI-NILAI --- */}
      <section className="py-28 px-6 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        <FloatingIcon icon={Award} size={120} top="5%" right="-2%" delay={0} />
        <FloatingIcon icon={Heart} size={80} bottom="10%" left="5%" delay={1} />
        <FloatingIcon icon={Zap} size={60} top="30%" right="5%" delay={2} />

        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">Our Principles</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Tujuan & Nilai-nilai Inti</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">Kita terhubung untuk menginspirasi</p>
            <br />
            <br />
            <div className=" bg-white dark:bg-slate-700 p-8 md:w-3/4 mx-auto rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <p className="relative pl-6 border-l-4 text-left border-blue-500">
                <strong>Tujuan utama ConnectTeen dirangkum jadi 3 hal:</strong>
                <br />
                1. Empower Teens (Memberdayakan Remaja)
                <br />
                Biar mereka berani ngomong, berani milih, berani nolak, dan berani jadi diri sendiri.
                <br />
                2. Educate With Fun (Ngasih Ilmu Tapi Nggak Ngebosenin)
                <br />
                Topik seperti Kesehatan Reproduksi, self-love, mental health, relationship sehat,
                bullying, sampai krisis identitas…
                Semua dibahas dengan gaya yang ringan, relate, dan gampang dicerna.
                <br />
                3. Build Safe Community (Bikin Komunitas yang Sehat)
                <br />
                ConnectTeen pengen bikin satu ruang di mana remaja bisa saling dukung, bukannya
                saling jatuhin
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:px-20 gap-8">
            {/* Card 1 */}
            <div className="group bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="w-32 h-32 mx-auto bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition duration-300">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Growth</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Semua orang berhak bertumbuh dengan ritmenya sendiri.</p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="w-32 h-32 mx-auto bg-linear-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition duration-300">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Empathy</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Sebelum menasihati, kita dengarkan dulu.</p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="w-32 h-32 mx-auto bg-linear-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition duration-300">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Creativity</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Belajar itu harus fun.</p>
            </div>
            {/* Card 4 */}
            <div className="group bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="w-32 h-32 mx-auto bg-linear-to-br from-green-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition duration-300">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Connection</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Manusia butuh manusia, remaja butuh ruang yang aman.</p>
            </div>
          </div>
        </div>
      </section>


      {/* --- SECTION 4: PEMBEDA & HARAPAN --- */}
      <section className="py-28 px-6 bg-linear-to-br from-blue-800 via-teal-900 to-slate-900 text-white text-center relative overflow-hidden">
        <FloatingIcon icon={Coffee} size={100} bottom="5%" left="5%" delay={2} />
        <FloatingIcon icon={Rocket} size={80} top="10%" right="10%" delay={3} />
        <FloatingIcon icon={Lightbulb} size={60} top="50%" left="3%" delay={1} />
        <FloatingIcon icon={Target} size={50} bottom="20%" right="5%" delay={0.5} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-yellow-400 font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Apa yang Membedakan Kami?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300 text-left">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4 text-yellow-400">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-yellow-300">Karakter Original</h4>
              <p className="text-white/80 leading-relaxed">karakter original (Coco, Necta, Roboteens) yang meaningful.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300 text-left">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400">
                <Lightbulb size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-purple-300">Pengemasan Topik</h4>
              <p className="text-white/80 leading-relaxed">Topik sehari-hari tapi dibahas dalam bentuk yang menarik dan mudah dipahami.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300 text-left">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4 text-yellow-400">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-yellow-300">Save Place</h4>
              <p className="text-white/80 leading-relaxed">Komunitas yang aman, tanpa judgment.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300 text-left">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400">
                <Lightbulb size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-purple-300">Kebersamaan</h4>
              <p className="text-white/80 leading-relaxed">Movement yang disi dari remaja, oleh remaja, untuk remaja.</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12">
            <h3 className="text-2xl md:text-3xl font-semibold">Harapan ConnectTeen</h3>
            <p className="text-white/80 mb-6 dark:text-white max-w-2xl mx-auto text-lg">Harapan kami sederhana</p>
            <div className="max-w-3xl mx-auto">
              <div className="text-5xl text-yellow-500/30 mb-4">"</div>
              <p className="text-xl md:text-2xl opacity-90 italic leading-relaxed font-light">
                Biar setiap remaja bisa bilang <span className="text-yellow-300 font-medium">“Aku cukup, aku berarti, dan aku layak didengerin.” </span>
                Karena kadang yang mereka butuhkan hanyalah satu hal...
                Tempat di mana mereka bisa jadi diri sendiri tanpa takut.

              </p>
              <div className="text-5xl text-yellow-500/30 mt-4">"</div>
            </div>
          </div>
        </div>
      </section>


      {/* --- SECTION 5: TIM & KONTRIBUTOR --- */}
      <section className="py-28 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Tim Di Balik Layar</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Wajah-wajah cerdas dan passionate yang membuat segalanya mungkin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card Founder (Lebih Besar) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl hover:shadow-2xl text-center transform hover:-translate-y-1 transition duration-300 border border-slate-100 dark:border-slate-700">
              <div className="relative w-36 h-36 mx-auto mb-4">
                <div className="absolute inset-0 bg-linear-to-tr from-blue-500 to-purple-600 rounded-full blur-md opacity-50"></div>
                <Image
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Founder"
                  fill
                  className="rounded-full object-cover border-4 border-white dark:border-slate-700 relative z-10"
                />
              </div>
              <h3 className="text-xl font-bold">Alex Fernando</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">Founder & CEO</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Visioner di balik Nexus dengan 10 tahun pengalaman di industri Tech.</p>
              <div className="flex justify-center gap-3 mt-4">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition duration-300">
                  <Linkedin size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-400 hover:text-white transition duration-300">
                  <Twitter size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-pink-500 hover:text-white transition duration-300">
                  <Instagram size={14} />
                </a>
              </div>
            </div>

            {/* Card Team Members */}
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl hover:shadow-2xl text-center transform hover:-translate-y-1 transition duration-300 border border-slate-100 dark:border-slate-700">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover border-4 border-white dark:border-slate-700"
                  />
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{member.bio}</p>
                <div className="flex justify-center gap-2 mt-3">
                  <a href={member.social.linkedin} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition duration-300">
                    <Linkedin size={12} />
                  </a>
                  <a href={member.social.twitter} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-blue-400 hover:text-white transition duration-300">
                    <Twitter size={12} />
                  </a>
                  <a href={member.social.instagram} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-pink-500 hover:text-white transition duration-300">
                    <Instagram size={12} />
                  </a>
                </div>
              </div>
            ))}

            {/* Card Join Us */}
            <div className="bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-6 rounded-3xl shadow-xl text-center transform hover:-translate-y-1 transition duration-300 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
              <div className="w-16 h-16 bg-white dark:bg-slate-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Users className="text-blue-500 dark:text-blue-400" size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Bergabung?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-4">Kami sedang mencari talenta baru.</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-300">
                Lihat Lowongan
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}