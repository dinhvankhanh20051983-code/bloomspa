import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Gift, Share2, Copy, Users } from 'lucide-react';

export default function CustRefer() {
  const [referralCode, setReferralCode] = useState('');
  const [referredFriends, setReferredFriends] = useState([]);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    generateReferralCode();
    fetchReferredFriends();
  }, []);

  const generateReferralCode = () => {
    // Demo code - thực tế sẽ lấy từ profile khách hàng
    setReferralCode('BLOOM2026');
  };

  const fetchReferredFriends = async () => {
    // Demo data
    setReferredFriends([
      { name: 'Nguyễn Thị Lan', date: '15/04/2026', points: 50 },
      { name: 'Trần Văn Minh', date: '10/04/2026', points: 50 }
    ]);
    setPointsEarned(100);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert('✅ Đã copy mã giới thiệu: ' + referralCode);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <Gift className="w-8 h-8" />
        Giới thiệu bạn bè
      </h1>

      {/* Mã giới thiệu */}
      <div className="bg-white rounded-3xl p-8 shadow mb-8">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Mã giới thiệu của bạn</p>
          <div className="flex items-center justify-center gap-4 bg-purple-50 rounded-3xl px-8 py-6">
            <span className="text-4xl font-bold tracking-widest text-purple-700">{referralCode}</span>
            <button
              onClick={copyCode}
              className="bg-white text-purple-600 px-5 py-3 rounded-3xl shadow flex items-center gap-2 hover:bg-purple-100 transition"
            >
              <Copy className="w-5 h-5" />
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">Chia sẻ mã này cho bạn bè để nhận 50 điểm mỗi người</p>
        </div>
      </div>

      {/* Điểm đã nhận */}
      <div className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-6 mb-8">
        <div>
          <p className="text-purple-100 text-sm">Điểm giới thiệu</p>
          <p className="text-5xl font-bold">{pointsEarned}</p>
        </div>
        <Users className="w-16 h-16 opacity-70" />
      </div>

      {/* Danh sách bạn bè đã giới thiệu */}
      <h2 className="text-xl font-semibold mb-4">Bạn bè đã giới thiệu ({referredFriends.length})</h2>
      <div className="bg-white rounded-3xl shadow divide-y">
        {referredFriends.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            Chưa có bạn bè nào sử dụng mã của bạn
          </div>
        ) : (
          referredFriends.map((friend, index) => (
<div key={index} className="p-5 flex justify-between items-center">
              <div>
                <div className="font-medium">{friend.name}</div>
                <div className="text-xs text-gray-400">{friend.date}</div>
              </div>
              <div className="text-green-600 font-medium">+{friend.points} điểm</div>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        Mỗi bạn bè đăng ký và mua gói đầu tiên sẽ tặng bạn 50 điểm
      </div>
    </div>
  );
}