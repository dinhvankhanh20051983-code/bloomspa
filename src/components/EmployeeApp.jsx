import { useState } from 'react';
import EmpAppts from './EmpAppts';
import EmpSalary from './EmpSalary';
import EmpShares from './EmpShares';
import ChatRoom from './ChatRoom';

export default function EmployeeApp() {
  const [activeTab, setActiveTab] = useState('appts');

  const renderContent = () => {
    switch (activeTab) {
      case 'appts': return <EmpAppts />;
      case 'salary': return <EmpSalary />;
      case 'shares': return <EmpShares />;
      case 'chat': return <ChatRoom currentUser="employee" />;
      default: return <EmpAppts />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧴</span>
          <div>
            <div className="font-bold">BloomSpa</div>
            <div className="text-xs opacity-75">Nhân viên</div>
          </div>
        </div>
        <button className="text-white/80 hover:text-white">Đăng xuất</button>
      </div>

      {/* Main content */}
      <div className="min-h-[calc(100vh-64px)]">
        {renderContent()}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg grid grid-cols-4 text-xs py-2">
        <button onClick={() => setActiveTab('appts')} className={`flex flex-col items-center ${activeTab === 'appts' ? 'text-blue-600' : 'text-gray-400'}`}>
          📅<span className="mt-1">Lịch hẹn</span>
        </button>
        <button onClick={() => setActiveTab('salary')} className={`flex flex-col items-center ${activeTab === 'salary' ? 'text-blue-600' : 'text-gray-400'}`}>
          💰<span className="mt-1">Lương</span>
        </button>
        <button onClick={() => setActiveTab('shares')} className={`flex flex-col items-center ${activeTab === 'shares' ? 'text-blue-600' : 'text-gray-400'}`}>
          🏆<span className="mt-1">Thưởng</span>
        </button>
        <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center ${activeTab === 'chat' ? 'text-blue-600' : 'text-gray-400'}`}>
          💬<span className="mt-1">Chat</span>
        </button>
      </div>
    </div>
  );
}