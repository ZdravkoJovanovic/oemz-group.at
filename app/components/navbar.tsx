"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-black/[0.06] dark:border-white/[0.06] bg-transparent py-4">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/omz-group-logo-500x500-3.png"
                alt="OEMZ Group"
                width={120}
                height={40}
                priority
                className=""
              />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Placeholder for right-side actions (login, docs etc.) */}
            <a
              href="#"
              className="px-3 h-8 flex items-center justify-center rounded-none border border-black/[0.06] bg-white text-sm font-medium dark:bg-[#0b0b0b] dark:text-zinc-50"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
