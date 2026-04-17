import { Crown, User, Users } from 'lucide-react';

export default function RoleSelect({ onSelectRole }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white rounded-3xl px-6 py-3 shadow">
            <span className="text-4xl">🌸</span>
            <h1 className="text-3xl font-bold text-purple-700">BloomSpa</h1>
          </div>
          <p className="text-gray-500 mt-4">Chào mừng bạn đến với BloomSpa & Wellness</p>
        </div>

        <div className="space-y-4">
          {/* Chủ tiệm */}
          <button
            onClick={() => onSelectRole('owner')}
            className="w-full bg-white hover:bg-purple-50 border border-purple-200 rounded-3xl p-6 flex items-center gap-6 transition shadow hover:shadow-lg"
          >
            <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-4xl">👑</div>
            <div className="text-left flex-1">
              <div className="font-semibold text-xl">Chủ tiệm</div>
              <div className="text-gray-500">Quản lý toàn bộ spa</div>
            </div>
            <Crown className="w-8 h-8 text-yellow-500" />
          </button>

          {/* Nhân viên */}
          <button
            onClick={() => onSelectRole('employee')}
            className="w-full bg-white hover:bg-purple-50 border border-purple-200 rounded-3xl p-6 flex items-center gap-6 transition shadow hover:shadow-lg"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-4xl">🧴</div>
            <div className="text-left flex-1">
              <div className="font-semibold text-xl">Nhân viên</div>
              <div className="text-gray-500">Làm việc và xem lịch hẹn</div>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </button>

          {/* Khách hàng */}
          <button
            onClick={() => onSelectRole('customer')}
            className="w-full bg-white hover:bg-purple-50 border border-purple-200 rounded-3xl p-6 flex items-center gap-6 transition shadow hover:shadow-lg"
          >
            <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-4xl">🌺</div>
            <div className="text-left flex-1">
              <div className="font-semibold text-xl">Khách hàng</div>
              <div className="text-gray-500">Đặt lịch, mua hàng, xem lịch sử</div>
            </div>
            <User className="w-8 h-8 text-pink-500" />
          </button>
        </div>
      </div>
    </div>
  );
}