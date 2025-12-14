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
    if (!email || !confirm || !agb) return;

    setLoading(true);

    await fetch('/api/new-member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        age,
        phone,
        registrator,
      }),
    });

    setLoading(false);
    onClose();
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
          {/* Instagram */}
          <button
            type="button"
            className="flex items-center gap-2 text-white/60 text-sm hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.75 2h8.5C19.44 2 22 4.56 22 7.75v8.5C22 19.44 19.44 22 16.25 22h-8.5C4.56 22 2 19.44 2 16.25v-8.5C2 4.56 4.56 2 7.75 2Zm0 1.5C5.39 3.5 3.5 5.39 3.5 7.75v8.5c0 2.36 1.89 4.25 4.25 4.25h8.5c2.36 0 4.25-1.89 4.25-4.25v-8.5c0-2.36-1.89-4.25-4.25-4.25h-8.5Zm9.75 3a1 1 0 110 2 1 1 0 010-2ZM12 7a5 5 0 110 10 5 5 0 010-10Zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7Z" />
            </svg>
            Follow on Instagram
          </button>

          {/* Submit */}
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

/* Input */
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
