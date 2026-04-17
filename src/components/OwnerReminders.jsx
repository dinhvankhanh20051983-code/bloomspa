import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function OwnerReminders() {
  const [reminders, setReminders] = useState([]);

  const sendReminder = async () => {
    // Demo gửi nhắc lịch
    alert("📲 Đã gửi nhắc lịch qua Zalo cho tất cả khách!");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🔔 Nhắc lịch tự động</h2>
      <button onClick={sendReminder} className="w-full py-5 bg-[#7c5cbf] text-white rounded-3xl font-semibold mb-8">
        Gửi nhắc lịch hôm nay cho tất cả khách
      </button>
      <div className="text-sm text-gray-500">Tính năng nhắc lịch 24h & 2h trước buổi hẹn đã được kích hoạt.</div>
    </div>
  );
}

export default OwnerReminders;