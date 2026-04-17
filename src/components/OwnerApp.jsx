import { useState } from 'react';
import OwnerDashboard from './OwnerDashboard';
import OwnerAppointmentManager from './OwnerAppointmentManager';
import OwnerInventory from './OwnerInventory';
import OwnerFinance from './OwnerFinance';
import OwnerReminders from './OwnerReminders';
import OwnerPackages from './OwnerPackages';
import OwnerEmployees from './OwnerEmployees';
import OwnerCustomers from './OwnerCustomers';
import OwnerReports from './OwnerReports';
import OwnerSettings from './OwnerSettings';
import ChatRoom from './ChatRoom';

function OwnerApp({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <OwnerDashboard />;
      case "appointments": return <OwnerAppointmentManager />;
      case "inventory": return <OwnerInventory />;
      case "finance": return <OwnerFinance />;
      case "reminders": return <OwnerReminders />;
      case "packages": return <OwnerPackages />;
      case "employees": return <OwnerEmployees />;
      case "customers": return <OwnerCustomers />;
      case "reports": return <OwnerReports />;
      case "settings": return <OwnerSettings />;
      case "chat": return <ChatRoom roomId="owner_general" myId="owner" myName="Chủ tiệm" partnerName="Nhân viên & Khách" />;
      default: return <OwnerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      {/* Top bar */}
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌸</span>
          <div>
            <span className="font-bold text-xl">BloomSpa</span>
            <span className="text-xs text-gray-400 block -mt-1">Chủ tiệm</span>
          </div>
        </div>
        <button onClick={onLogout} className="text-red-500 text-sm font-medium">Đăng xuất</button>
      </div>

      {/* Main content */}
      <div className="pb-24">
        {renderPage()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-[480px] mx-auto">
        <div className="grid grid-cols-5 text-xs">
          <button onClick={() => setPage("dashboard")} className={`py-3 ${page === "dashboard" ? "text-[#7c5cbf]" : "text-gray-400"}`}>🏠</button>
          <button onClick={() => setPage("appointments")} className={`py-3 ${page === "appointments" ? "text-[#7c5cbf]" : "text-gray-400"}`}>📅</button>
          <button onClick={() => setPage("customers")} className={`py-3 ${page === "customers" ? "text-[#7c5cbf]" : "text-gray-400"}`}>👥</button>
          <button onClick={() => setPage("chat")} className={`py-3 ${page === "chat" ? "text-[#7c5cbf]" : "text-gray-400"}`}>💬</button>
          <button onClick={() => setPage("settings")} className={`py-3 ${page === "settings" ? "text-[#7c5cbf]" : "text-gray-400"}`}>⚙️</button>
        </div>
</div>
    </div>
  );
}

export default OwnerApp;