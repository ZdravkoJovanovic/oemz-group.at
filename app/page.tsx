"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      phone: phone.startsWith("+") ? phone : `+43${phone.replace(/^0+/, "")}`,
      message: `Sehr geehrte/r Kunde, dies ist eine Test-SMS. Ihr Code: 1234`
    };

    try {
      const res = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Fehler");
      alert("SMS gesendet: " + json.sid);
    } catch (err: any) {
      alert("SMS fehlgeschlagen: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-50">
      <Navbar />

      <main className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-[#0b0b0b] p-10 shadow-sm border border-black/[0.06] dark:border-white/[0.06]"
        >
          <h2 className="mb-6 text-2xl font-semibold">SMS senden</h2>

          <label className="mb-2 block text-sm font-medium">Telefonnummer</label>

          <div className="flex items-stretch gap-3">
            <div className="flex items-center px-3 text-sm font-medium border border-black/[0.06] dark:border-white/[0.06] bg-zinc-100 dark:bg-[#0b0b0b] rounded-none">
              +43
            </div>

            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{4,14}"
              placeholder="6641234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="flex-1 rounded-none border border-black/[0.06] dark:border-white/[0.06] px-3 py-2 bg-white dark:bg-transparent outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              aria-label="Telefonnummer ohne +43"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full h-12 rounded-none bg-white text-black border border-black/[0.08] font-medium hover:brightness-95 transition disabled:opacity-60"
          >
            {loading ? "Sende…" : "Bestätigen"}
          </button>

          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Die Vorwahl <strong>+43</strong> ist fest voreingestellt.
          </p>
        </form>
      </main>
    </div>
  );
}
