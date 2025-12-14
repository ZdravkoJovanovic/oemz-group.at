import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import EscrowCards from './components/escrow-cards';

export default function Home() {
  return (
    <div className="h-screen w-screen bg-[#030303] flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-12 overflow-hidden">
          <EscrowCards />
        </main>
      </div>
    </div>
  );
}
