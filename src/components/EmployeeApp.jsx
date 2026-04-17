import { useState } from 'react';
import EmpAppts from './EmpAppts';
import EmpSalary from './EmpSalary';
import EmpShares from './EmpShares';
import ChatRoom from './ChatRoom';

function EmployeeApp({ user, onLogout }) {
  const [page, setPage] = useState("appts");

  const renderPage = () => {
    switch (page) {
      case "appts": return <EmpAppts user={user} />;
      case "salary": return <EmpSalary user={user} />;
      case "shares": return <EmpShares user={user} />;
      case "chat": return <ChatRoom roomId={`owner_emp_\( {user.id}`} myId={`emp_ \){user.id}`} myName={user.name} partnerName="Chủ tiệm" />;
      default: return <EmpAppts user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💆‍♀️</span>
          <div className="font-bold">{user.name}</div>
        </div>
        <button onClick={onLogout} className="text-red-500 text-sm">Đăng xuất</button>
      </div>

      <div className="pb-24">
        {renderPage()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-[480px] mx-auto grid grid-cols-4 text-xs">
        <button onClick={() => setPage("appts")} className={`py-3 ${page === "appts" ? "text-[#7c5cbf]" : ""}`}>📅 Lịch</button>
        <button onClick={() => setPage("salary")} className={`py-3 ${page === "salary" ? "text-[#7c5cbf]" : ""}`}>💰 Lương</button>
        <button onClick={() => setPage("shares")} className={`py-3 ${page === "shares" ? "text-[#7c5cbf]" : ""}`}>🏅 Cổ phần</button>
        <button onClick={() => setPage("chat")} className={`py-3 ${page === "chat" ? "text-[#7c5cbf]" : ""}`}>💬 Chat</button>
      </div>
    </div>
  );
}

export default EmployeeApp;