import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Award, Gift, TrendingUp } from 'lucide-react';

export default function CustShares() {
  const [myRewards, setMyRewards] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    fetchMyRewards();
  }, []);

  const fetchMyRewards = async () => {
    // Demo data cho khách hàng (sau này lấy từ loyalty_points table)
    const demoRewards = [
      {
        id: 1,
        type: 'giới thiệu',
        amount: 50,
        date: '15/04/2026',
        description: 'Bạn giới thiệu Nguyễn Thị Lan'
      },
      {
        id: 2,
        type: 'thưởng',
        amount: 100,
        date: '10/04/2026',
        description: 'Hoàn thành liệu trình 5 buổi'
      }
    ];

    setMyRewards(demoRewards);
    setTotalPoints(demoRewards.reduce((sum, r) => sum + r.amount, 0));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <Award className="w-8 h-8" />
        Cổ phần & Thưởng của tôi
      </h1>

      {/* Tổng điểm */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 mb-8 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-purple-100 text-sm">Tổng điểm thưởng</p>
            <p className="text-6xl font-bold mt-1">{totalPoints}</p>
          </div>
          <Gift className="w-20 h-20 opacity-75" />
        </div>
      </div>

      {/* Danh sách thưởng */}
      <h2 className="text-xl font-semibold mb-4">Lịch sử thưởng</h2>
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {myRewards.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            Chưa có khoản thưởng nào
          </div>
        ) : (
          <div className="divide-y">
            {myRewards.map((reward) => (
              <div key={reward.id} className="p-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl">🏆</div>
                  <div>
                    <div className="font-medium">{reward.description}</div>
                    <div className="text-xs text-gray-400">{reward.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-bold text-xl">+{reward.amount}</div>
                  <div className="text-xs text-gray-400">điểm</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
Mỗi lần giới thiệu bạn bè hoặc hoàn thành liệu trình bạn sẽ nhận thêm điểm
      </div>
    </div>
  );
}