import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { BarChart3, Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function OwnerReports() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    // Doanh thu
    const { data: financeData } = await supabase
      .from('finance_transactions')
      .select('amount, type')
      .eq('type', 'income');

    const revenue = financeData ? financeData.reduce((sum, t) => sum + t.amount, 0) : 0;
    setTotalRevenue(revenue);

    // Tổng lịch hẹn
    const { count: apptCount } = await supabase
      .from('appointments')
      .select('*', { count: 'exact' });
    setTotalAppointments(apptCount || 0);

    // Tổng khách hàng
    const { count: custCount } = await supabase
      .from('customers')
      .select('*', { count: 'exact' });
    setTotalCustomers(custCount || 0);

    // Giao dịch gần đây
    const { data: trans } = await supabase
      .from('finance_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    setRecentTransactions(trans || []);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <BarChart3 className="w-8 h-8" />
          Báo cáo
        </h1>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Tháng này
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-3 text-green-600">
            <TrendingUp className="w-6 h-6" />
            <span className="font-medium">Doanh thu</span>
          </div>
          <div className="text-4xl font-bold text-green-600 mt-2">
            {totalRevenue.toLocaleString('vi-VN')}đ
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-3 text-purple-600">
            <Calendar className="w-6 h-6" />
            <span className="font-medium">Lịch hẹn</span>
          </div>
          <div className="text-4xl font-bold text-purple-600 mt-2">
            {totalAppointments}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-3 text-blue-600">
            <Users className="w-6 h-6" />
            <span className="font-medium">Khách hàng</span>
</div>
          <div className="text-4xl font-bold text-blue-600 mt-2">
            {totalCustomers}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-3 text-amber-600">
            <DollarSign className="w-6 h-6" />
            <span className="font-medium">Gói đã bán</span>
          </div>
          <div className="text-4xl font-bold text-amber-600 mt-2">12</div>
        </div>
      </div>

      {/* Giao dịch gần đây */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b font-medium text-gray-700">Giao dịch gần đây</div>
        {recentTransactions.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Chưa có giao dịch nào</div>
        ) : (
          <div className="divide-y">
            {recentTransactions.map((t) => (
              <div key={t.id} className="px-6 py-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-xs text-gray-500">{new Date(t.created_at).toLocaleDateString('vi-VN')}</div>
                </div>
                <div className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')}đ
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}