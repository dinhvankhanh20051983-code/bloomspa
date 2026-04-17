import { useState } from 'react';
import CustHome from './CustHome';
import CustAppts from './CustAppts';
import CustomerTreatmentHistory from './CustomerTreatmentHistory';
import CustShop from './CustShop';
import CustRefer from './CustRefer';
import CustShares from './CustShares';
import CustLoyalty from './CustLoyalty';
import CustChat from './CustChat';
import FeedbackForm from './FeedbackForm';

function CustomerApp({ user, onLogout }) {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <CustHome user={user} />;
      case "appts": return <CustAppts user={user} />;
      case "history": return <CustomerTreatmentHistory user={user} />;
      case "shop": return <CustShop user={user} />;
      case "refer": return <CustRefer user={user} />;
      case "shares": return <CustShares user={user} />;
      case "loyalty": return <CustLoyalty user={user} />;
      case "chat": return <CustChat user={user} />;
      default: return <CustHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-lg">🌸 {user.name}</div>
        <button onClick={onLogout} className="text-red-500 text-sm">Đăng xuất</button>
      </div>

      <div className="pb-24">
        {renderPage()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-[480px] mx-auto grid grid-cols-5 text-xs">
        <button onClick={() => setPage("home")} className={`py-3 ${page === "home" ? "text-[#7c5cbf]" : ""}`}>🏠</button>
        <button onClick={() => setPage("appts")} className={`py-3 ${page === "appts" ? "text-[#7c5cbf]" : ""}`}>📅</button>
        <button onClick={() => setPage("history")} className={`py-3 ${page === "history" ? "text-[#7c5cbf]" : ""}`}>📋</button>
        <button onClick={() => setPage("shop")} className={`py-3 ${page === "shop" ? "text-[#7c5cbf]" : ""}`}>🛒</button>
        <button onClick={() => setPage("loyalty")} className={`py-3 ${page === "loyalty" ? "text-[#7c5cbf]" : ""}`}>🎟️</button>
      </div>
    </div>
  );
}

export default CustomerApp;