'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiCreditCard,
  FiFileText,
  FiUsers,
  FiMail,
  FiCalendar,
  FiBriefcase,
  FiUserPlus,
  FiSettings,
  FiLayers,
} from 'react-icons/fi';

const ITEMS = [
  { href: '/', label: 'Home', icon: <FiHome /> },
  { href: '/payments', label: 'Payments', icon: <FiCreditCard /> },
  { href: '/documents', label: 'Documents', icon: <FiFileText /> },
  { href: '/customers', label: 'Customers', icon: <FiUsers /> },
  { href: '/backoffice', label: 'Back Office', icon: <FiBriefcase /> },
  { href: '/emails', label: 'Emails', icon: <FiMail /> },
  { href: '/calendar', label: 'Calendar', icon: <FiCalendar /> },
  { href: '/referrals', label: 'Referrals', icon: <FiUserPlus /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 pl-10 pr-6 bg-[#030303] text-white flex-shrink-0 flex">
      <div className="flex flex-col justify-center w-full relative">

        {/* POWERED BY STRIPE – UNVERÄNDERT */}
        <span
          className="mb-8 text-sm font-medium"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #ab96dd, #795a98, #ffa4bc, #58375d)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'stripeGlow 6s ease infinite',
          }}
        >
          Powered by Stripe
        </span>

        {/* NAV */}
        <nav className="flex flex-col gap-4">
          {ITEMS.map(item => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3
                  pb-3 border-b border-white/10
                  text-sm cursor-pointer transition-colors
                  ${active ? 'text-[#a58eda]' : 'text-white'}
                  hover:text-[#a58eda]
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col gap-4">
          <Link
            href="/settings"
            className={`
              flex items-center gap-3 text-sm cursor-pointer
              ${pathname === '/settings' ? 'text-[#a58eda]' : 'text-white/80'}
              hover:text-[#a58eda]
            `}
          >
            <FiSettings />
            Settings
          </Link>

          <Link
            href="/organisation"
            className={`
              flex items-center gap-3 text-sm cursor-pointer
              ${pathname === '/organisation' ? 'text-[#a58eda]' : 'text-white/80'}
              hover:text-[#a58eda]
            `}
          >
            <FiLayers />
            Organization
          </Link>
        </div>

        {/* KEYFRAMES – UNVERÄNDERT */}
        <style jsx>{`
          @keyframes stripeGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

      </div>
    </aside>
  );
}
