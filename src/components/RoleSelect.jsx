import { supabase } from '../lib/supabaseClient';

function RoleSelect({ onSelectRole }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7c5cbf] to-[#5a3d9e] flex items-center justify-center p-6">
      <div className="max-w-[420px] w-full">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🌸</div>
          <h1 className="text-4xl font-bold text-white">BloomSpa</h1>
          <p className="text-white/80 mt-2">Chào mừng bạn đến với BloomSpa & Wellness</p>
        </div>

        <div className="space-y-4">
          <div
            onClick={() => onSelectRole('owner')}
            className="bg-white rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:shadow-xl transition"
          >
            <div className="text-5xl">👑</div>
            <div className="flex-1">
              <div className="font-bold text-xl">Chủ tiệm</div>
              <div className="text-gray-500">Quản lý toàn bộ spa</div>
            </div>
          </div>

          <div
            onClick={() => onSelectRole('employee')}
            className="bg-white rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:shadow-xl transition"
          >
            <div className="text-5xl">💆‍♀️</div>
            <div className="flex-1">
              <div className="font-bold text-xl">Nhân viên</div>
              <div className="text-gray-500">Làm việc và xem lịch hẹn</div>
            </div>
          </div>

          <div
            onClick={() => onSelectRole('customer')}
            className="bg-white rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:shadow-xl transition"
          >
            <div className="text-5xl">🌺</div>
            <div className="flex-1">
              <div className="font-bold text-xl">Khách hàng</div>
              <div className="text-gray-500">Đặt lịch, mua hàng, xem lịch sử</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;