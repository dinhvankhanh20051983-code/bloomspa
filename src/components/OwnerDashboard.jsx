import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Calendar, Users, DollarSign, Package, TrendingUp } from 'lucide-react';

export default function OwnerDashboard() {
  const [stats, setStats] = useState({
    todayRevenue: 0,
    totalCustomers: 0,
    todayAppointments: 0,
    totalPackagesSold: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    // Doanh thu hôm nay
    const { data: revenueData } = await supabase
      .from('finance_transactions')
      .select('amount')
      .eq('type', 'income')
      .gte('created_at', new Date().toISOString().split('T')[0]);

    const todayRevenue = revenueData ? revenueData.reduce((sum, t) => sum + t.amount, 0) : 0;

    // Tổng khách hàng
    const { count: custCount } = await supabase
      .from('customers')
      .select('*', { count: 'exact' });

    // Lịch hẹn hôm nay
    const { count: apptCount } = await supabase
      .from('appointments')
      .select('*', { count: 'exact' })
      .eq('date', new Date().toISOString().split('T')[0]);

    setStats({
      todayRevenue,
      totalCustomers: custCount || 0,
      todayAppointments: apptCount || 0,
      totalPackagesSold: 12 // demo
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-purple-700 mb-8">Dashboard Chủ Tiệm</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Doanh thu hôm nay */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Doanh thu hôm nay</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {stats.todayRevenue.toLocaleString('vi-VN')}đ
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>

        {/* Khách hàng */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng khách hàng</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalCustomers}</p>
            </div>
            <Users className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        {/* Lịch hẹn hôm nay */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Lịch hẹn hôm nay</p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{stats.todayAppointments}</p>
            </div>
            <Calendar className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        {/* Gói đã bán */}
<div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Gói dịch vụ đã bán</p>
              <p className="text-4xl font-bold text-amber-600 mt-2">{stats.totalPackagesSold}</p>
            </div>
            <Package className="w-12 h-12 text-amber-500" />
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-3xl p-8 shadow">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6" />
          Hoạt động gần đây
        </h2>
        <p className="text-gray-400 text-center py-12">Dữ liệu hoạt động sẽ hiển thị ở đây sau khi có giao dịch</p>
      </div>
    </div>
  );
}