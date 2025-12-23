import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import PaymentHeader from '../components/payment-header';
import Payments from '../components/payments';
import AdminGuard from '../components/admin-guard';

export default function Home() {
  return (
    <AdminGuard>
      <div className="h-screen w-screen bg-[#030303] flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 p-12 overflow-hidden">
            <PaymentHeader />
            <Payments />
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
