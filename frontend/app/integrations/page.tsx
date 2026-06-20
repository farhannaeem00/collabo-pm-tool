"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IntegrationsPage() {
  const integrations = [
    { icon: "🐙", name: "GitHub", desc: "Link pull requests, commits, and branches directly to Collabo tasks.", category: "Development" },
    { icon: "🦊", name: "GitLab", desc: "Sync merge requests and pipelines with your project workflow.", category: "Development" },
    { icon: "💬", name: "Slack", desc: "Get notifications and update tasks directly from Slack channels.", category: "Communication" },
    { icon: "📧", name: "Gmail", desc: "Convert emails to tasks and get email notifications for updates.", category: "Communication" },
    { icon: "🎨", name: "Figma", desc: "Attach Figma designs to tasks and keep design specs in context.", category: "Design" },
    { icon: "📹", name: "Zoom", desc: "Schedule and join meetings directly from task details.", category: "Communication" },
    { icon: "☁️", name: "Google Drive", desc: "Attach Google Docs, Sheets, and files directly to tasks.", category: "Storage" },
    { icon: "📦", name: "Jira", desc: "Migrate from Jira or sync issues between both platforms.", category: "PM Tools" },
    { icon: "🔔", name: "PagerDuty", desc: "Create incidents and alerts directly from Collabo tasks.", category: "Operations" },
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

      <section className="py-20 px-6 text-center border-b border-gray-800/50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Integrations</p>
          <h1 className="text-5xl font-bold mb-4">Connect your favorite tools</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Collabo integrates with 100+ tools your team already uses. Keep everything in sync.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {integrations.map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0D1117] border border-gray-800 hover:border-blue-500/30 rounded-xl p-6 transition">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <span className="text-xs text-blue-400">{item.category}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">© 2026 Collabo. Built by <span className="text-blue-400">Farhan</span></p>
      </footer>
    </div>
  );
}
