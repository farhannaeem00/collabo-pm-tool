"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      category: "Project Management",
      icon: "ðŸ“‹",
      items: [
        { title: "Kanban Boards", desc: "Visualize work with drag-and-drop kanban boards. Customize columns to match your workflow perfectly." },
        { title: "Scrum Sprints", desc: "Plan and track sprints with story points, velocity charts, and sprint retrospectives." },
        { title: "Roadmaps", desc: "Plan long-term goals with visual roadmaps. Align teams around priorities and milestones." },
        { title: "Backlog Management", desc: "Organize, prioritize, and groom your backlog with ease. Never lose track of important work." },
      ]
    },
    {
      category: "Collaboration",
      icon: "ðŸ‘¥",
      items: [
        { title: "Real-Time Sync", desc: "Every change syncs instantly across all team members. No refresh, no conflicts, no delays." },
        { title: "Task Comments", desc: "Discuss tasks in context with threaded comments, mentions, and file attachments." },
        { title: "Team Workspaces", desc: "Organize teams into workspaces with custom roles, permissions, and access controls." },
        { title: "Activity Feed", desc: "Stay updated with a real-time activity feed showing every change across your projects." },
      ]
    },
    {
      category: "AI Features",
      icon: "ðŸ¤–",
      items: [
        { title: "AI Subtask Generation", desc: "Describe a task and AI automatically breaks it into detailed, actionable subtasks instantly." },
        { title: "Smart Descriptions", desc: "AI writes clear, professional task descriptions from just a title in seconds." },
        { title: "Time Estimation", desc: "AI analyzes your tasks and provides accurate time estimates based on complexity." },
        { title: "Auto Prioritization", desc: "AI suggests task priorities based on deadlines, dependencies, and team capacity." },
      ]
    },
    {
      category: "Analytics",
      icon: "ðŸ“Š",
      items: [
        { title: "Burndown Charts", desc: "Track sprint progress with visual burndown charts. Identify risks before they become problems." },
        { title: "Velocity Tracking", desc: "Measure and improve team velocity over time with historical sprint data." },
        { title: "Custom Dashboards", desc: "Build dashboards with the metrics that matter most to your team and stakeholders." },
        { title: "Time Reports", desc: "Generate detailed time tracking reports for billing, planning, and team optimization." },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      {/* Navbar */}
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
          <Link href="/signup" className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition">
            Get it free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center border-b border-gray-800/50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Features</p>
          <h1 className="text-5xl font-bold mb-4">Everything your team needs</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Powerful features designed for modern software teams. From planning to shipping â€” Collabo has you covered.
          </p>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded text-sm transition">
            Start for free â†’
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {features.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{section.icon}</span>
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.items.map((item, i) => (
                  <div key={item.title}
                    className="bg-[#0D1117] border border-gray-800 hover:border-blue-500/30 rounded-xl p-5 transition">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-blue-600 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to transform how your team works?</h2>
        <p className="text-blue-100 mb-6">Join 65,000+ companies shipping better software with Collabo.</p>
        <Link href="/signup" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3 rounded transition text-sm">
          Get started free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">Â© 2026 Collabo. Built by <span className="text-blue-400">Farhan</span></p>
      </footer>
    </div>
  );
}
