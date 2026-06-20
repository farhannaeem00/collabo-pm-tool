"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ChangelogPage() {
  const changes = [
    {
      version: "v2.4.0",
      date: "May 28, 2026",
      tag: "Major Release",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      updates: [
        { type: "new", text: "AI-powered subtask generation from task titles" },
        { type: "new", text: "Real-time cursor presence for team collaboration" },
        { type: "new", text: "Time estimation powered by Groq AI" },
        { type: "improved", text: "Kanban board drag and drop performance improved by 40%" },
        { type: "fixed", text: "Fixed socket disconnection issue on mobile devices" },
      ]
    },
    {
      version: "v2.3.0",
      date: "May 10, 2026",
      tag: "Feature Update",
      tagColor: "bg-green-500/10 text-green-400 border-green-500/20",
      updates: [
        { type: "new", text: "Sprint planning with story points and velocity tracking" },
        { type: "new", text: "Burndown charts for sprint progress visualization" },
        { type: "new", text: "Custom workflow columns in kanban board" },
        { type: "improved", text: "Comment threading with @mentions support" },
        { type: "fixed", text: "Fixed task ordering after drag and drop" },
      ]
    },
    {
      version: "v2.2.0",
      date: "April 22, 2026",
      tag: "Feature Update",
      tagColor: "bg-green-500/10 text-green-400 border-green-500/20",
      updates: [
        { type: "new", text: "File attachments on tasks (images, PDFs, docs)" },
        { type: "new", text: "Task due date reminders via email" },
        { type: "new", text: "Project templates marketplace" },
        { type: "improved", text: "Mobile responsive board view" },
        { type: "fixed", text: "Fixed workspace invitation email delivery" },
      ]
    },
    {
      version: "v2.1.0",
      date: "April 5, 2026",
      tag: "Bug Fix",
      tagColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      updates: [
        { type: "fixed", text: "Fixed real-time sync losing connection after 30 minutes" },
        { type: "fixed", text: "Fixed task priority not saving correctly" },
        { type: "improved", text: "Improved task search performance" },
        { type: "improved", text: "Better error messages across the application" },
      ]
    },
  ];

  const typeColors: any = {
    new: "bg-blue-500/10 text-blue-400",
    improved: "bg-green-500/10 text-green-400",
    fixed: "bg-red-500/10 text-red-400",
  };

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
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Changelog</p>
          <h1 className="text-5xl font-bold mb-4">What's new in Collabo</h1>
          <p className="text-gray-400 text-lg">We ship updates every week. Here's what we've been working on.</p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {changes.map((release, i) => (
            <motion.div key={release.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0D1117] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl">{release.version}</h3>
                  <span className={`text-xs border px-2 py-1 rounded-full ${release.tagColor}`}>
                    {release.tag}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">{release.date}</span>
              </div>
              <ul className="space-y-2">
                {release.updates.map((update, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold capitalize ${typeColors[update.type]}`}>
                      {update.type}
                    </span>
                    <span className="text-gray-300 text-sm">{update.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">Â© 2026 Collabo. Built by <span className="text-blue-400">Farhan</span></p>
      </footer>
    </div>
  );
}
