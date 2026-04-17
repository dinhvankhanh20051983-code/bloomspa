import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Calendar, Package, Gift, Clock } from 'lucide-react';

export default function CustHome() {
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    // Demo data cho khách hàng (sau này lấy từ localStorage user)
    setLoyaltyPoints(245);

    const { data: pkgData } = await supabase
      .from('packages')
      .select('*')
      .limit(3);

    setPackages(pkgData || []);

    // Lịch hẹn sắp tới
    const { data: appt } = await supabase
      .from('appointments')
      .select('*, services(name)')
      .order('date')
      .limit(1);

    if (appt && appt.length > 0) setNextAppointment(appt[0]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">Chào bạn!</h1>
          <p className="text-gray-500">Hôm nay bạn khỏe không?</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-amber-500">
            <Gift className="w-6 h-6" />
            <span className="text-2xl font-bold">{loyaltyPoints}</span>
            <span className="text-sm">điểm</span>
          </div>
        </div>
      </div>

      {/* Lịch hẹn sắp tới */}
      {nextAppointment && (
        <div className="bg-white rounded-3xl p-6 mb-8 shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Lịch hẹn sắp tới
          </h2>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">{nextAppointment.date} • {nextAppointment.time}</div>
              <div className="text-purple-600">{nextAppointment.services?.name}</div>
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-3xl text-sm">Xem chi tiết</button>
          </div>
        </div>
      )}

      {/* Gói dịch vụ gợi ý */}
      <h2 className="text-xl font-semibold mb-4">Gói dịch vụ đang có</h2>
      <div className="grid grid-cols-1 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-3xl p-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Package className="w-10 h-10 text-purple-500" />
              <div>
                <div className="font-semibold">{pkg.name}</div>
                <div className="text-sm text-gray-500">{pkg.sessions} buổi • {pkg.duration_days} ngày</div>
              </div>
            </div>
            <div className="text-right">
<div className="text-xl font-bold text-purple-600">
                {pkg.price.toLocaleString('vi-VN')}đ
              </div>
              <button className="text-xs bg-purple-100 text-purple-700 px-4 py-1 rounded-3xl mt-2">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-400">Bạn muốn đặt lịch mới?</p>
        <button className="mt-4 bg-purple-600 text-white px-8 py-4 rounded-3xl text-lg font-medium shadow-lg">
          Đặt lịch hẹn ngay
        </button>
      </div>
    </div>
  );
}