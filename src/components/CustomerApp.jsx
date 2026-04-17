import { useState } from 'react';
import CustHome from './CustHome';
import CustAppts from './CustAppts';
import CustShop from './CustShop';
import CustRefer from './CustRefer';
import CustShares from './CustShares';
import CustChat from './CustChat';
import CustLoyalty from './CustLoyalty';
import TreatmentHistoryViewer from './TreatmentHistoryViewer';
import FeedbackForm from './FeedbackForm';

export default function CustomerApp() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <CustHome />;
      case 'appts': return <CustAppts />;
      case 'shop': return <CustShop />;
      case 'refer': return <CustRefer />;
      case 'shares': return <CustShares />;
      case 'loyalty': return <CustLoyalty />;
      case 'history': return <TreatmentHistoryViewer />;
      case 'chat': return <CustChat />;
      case 'feedback': return <FeedbackForm />;
      default: return <CustHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-pink-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌺</span>
          <div>
            <div className="font-bold">BloomSpa</div>
            <div className="text-xs opacity-75">Khách hàng</div>
          </div>
        </div>
        <button className="text-white/80 hover:text-white">Đăng xuất</button>
      </div>

      <div className="min-h-[calc(100vh-64px)] pb-20">
        {renderContent()}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg grid grid-cols-5 text-xs py-2">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-pink-600' : 'text-gray-400'}`}>🏠<span className="mt-1">Trang chủ</span></button>
        <button onClick={() => setActiveTab('appts')} className={`flex flex-col items-center ${activeTab === 'appts' ? 'text-pink-600' : 'text-gray-400'}`}>📅<span className="mt-1">Lịch hẹn</span></button>
        <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center ${activeTab === 'shop' ? 'text-pink-600' : 'text-gray-400'}`}>🛒<span className="mt-1">Cửa hàng</span></button>
        <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center ${activeTab === 'chat' ? 'text-pink-600' : 'text-gray-400'}`}>💬<span className="mt-1">Chat</span></button>
        <button onClick={() => setActiveTab('loyalty')} className={`flex flex-col items-center ${activeTab === 'loyalty' ? 'text-pink-600' : 'text-gray-400'}`}>🎁<span className="mt-1">Thưởng</span></button>
      </div>
    </div>
  );
}