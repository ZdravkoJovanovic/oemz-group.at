'use client';

import { useState } from 'react';

export default function OrganisationMemberModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [registrator, setRegistrator] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [agb, setAgb] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    if (!email || !confirm || !agb || loading) return;

    setLoading(true);

    try {
      const res = await fetch('/api/new-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          age,
          phone,
          registrator,
          confirm,
          agb,
        }),
      });

      if (res.ok) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[620px] bg-[#050505] border border-white/10 p-10 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-white text-2xl font-semibold mb-2">
          Add Team Member
        </h2>
        <p className="text-[#696969] text-sm mb-8">
          Please fill in the details below
        </p>

        {/* First / Last */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Input placeholder="First name" value={firstName} onChange={setFirstName} />
          <Input placeholder="Last name" value={lastName} onChange={setLastName} />
        </div>

        {/* Email */}
        <div className="mb-6">
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={setEmail}
          />
        </div>

        {/* Age / Phone */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Input placeholder="Age" type="number" value={age} onChange={setAge} />
          <Input placeholder="Phone number" value={phone} onChange={setPhone} />
        </div>

        {/* Select */}
        <div className="mb-8 relative">
          <select
            value={registrator}
            onChange={(e) => setRegistrator(e.target.value)}
            className="w-full appearance-none bg-[#171717] text-white text-sm px-4 py-3 border border-white/10 outline-none"
          >
            <option value="" disabled>
              Select registrator
            </option>
            <option>Zdravko Moses Jovanovic</option>
            <option>Marcel Oelzelt</option>
            <option>Dominik Kopp</option>
          </select>

          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xs">
            ▼
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-4 mb-10 text-sm text-[#696969]">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
            />
            I confirm the information is correct
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={agb}
              onChange={(e) => setAgb(e.target.checked)}
            />
            I accept the AGBs
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 text-white/60 text-sm hover:text-white"
          >
            Follow on Instagram
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !confirm || !agb}
            className="bg-white text-black px-8 py-3 text-sm font-medium disabled:opacity-40"
          >
            {loading ? 'Sending…' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  placeholder,
  type = 'text',
  value,
  onChange,
}: {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#171717] text-white text-sm px-4 py-3 border border-white/10 outline-none placeholder:text-[#696969]"
    />
  );
}
