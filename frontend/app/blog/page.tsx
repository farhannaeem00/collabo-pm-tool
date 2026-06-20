"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    { emoji: "ðŸš€", title: "How top engineering teams use Collabo to ship 3x faster", category: "Engineering", date: "May 25, 2026", read: "5 min read", featured: true },
    { emoji: "ðŸ¤–", title: "Introducing AI-powered task management in Collabo", category: "Product", date: "May 18, 2026", read: "4 min read", featured: false },
    { emoji: "ðŸ“Š", title: "The complete guide to sprint planning with Collabo", category: "Tutorial", date: "May 10, 2026", read: "8 min read", featured: false },
    { emoji: "ðŸ‘¥", title: "Building high-performing remote engineering teams", category: "Culture", date: "May 3, 2026", read: "6 min read", featured: false },
    { emoji: "ðŸ”„", title: "Real-time collaboration: How we built instant sync", category: "Engineering", date: "April 28, 2026", read: "7 min read", featured: false },
    { emoji: "ðŸ“ˆ", title: "Measuring engineering team productivity the right way", category: "Analytics", date: "April 20, 2026", read: "5 min read", featured: false },
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

      <section className="py-16 px-6 text-center border-b border-gray-800/50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Blog</p>
          <h1 className="text-5xl font-bold mb-4">The Collabo Blog</h1>
          <p className="text-gray-400 text-lg">Insights on engineering, product, and team collaboration.</p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1117] border border-gray-800 hover:border-blue-500/30 rounded-xl p-8 mb-8 transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full">Featured</span>
              <span className="text-xs text-gray-500">{posts[0].date} â€¢ {posts[0].read}</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">{posts[0].emoji} {posts[0].title}</h2>
            <p className="text-gray-400 mb-4">Learn how the world's best engineering teams leverage Collabo to eliminate bottlenecks, reduce meetings, and ship features faster than ever before.</p>
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition">Read article â†’</a>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.slice(1).map((post, i) => (
              <motion.div key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0D1117] border border-gray-800 hover:border-blue-500/30 rounded-xl p-6 transition">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-gray-500">{post.read}</span>
                </div>
                <h3 className="font-bold mb-2 line-clamp-2">{post.emoji} {post.title}</h3>
                <p className="text-gray-500 text-xs mb-4">{post.date}</p>
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm transition">Read more â†’</a>
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
