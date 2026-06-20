"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EnterprisePage() {
  const features = [
    { icon: "ðŸ”’", title: "Enterprise Security", desc: "SSO, SAML, advanced permissions, audit logs, and data encryption at rest and in transit." },
    { icon: "âš¡", title: "Guaranteed Performance", desc: "99.9% uptime SLA with dedicated infrastructure and priority support response times." },
    { icon: "ðŸ› ï¸", title: "Custom Integrations", desc: "Connect with your existing tools via custom APIs, webhooks, and enterprise connectors." },
    { icon: "ðŸ‘¨â€ðŸ’¼", title: "Dedicated Success Manager", desc: "Get a dedicated customer success manager who knows your business and team inside out." },
    { icon: "ðŸ¢", title: "On-Premise Option", desc: "Deploy Collabo on your own infrastructure for complete data control and compliance." },
    { icon: "ðŸ“œ", title: "Compliance Ready", desc: "SOC 2 Type II, GDPR, HIPAA compliant. Enterprise contracts and custom DPAs available." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <nav className="border-b border-gray-800/50 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-lg font-bold">Collabo</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white px-3 py-1.5 transition">Log in</Link>
          <Link href="/signup" className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition">Get it free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-[#0A0D14] to-[#0A0D14] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Enterprise</p>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Built for enterprise scale and security
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Collabo Enterprise gives large organizations the security, compliance,
                and control they need â€” with the flexibility teams love.
              </p>
              <div className="flex gap-4">
                <Link href="/signup"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded text-sm transition">
                  Contact Sales
                </Link>
                <Link href="/pricing"
                  className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-6 py-3 rounded text-sm transition">
                  View Pricing
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0D1117] border border-gray-800 rounded-2xl p-8"
            >
              <h3 className="font-bold text-lg mb-6">Contact our sales team</h3>
              <div className="space-y-4">
                {["Full Name", "Work Email", "Company Name", "Team Size"].map((field) => (
                  <div key={field}>
                    <label className="text-sm text-gray-400 mb-1 block">{field}</label>
                    <input placeholder={`Enter ${field.toLowerCase()}`}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 text-sm" />
                  </div>
                ))}
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition">
                  Request a Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#0D1117] border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Enterprise-grade everything</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0A0D14] border border-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">Â© 2026 Collabo. Built by <span className="text-blue-400">Farhan</span></p>
      </footer>
    </div>
  );
}
