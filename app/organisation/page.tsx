'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import OrganisationHeader from '../components/organisation-header';
import OrganisationMemberModal from '../components/organisation-member-modal';

export default function OrganisationPage() {
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-[#030303] flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-12 overflow-hidden">
          <OrganisationHeader
            onNewMember={() => setMemberModalOpen(true)}
          />

          {/* später Tabelle / Content */}
        </main>
      </div>

      <OrganisationMemberModal
        open={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
      />
    </div>
  );
}
