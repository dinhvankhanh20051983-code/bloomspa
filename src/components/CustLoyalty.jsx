import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Gift, Star, Award, TrendingUp } from 'lucide-react';

export default function CustLoyalty() {
  const [loyaltyPoints, setLoyaltyPoints] = useState(245);
  const [tier, setTier] = useState('Vàng');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchLoyaltyData();
  }, []);

  const fetchLoyaltyData = async () => {
    // Demo data
    setHistory([
      { date: '15/04/2026', action: 'Hoàn thành liệu trình', points: 80 },
      { date: '10/04/2026', action: 'Giới thiệu bạn bè', points: 50 },
      { date: '05/04/2026', action: 'Mua gói 5 buổi', points: 120 }
    ]);
  };

  const getTierColor = () => {
    if (tier === 'Vàng') return 'text-amber-500';
    if (tier === 'Bạc') return 'text-gray-400';
    return 'text-purple-500';
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <Gift className="w-8 h-8" />
        Khách hàng thân thiết
      </h1>

      {/* Tier & Points */}
      <div className="bg-white rounded-3xl p-8 shadow mb-8 text-center">
        <div className={`inline-flex items-center gap-2 text-2xl font-bold ${getTierColor()}`}>
          <Star className="w-7 h-7" />
          Hạng {tier}
        </div>
        <div className="text-7xl font-bold text-purple-600 mt-4">{loyaltyPoints}</div>
        <p className="text-gray-500">điểm tích lũy</p>
        <div className="mt-8 h-3 bg-gray-100 rounded-3xl overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Còn 55 điểm để lên hạng Kim cương</p>
      </div>

      {/* Lịch sử điểm */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Award className="w-5 h-5" />
        Lịch sử tích điểm
      </h2>
      <div className="bg-white rounded-3xl shadow divide-y">
        {history.map((item, index) => (
          <div key={index} className="p-5 flex justify-between items-center">
            <div>
              <div className="font-medium">{item.action}</div>
              <div className="text-xs text-gray-400">{item.date}</div>
            </div>
            <div className="text-green-600 font-bold">+{item.points}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-400">
        Mỗi lần mua gói, hoàn thành liệu trình hoặc giới thiệu bạn bè đều được cộng điểm
      </div>
    </div>
  );
}
