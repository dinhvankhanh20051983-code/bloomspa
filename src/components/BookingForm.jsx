import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function BookingForm({ user, onClose }) {
  const [pkgId, setPkgId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!pkgId || !date || !time) {
      setError("Vui lòng chọn gói, ngày và giờ");
      return;
    }

    const { error: insertError } = await supabase.from('booking_requests').insert({
      cust_id: user.id,
      cust_name: user.name,
      cust_phone: user.phone,
      pkg_id: Number(pkgId),
      date,
      time,
      note,
      status: "waiting",
      created_at: new Date().toISOString()
    });

    if (insertError) {
      setError("Có lỗi khi gửi yêu cầu. Vui lòng thử lại.");
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h3 className="text-2xl font-bold mb-3">Yêu cầu đặt lịch đã gửi!</h3>
        <p className="text-gray-600">Chủ spa sẽ xem xét và xác nhận trong thời gian sớm nhất.</p>
        <button onClick={onClose} className="mt-8 w-full py-4 bg-[#7c5cbf] text-white rounded-3xl font-semibold">Đóng</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onClose} className="text-2xl">←</button>
        <h2 className="text-2xl font-bold">📅 Đặt lịch hẹn mới</h2>
      </div>

      {/* Chọn gói */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-3">Chọn gói dịch vụ</label>
        <div className="space-y-3">
          {[
            { id: 1, name: "Massage Toàn Thân", emoji: "💆", price: 450000 },
            { id: 2, name: "Chăm Sóc Da Mặt", emoji: "✨", price: 350000 },
            { id: 3, name: "Trị Liệu Vai Gáy", emoji: "🌿", price: 280000 }
          ].map(pkg => (
            <div
              key={pkg.id}
              onClick={() => setPkgId(pkg.id)}
              className={`p-4 rounded-3xl border-2 flex justify-between items-center cursor-pointer ${pkgId === pkg.id ? 'border-[#7c5cbf] bg-[#faf5ff]' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{pkg.emoji}</span>
                <div>
                  <div className="font-semibold">{pkg.name}</div>
                  <div className="text-sm text-gray-500">{pkg.price.toLocaleString('vi-VN')}đ</div>
                </div>
              </div>
              {pkgId === pkg.id && <span className="text-[#7c5cbf] text-2xl">✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Ngày & Giờ */}
<div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Ngày</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full p-4 border rounded-3xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Giờ</label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full p-4 border rounded-3xl"
          />
        </div>
      </div>

      {/* Ghi chú */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">Ghi chú (tuỳ chọn)</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows="3"
          placeholder="Yêu cầu đặc biệt, dị ứng..."
          className="w-full p-4 border rounded-3xl"
        />
      </div>

      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

      <button
        onClick={handleSubmit}
        className="w-full py-5 bg-[#7c5cbf] text-white rounded-3xl font-semibold text-lg"
      >
        📨 Gửi yêu cầu đặt lịch
      </button>
    </div>
  );
}

export default BookingForm;