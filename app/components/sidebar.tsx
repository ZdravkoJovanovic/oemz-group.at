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

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
  </svg>
);

const ITEMS = [
  { href: '/home', label: 'Home', icon: <FiHome /> },
  { href: '/payments', label: 'Payments', icon: <FiCreditCard /> },
  { href: '/documents', label: 'Documents', icon: <FiFileText /> },
  { href: '/customers', label: 'Customers', icon: <FiUsers /> },
  { href: '/backoffice', label: 'Google Meet', icon: <GoogleIcon /> },
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
            const active = pathname === item.href || (item.href === '/home' && pathname === '/');

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
