"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      annualPrice: "$0",
      period: "forever",
      desc: "Perfect for small teams getting started with project management.",
      features: [
        "Up to 10 users",
        "3 projects",
        "Basic board views",
        "2GB storage",
        "Community support",
        "Basic reporting",
      ],
      cta: "Get Started Free",
      highlighted: false,
      color: "border-gray-800",
    },
    {
      name: "Standard",
      monthlyPrice: "$8",
      annualPrice: "$6",
      period: "per user/month",
      desc: "For growing teams that need more power and flexibility.",
      features: [
        "Unlimited users",
        "Unlimited projects",
        "Advanced roadmaps",
        "20GB storage",
        "AI features",
        "Priority support",
        "Custom workflows",
        "Advanced reporting",
      ],
      cta: "Start Free Trial",
      highlighted: true,
      color: "border-blue-500/50",
    },
    {
      name: "Premium",
      monthlyPrice: "$16",
      annualPrice: "$12",
      period: "per user/month",
      desc: "For teams that need advanced features and more control.",
      features: [
        "Everything in Standard",
        "Advanced AI features",
        "Time tracking",
        "100GB storage",
        "Custom integrations",
        "Advanced permissions",
        "Audit logs",
        "24/7 support",
      ],
      cta: "Start Free Trial",
      highlighted: false,
      color: "border-gray-800",
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      period: "contact us",
      desc: "For large organizations with enterprise-grade requirements.",
      features: [
        "Everything in Premium",
        "SSO & SAML",
        "Advanced security",
        "Unlimited storage",
        "Dedicated support",
        "SLA guarantee",
        "Custom contracts",
        "On-premise option",
      ],
      cta: "Contact Sales",
      highlighted: false,
      color: "border-gray-800",
    },
  ];

  const faqs = [
    { q: "Can I try Collabo for free?", a: "Yes! Our Free plan is free forever with no credit card required. You can upgrade anytime." },
    { q: "How does billing work?", a: "You're billed monthly or annually based on the number of users. Annual plans save you 25%." },
    { q: "Can I change my plan later?", a: "Absolutely. You can upgrade, downgrade, or cancel your plan at any time with no penalties." },
    { q: "Is there a discount for nonprofits?", a: "Yes, we offer 50% discount for verified nonprofit organizations. Contact our sales team." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers." },
    { q: "Do you offer refunds?", a: "Yes, we offer a 30-day money-back guarantee on all paid plans, no questions asked." },
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
      <section className="py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Pricing</p>
          <h1 className="text-5xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-gray-400 text-lg mb-8">Start free. Scale as you grow. No hidden fees.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-[#0D1117] border border-gray-800 rounded-lg p-1">
            <button onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded text-sm font-semibold transition ${!annual ? "bg-blue-600 text-white" : "text-gray-400"}`}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded text-sm font-semibold transition ${annual ? "bg-blue-600 text-white" : "text-gray-400"}`}>
              Annual <span className="text-green-400 text-xs ml-1">Save 25%</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-6 border relative ${
                plan.highlighted ? "bg-blue-600/10 border-blue-500/50" : "bg-[#0D1117] border-gray-800"
              }`}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-xs mb-4">{plan.desc}</p>
              <div className="mb-5">
                <span className="text-3xl font-bold">{annual ? plan.annualPrice : plan.monthlyPrice}</span>
                <span className="text-gray-400 text-xs ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400 text-xs">âœ“</span>{f}
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
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-[#0D1117] border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0A0D14] border border-gray-800 rounded-xl p-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
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
