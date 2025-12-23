'use client';

import paymentsData from '../payments.json';

type Payment = {
  id: number;
  name: string;
  email: string;
  amount: number;
  currency: string;
  status: 'Successful';
  method: 'visa' | 'mastercard' | 'applepay';
  last4: string;
  date: string;
  merchant: string;
};

export default function Payments() {
  const payments = paymentsData as Payment[];

  return (
    <div className="border border-white/10 mt-6 h-[420px] overflow-hidden">
      <div className="h-full overflow-y-auto no-scrollbar">
        <table className="w-full text-sm text-white/80">
          <thead className="sticky top-0 bg-[#030303] border-b border-white/10">
            <tr>
              <th className="p-3 w-10">
                <input type="checkbox" className="checkbox" />
              </th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Payment Method</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Processing Merchant</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr
                key={p.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-3">
                  <input type="checkbox" className="checkbox" />
                </td>

                {/* Betrag */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">
                      {p.amount.toFixed(2)} €
                    </span>
                    <span className="text-white/40">{p.currency}</span>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-green-500/20 text-green-400">
                      Successful
                    </span>
                  </div>
                </td>

                {/* Zahlungsmethode */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        p.method === 'visa'
                          ? '/visa.svg'
                          : p.method === 'mastercard'
                          ? '/mastercard.svg'
                          : '/applepay.svg'
                      }
                      className="h-4"
                      alt={p.method}
                    />
                    <span className="text-white/60">•••• {p.last4}</span>
                  </div>
                </td>

                {/* Beschreibung */}
                <td className="p-3 text-white/60">
                  Electricity Payment
                </td>

                {/* Kunde */}
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="text-white/80">{p.name}</span>
                    <span className="text-white/40 text-xs">{p.email}</span>
                  </div>
                </td>

                {/* Datum */}
                <td className="p-3 text-white/60">
                  {new Date(p.date).toLocaleString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>

                {/* Händler */}
                <td className="p-3 text-white/60">
                  {p.merchant}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scrollbar komplett unsichtbar */}
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .checkbox {
          height: 16px;
          width: 16px;
          appearance: none;
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent;
        }
        .checkbox:checked {
          background: #6c63ff;
          border-color: #6c63ff;
        }
      `}</style>
    </div>
  );
}
