'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiUsers, FiSearch, FiPlus, FiMessageSquare } from 'react-icons/fi';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="flex h-14 w-full items-center bg-[#030303] px-4 border-b border-white/10 text-white">

      {/* LEFT */}
      <div className="flex items-center">
        <Link href="/landing-page" className="cursor-pointer" prefetch>
          <Image src="/omz-group-logo.svg" alt="ÖMZ Group" width={60} height={60} />
        </Link>

        <div className="mx-4 flex items-center">
          <div className="h-7 w-px bg-[#fedaf8]" />
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7dd3fc] text-black font-semibold">
            Z
          </div>
          My Workspace
        </div>

        <div className="mx-4 flex items-center">
          <div className="h-7 w-px bg-[#fedaf8]" />
        </div>
      </div>

      {/* CENTER SLOT (100% AREA) */}
      <div className="flex flex-1 items-center min-w-0">
        {!searchOpen ? (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FiUsers />
            Customers
          </div>
        ) : (
          <div className="flex w-full items-center bg-[#0b0b0b] border border-white/10 px-4 py-2">
            <FiSearch className="text-purple-400" />
            <input
              autoFocus
              placeholder="Search your workspace for a project, resource, environment…"
              className="ml-2 flex-1 bg-transparent outline-none text-sm"
            />
            <span className="ml-4 text-sm text-white/70">
              Close search <span className="border border-white/20 px-1 ml-1">ESC</span>
            </span>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="ml-4 flex items-center gap-4">

        {!searchOpen && (
          <div
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 bg-[#0b0b0b] px-4 py-2 border border-white/10 cursor-text"
          >
            <FiSearch />
            <span className="text-sm">Search</span>
            <span className="text-xs border border-white/20 px-1">⌘ K</span>
          </div>
        )}

        <div className="flex items-center">
          <div className="h-7 w-px bg-[#fedaf8]" />
        </div>

        <button className="flex items-center gap-2 border border-white/20 px-3 py-1">
          <FiPlus /> New
        </button>

        <button className="flex items-center gap-2 border border-white/20 px-3 py-1">
          <FiMessageSquare /> Messages
        </button>

        <div className="flex h-7 px-3 items-center justify-center bg-green-300 text-black font-semibold text-sm">
          Admin
        </div>
      </div>
    </header>
  );
}
