"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("board");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: "📋", title: "Scrum Boards", desc: "Plan sprints, track velocity, and ship faster with powerful scrum boards built for engineering teams.", tag: "Agile" },
    { icon: "🗂️", title: "Kanban Workflow", desc: "Visualize work in progress, identify bottlenecks, and optimize your team's flow continuously.", tag: "Workflow" },
    { icon: "🤖", title: "AI Automation", desc: "Let AI generate subtasks, write descriptions, estimate time, and automate repetitive project work.", tag: "AI Powered" },
    { icon: "📊", title: "Advanced Reporting", desc: "Get deep insights with burndown charts, velocity tracking, and custom dashboards for stakeholders.", tag: "Analytics" },
    { icon: "⚡", title: "Real-Time Sync", desc: "Every update syncs instantly across your entire team. No delays, no conflicts, no refresh needed.", tag: "Real-Time" },
    { icon: "🔗", title: "Integrations", desc: "Connect with GitHub, Slack, Figma, and 100+ tools your team already uses every day.", tag: "Connect" },
  ];

  const plans = [
    {
      name: "Free", price: "$0", period: "forever",
      desc: "Perfect for small teams getting started",
      features: ["Up to 10 users", "3 projects", "Basic board views", "2GB storage", "Community support"],
      cta: "Get Started", highlighted: false,
    },
    {
      name: "Standard", price: "$8", period: "per user/month",
      desc: "For growing teams that need more power",
      features: ["Unlimited users", "Unlimited projects", "Advanced roadmaps", "20GB storage", "AI features", "Priority support"],
      cta: "Start Free Trial", highlighted: true,
    },
    {
      name: "Enterprise", price: "Custom", period: "contact us",
      desc: "For large organizations with complex needs",
      features: ["Everything in Standard", "SSO & SAML", "Advanced security", "Unlimited storage", "Dedicated support", "SLA guarantee"],
      cta: "Contact Sales", highlighted: false,
    },
  ];

  const stats = [
    { value: "65,000+", label: "Companies" },
    { value: "10M+", label: "Users Worldwide" },
    { value: "500M+", label: "Issues Tracked" },
    { value: "99.9%", label: "Uptime SLA" },
  ];

  const tabs = [
    { id: "board", label: "Board View" },
    { id: "list", label: "List View" },
    { id: "timeline", label: "Timeline" },
    { id: "report", label: "Reports" },
  ];

  const navLinks = [
    { label: "Features", href: "/features" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Enterprise", href: "/enterprise" },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Integrations", href: "/integrations" },
        { label: "Pricing", href: "/pricing" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Engineering", href: "/solutions/engineering" },
        { label: "Design", href: "/solutions/design" },
        { label: "Marketing", href: "/solutions/marketing" },
        { label: "Operations", href: "/solutions/operations" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Blog", href: "/blog" },
        { label: "Community", href: "/community" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white font-sans">

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-[#0A0D14]/95 backdrop-blur-sm border-b border-gray-800/50 shadow-lg" : ""
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">Collabo</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href}
                  className="text-sm text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-1.5 rounded transition">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition px-3 py-1.5">
              Log in
            </Link>
            <Link href="/signup"
              className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition">
              Get it free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-[#0A0D14] to-purple-950/20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Now with AI-powered automation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              The #1 project management
              <br />
              tool for <span className="text-blue-400">software teams</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Plan, track, and release software with Collabo. The most powerful
              agile tool for engineering teams — from startup to enterprise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Link href="/signup"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded text-sm transition flex items-center gap-2">
                Get started free <span>→</span>
              </Link>
              <Link href="/features"
                className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded text-sm transition">
                See all features
              </Link>
            </motion.div>

            <p className="text-gray-500 text-xs mt-4">
              Free forever • No credit card required • Setup in 2 minutes
            </p>
          </div>

          {/* Product Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-[#111827] border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="bg-[#1a2234] border-b border-gray-700/50 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex gap-1 ml-4">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`text-xs px-3 py-1 rounded transition ${
                      activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                {[
                  { title: "To Do", color: "border-gray-500", count: 4, tasks: [
                    { title: "Design system audit", priority: "medium", assignee: "F" },
                    { title: "API documentation", priority: "low", assignee: "A" },
                    { title: "Mobile responsive fixes", priority: "high", assignee: "M" },
                    { title: "Performance testing", priority: "urgent", assignee: "R" },
                  ]},
                  { title: "In Progress", color: "border-blue-500", count: 3, tasks: [
                    { title: "Authentication flow", priority: "urgent", assignee: "F" },
                    { title: "Dashboard redesign", priority: "high", assignee: "S" },
                    { title: "Real-time sync engine", priority: "high", assignee: "K" },
                  ]},
                  { title: "Review", color: "border-yellow-500", count: 2, tasks: [
                    { title: "Code review: Auth PR", priority: "high", assignee: "A" },
                    { title: "UI component library", priority: "medium", assignee: "T" },
                  ]},
                  { title: "Done", color: "border-green-500", count: 5, tasks: [
                    { title: "Project setup", priority: "low", assignee: "F" },
                    { title: "Database schema", priority: "medium", assignee: "M" },
                    { title: "CI/CD pipeline", priority: "high", assignee: "R" },
                  ]},
                ].map((col) => (
                  <div key={col.title} className="w-56 shrink-0">
                    <div className={`flex items-center gap-2 mb-3 pb-2 border-b-2 ${col.color}`}>
                      <span className="text-xs font-semibold text-gray-300">{col.title}</span>
                      <span className="text-xs bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">{col.count}</span>
                    </div>
                    <div className="space-y-2">
                      {col.tasks.map((task, i) => (
                        <div key={i} className="bg-[#1a2234] border border-gray-700/50 rounded-lg p-2.5 hover:border-blue-500/30 transition">
                          <p className="text-xs text-gray-200 mb-2 leading-snug">{task.title}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs px-1.5 py-0.5 rounded text-[10px] ${
                              task.priority === "urgent" ? "bg-red-500/20 text-red-400" :
                              task.priority === "high" ? "bg-yellow-500/20 text-yellow-400" :
                              task.priority === "medium" ? "bg-blue-500/20 text-blue-400" :
                              "bg-gray-700 text-gray-400"
                            }`}>
                              {task.priority}
                            </span>
                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                              {task.assignee}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800/50 bg-[#0D1117] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-8">
            Trusted by engineering teams at the world's best companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-[#0A0D14]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Features</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-bold max-w-lg leading-tight">
                Everything teams need to ship faster
              </h2>
              <Link href="/features" className="hidden md:block text-blue-400 hover:text-blue-300 text-sm transition">
                See all features →
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800/30">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0A0D14] p-8 hover:bg-[#0D1117] transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{f.icon}</span>
                  <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full">
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-[#0D1117]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Workflow</p>
            <h2 className="text-4xl font-bold">Built for the way teams work</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Plan your sprint", desc: "Create issues, estimate story points, and organize work into sprints with drag-and-drop simplicity.", color: "text-blue-400" },
              { step: "02", title: "Track in real-time", desc: "Monitor progress live as your team works. See every update instantly with zero refresh needed.", color: "text-purple-400" },
              { step: "03", title: "Ship with confidence", desc: "Review burndown charts, retrospectives, and velocity data to continuously improve delivery.", color: "text-green-400" },
            ].map((item, i) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className={`text-6xl font-bold ${item.color} opacity-20 mb-4`}>{item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-gray-600 text-2xl">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-[#0A0D14]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400">Start free. Scale as you grow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl p-6 border relative ${
                  plan.highlighted ? "bg-blue-600/10 border-blue-500/50" : "bg-[#0D1117] border-gray-800"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-green-400 text-xs">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup"
                  className={`block text-center py-2.5 rounded font-semibold text-sm transition ${
                    plan.highlighted
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "border border-gray-700 hover:border-gray-500 text-gray-300"
                  }`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Need more?{" "}
            <Link href="/pricing" className="text-blue-400 hover:text-blue-300 transition">
              See full pricing details →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-blue-600">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Start shipping better software today
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join 65,000+ companies that use Collabo to plan, track, and release great software.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3 rounded transition text-sm">
              Get started for free
            </Link>
            <Link href="/enterprise"
              className="border border-blue-400 text-white hover:bg-blue-500 font-semibold px-8 py-3 rounded transition text-sm">
              Contact sales
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1117] border-t border-gray-800 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="font-bold text-lg">Collabo</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                The #1 project management tool for software teams. Plan, track, and ship great software.
              </p>
              <p className="text-gray-500 text-xs">
                © 2026 Collabo. Built by{" "}
                <span className="text-blue-400 font-semibold">Farhan</span>
              </p>
            </div>

            {/* Footer Links */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-500 hover:text-white text-xs transition">Privacy Policy</Link>
              <span className="text-gray-700">•</span>
              <Link href="#" className="text-gray-500 hover:text-white text-xs transition">Terms of Service</Link>
              <span className="text-gray-700">•</span>
              <Link href="#" className="text-gray-500 hover:text-white text-xs transition">Security</Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-gray-400 text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}