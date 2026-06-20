"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function DocsPage() {
  const [search, setSearch] = useState("");

  const sections = [
    {
      title: "Getting Started",
      icon: "🚀",
      articles: ["Quick Start Guide", "Creating your first workspace", "Inviting team members", "Setting up your first project", "Understanding the kanban board"],
    },
    {
      title: "Projects & Tasks",
      icon: "📋",
      articles: ["Creating and managing projects", "Task management basics", "Using subtasks effectively", "Setting priorities and due dates", "Drag and drop workflow"],
    },
    {
      title: "AI Features",
      icon: "🤖",
      articles: ["AI subtask generation", "Auto-writing descriptions", "Time estimation with AI", "AI best practices", "Customizing AI behavior"],
    },
    {
      title: "Collaboration",
      icon: "👥",
      articles: ["Real-time collaboration", "Workspace roles & permissions", "Task comments & mentions", "Activity feeds", "Notifications settings"],
    },
    {
      title: "Integrations",
      icon: "🔗",
      articles: ["GitHub integration setup", "Slack notifications", "Figma design links", "Google Drive attachments", "Webhook configuration"],
    },
    {
      title: "Account & Billing",
      icon: "💳",
      articles: ["Managing your account", "Upgrading your plan", "Billing and invoices", "Cancelling subscription", "Data export"],
    },
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

      <section className="py-16 px-6 text-center bg-[#0D1117] border-b border-gray-800">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-gray-400 mb-6">Everything you need to get the most out of Collabo.</p>
          <div className="max-w-xl mx-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documentation..."
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, i) => (
            <motion.div key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0D1117] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <h3 className="font-bold">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.articles.map((article) => (
                  <li key={article}>
                    <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition flex items-center gap-2">
                      <span className="text-gray-600">›</span> {article}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">© 2026 Collabo. Built by <span className="text-blue-400">Farhan</span></p>
      </footer>
    </div>
  );
}
