import { useState } from 'react';
import OwnerDashboard from './OwnerDashboard';
import OwnerAppointmentManager from './OwnerAppointmentManager';
import OwnerCustomers from './OwnerCustomers';
import OwnerInventory from './OwnerInventory';
import OwnerFinance from './OwnerFinance';
import OwnerReports from './OwnerReports';
import OwnerEmployees from './OwnerEmployees';
import OwnerPackages from './OwnerPackages';
import OwnerServices from './OwnerServices';     // ← Thêm dòng này
import OwnerSettings from './OwnerSettings';
import OwnerReminders from './OwnerReminders';
import ChatRoom from './ChatRoom';

export default function OwnerApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <OwnerDashboard />;
      case 'appointments': return <OwnerAppointmentManager />;
      case 'customers': return <OwnerCustomers />;
      case 'inventory': return <OwnerInventory />;
      case 'finance': return <OwnerFinance />;
      case 'reports': return <OwnerReports />;
      case 'employees': return <OwnerEmployees />;
      case 'packages': return <OwnerPackages />;
      case 'services': return <OwnerServices />;     // ← Thêm dòng này
      case 'reminders': return <OwnerReminders />;
      case 'settings': return <OwnerSettings />;
      case 'chat': return <ChatRoom currentUser="owner" />;
      default: return <OwnerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-purple-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌸</span>
          <div>
            <div className="font-bold">BloomSpa</div>
            <div className="text-xs opacity-75">Chủ tiệm</div>
          </div>
        </div>
        <button className="text-white/80 hover:text-white">Đăng xuất</button>
      </div>

      {/* Nội dung chính */}
      <div className="min-h-[calc(100vh-64px)]">
        {renderContent()}
      </div>

      {/* Bottom navigation - thêm tab Dịch vụ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg grid grid-cols-6 text-xs py-2">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-400'}`}>📊<span className="mt-1">Dashboard</span></button>
        <button onClick={() => setActiveTab('appointments')} className={`flex flex-col items-center ${activeTab === 'appointments' ? 'text-purple-600' : 'text-gray-400'}`}>📅<span className="mt-1">Lịch hẹn</span></button>
        <button onClick={() => setActiveTab('customers')} className={`flex flex-col items-center ${activeTab === 'customers' ? 'text-purple-600' : 'text-gray-400'}`}>👥<span className="mt-1">Khách</span></button>
<button onClick={() => setActiveTab('packages')} className={`flex flex-col items-center ${activeTab === 'packages' ? 'text-purple-600' : 'text-gray-400'}`}>📦<span className="mt-1">Gói DV</span></button>
        <button onClick={() => setActiveTab('services')} className={`flex flex-col items-center ${activeTab === 'services' ? 'text-purple-600' : 'text-gray-400'}`}>🛠️<span className="mt-1">Dịch vụ</span></button>
        <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center ${activeTab === 'chat' ? 'text-purple-600' : 'text-gray-400'}`}>💬<span className="mt-1">Chat</span></button>
      </div>
    </div>
  );
}