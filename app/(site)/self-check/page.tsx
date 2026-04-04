'use client'

import { useState } from 'react'
import { Search, ExternalLink, Brain, HeartPulse, Activity, Sparkles } from 'lucide-react'

const tools = [
  {
    title: 'MBTI Personality Test',
    desc: 'Kenali tipe kepribadianmu secara mendalam',
    link: 'https://www.16personalities.com/',
    category: 'Kepribadian',
    icon: Brain,
    highlight: true
  },
  {
    title: 'BMI Calculator',
    desc: 'Cek apakah berat badanmu ideal',
    link: 'https://www.calculator.net/bmi-calculator.html',
    category: 'Kesehatan',
    icon: Activity
  },
  {
    title: 'Stress Level Test',
    desc: 'Ukur tingkat stres yang kamu rasakan saat ini',
    link: 'https://www.mind-diagnostics.org/stress-test',
    category: 'Mental',
    icon: HeartPulse,
    highlight: true
  },
  {
    title: 'Self Esteem Test',
    desc: 'Kenali tingkat kepercayaan dirimu',
    link: 'https://www.psychologytoday.com/us/tests/personality/self-esteem-test',
    category: 'Mental',
    icon: Sparkles
  }
]

export default function SelfCheckPage() {
  const [search, setSearch] = useState('')

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="px-6 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto bg-linear-to-br from-cyan-600 to-blue-600 rounded-3xl p-10 lg:p-16 text-center text-white shadow-2xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            Self Check 🧠
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Kenali dirimu lebih dalam melalui berbagai tools yang membantu memahami kepribadian, kesehatan, dan kondisi mentalmu.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="flex items-center bg-white rounded-2xl p-2 shadow-xl">
              <Search className="ml-3 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari tools..."
                className="w-full px-4 py-3 text-black outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">

          {filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Tools tidak ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool, index) => {
                const Icon = tool.icon

                return (
                  <div
                    key={index}
                    className="group bg-white rounded-3xl p-6 shadow-lg border hover:-translate-y-2 transition-all flex flex-col"
                  >

                    {/* Highlight Badge */}
                    {tool.highlight && (
                      <span className="mb-4 text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full w-fit">
                        ⭐ Recommended
                      </span>
                    )}

                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-500 text-white mb-4">
                      <Icon />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      {tool.desc}
                    </p>

                    {/* Button */}
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Coba Sekarang
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )
              })}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-16 text-center text-sm text-gray-400 max-w-2xl mx-auto">
            Semua tools di halaman ini hanya untuk refleksi diri dan bukan pengganti diagnosis profesional.
          </div>

        </div>
      </section>
    </div>
  )
}
