"use client";
import Link from "next/link";
import { getUser, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => { setUser(getUser()); }, []);

  return (
    <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur z-40">
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">C</div>
        <span className="text-xl font-bold">Colla<span className="text-purple-400">bo</span></span>
      </Link>
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ backgroundColor: user.color }}>
              {user.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm text-gray-400">{user.name}</span>
          </div>
          <button
            onClick={() => { removeToken(); router.push("/login"); }}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
