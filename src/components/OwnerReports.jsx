import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function OwnerReports() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('finance_transactions').select('amount');
      const total = data ? data.reduce((sum, t) => sum + t.amount, 0) : 0;
      setRevenue(total);
    };
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📊 Báo cáo kinh doanh</h2>
      <div className="bg-white rounded-3xl p-8 shadow text-center">
        <div className="text-sm text-gray-500">Tổng doanh thu</div>
        <div className="text-5xl font-bold text-[#7c5cbf] mt-4">{revenue.toLocaleString('vi-VN')}đ</div>
      </div>
    </div>
  );
}

export default OwnerReports;