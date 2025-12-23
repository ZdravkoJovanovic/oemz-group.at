'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import OrganisationMemberModal from './organisation-member-modal';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Member = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  registrator: string;
  email_confirmed: boolean;
  created_at: string;
};

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  async function loadMembers() {
    setLoading(true);
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setMembers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-semibold">
          Team Members
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-white text-black px-6 py-2 text-sm font-medium"
        >
          + Add Team Member
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#0b0b0b] border border-white/10">
        <table className="w-full text-sm text-white/80">
          <thead className="border-b border-white/10 text-white/40">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Registrator</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-white/40">
                  Loading…
                </td>
              </tr>
            )}

            {!loading &&
              members.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-medium">
                    {m.first_name} {m.last_name}
                  </td>
                  <td className="px-4 py-3">{m.email}</td>
                  <td className="px-4 py-3">
                    {m.email_confirmed ? (
                      <span className="text-green-400">Confirmed</span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{m.registrator}</td>
                  <td className="px-4 py-3 text-white/40">
                    {new Date(m.created_at).toLocaleString('de-DE')}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (WICHTIG) */}
      <OrganisationMemberModal
        open={open}
        onClose={() => {
          setOpen(false);
          loadMembers(); // refresh nach Insert
        }}
      />
    </>
  );
}
