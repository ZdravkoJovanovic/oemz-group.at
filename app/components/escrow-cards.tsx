'use client';

import { FiCreditCard, FiList } from 'react-icons/fi';

/* ========================= */
/* DATA */
/* ========================= */

const BANKS_AVAILABLE = [
  { name: 'Erste Bank und Sparkassen', amount: 18420.0, iban: 'PA•• •••• •••• •••• 1024' },
  { name: 'UniCredit Bank Austria', amount: 16300.5, iban: 'PA•• •••• •••• •••• 3341' },
  { name: 'BAWAG P.S.K.', amount: 14750.0, iban: 'PA•• •••• •••• •••• 7782' },
  { name: 'Santander Consumer Bank', amount: 11200.85, iban: 'PA•• •••• •••• •••• 5609' },
  { name: 'DENZEL Bank AG', amount: 9904.0, iban: 'PA•• •••• •••• •••• 9011' },
  { name: 'Raiffeisen Bank', amount: 11800.0, iban: 'PA•• •••• •••• •••• 4487' },
];

const BANKS_EXPECTED = [
  { name: 'Erste Bank und Sparkassen', amount: 42350.0, iban: 'PA•• •••• •••• •••• 8841' },
  { name: 'UniCredit Bank Austria', amount: 36120.75, iban: 'PA•• •••• •••• •••• 2199' },
  { name: 'BAWAG P.S.K.', amount: 29840.0, iban: 'PA•• •••• •••• •••• 6632' },
  { name: 'Santander Consumer Bank', amount: 25420.5, iban: 'PA•• •••• •••• •••• 4470' },
  { name: 'DENZEL Bank AG', amount: 21754.28, iban: 'PA•• •••• •••• •••• 9903' },
  { name: 'Raiffeisen Bank', amount: 18900.0, iban: 'PA•• •••• •••• •••• 5516' },
];

const sum = (b: { amount: number }[]) =>
  b.reduce((a, c) => a + c.amount, 0);

const AVAILABLE = sum(BANKS_AVAILABLE);
const EXPECTED = sum(BANKS_EXPECTED);

const COMPANY_SHARE_AVAILABLE = AVAILABLE * 0.3;
const COMPANY_SHARE_EXPECTED = EXPECTED * 0.3;

const YOUR_COMMISSION_RECEIVED = AVAILABLE * 0.21;
const YOUR_COMMISSION_INCOMING = EXPECTED * 0.21;

/* ========================= */
/* COMPONENT */
/* ========================= */

export default function EscrowCards() {
  return (
    <div className="flex flex-col gap-6">

      {/* TOP SUMMARY */}
      <div className="grid grid-cols-[480px_480px] gap-6">
        <div className="col-span-2 border-2 border-white/10 px-8 py-6 flex justify-between items-start">

          {/* LEFT */}
          <div>
            <span className="block text-white/50 text-sm">
              Primary Escrow Account
            </span>
            <span className="block text-white font-medium tracking-wide mt-1">
              LT•• •••• •••• •••• 4829
            </span>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-white font-semibold">
                Zdravko Moses Jovanovic
              </span>
              <span className="text-white/50 text-sm">
                Senior Europe Director
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-x-14 gap-y-4 text-right">
            <Metric label="Commission received" value={YOUR_COMMISSION_RECEIVED} accent="#4dff9d" />
            <Metric label="Commission incoming" value={YOUR_COMMISSION_INCOMING} accent="#ffd84d" />
            <Metric label="Company share (30%) — available" value={COMPANY_SHARE_AVAILABLE} />
            <Metric label="Company share (30%) — expected" value={COMPANY_SHARE_EXPECTED} />
          </div>
        </div>
      </div>

      {/* ESCROW CARDS */}
      <div className="flex gap-6">
        <Card
          title="Has Escrow Account"
          label="Funds available"
          color="#4dff9d"
          banks={BANKS_AVAILABLE}
        />
        <Card
          title="Requires Escrow Account"
          label="Funds expected"
          color="#ffd84d"
          banks={BANKS_EXPECTED}
        />
      </div>
    </div>
  );
}

/* ========================= */
/* SUB COMPONENTS */
/* ========================= */

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div>
      <span className="block text-white/50 text-sm">{label}</span>
      <span
        className="block font-semibold"
        style={{ color: accent ?? 'rgba(255,255,255,0.85)' }}
      >
        {value.toLocaleString('de-AT', {
          style: 'currency',
          currency: 'EUR',
        })}
      </span>
    </div>
  );
}

function Card({
  title,
  label,
  color,
  banks,
}: {
  title: string;
  label: string;
  color: string;
  banks: { name: string; amount: number; iban: string }[];
}) {
  return (
    <div className="w-[480px] min-h-[380px] border-2 border-white/10 px-8 py-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">
          {title}
        </h2>
        <div className="text-right">
          <span className="text-sm" style={{ color }}>
            {label}
          </span>
          <span className="block text-white font-semibold">
            {sum(banks).toLocaleString('de-AT', {
              style: 'currency',
              currency: 'EUR',
            })}
          </span>
        </div>
      </div>

      {/* BANK LIST */}
      <div className="flex flex-col gap-4">
        {banks.map((b, i) => (
          <div key={i} className="hover:bg-white/5 rounded-md px-3 py-2">
            <div className="grid grid-cols-[24px_1fr_auto] gap-x-3">
              <FiCreditCard className="mt-1" style={{ color }} />

              <div>
                <div className="text-white/80 text-sm">
                  {b.name}
                </div>
                <div className="text-white text-xs tracking-wide">
                  {b.iban}
                </div>
              </div>

              <div className="text-right">
                <div className="text-white/60 text-sm">
                  {b.amount.toLocaleString('de-AT', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </div>
                <div className="flex items-center gap-1 text-white/50 text-xs justify-end">
                  <FiList /> Transactions
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
