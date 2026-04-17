import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function OwnerFinance() {
  const [transactions, setTransactions] = useState([]);
  const [capital, setCapital] = useState(1000000000);

  useEffect(() => {
    const loadFinance = async () => {
      const { data } = await supabase.from('finance_transactions').select('*').order('date', { ascending: false });
      setTransactions(data || []);
    };
    loadFinance();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">💰 Quản lý tài chính</h2>
      <div className="bg-white rounded-3xl p-6 shadow mb-8">
        <div className="text-sm text-gray-500">Vốn hiện tại</div>
        <div className="text-4xl font-bold text-[#7c5cbf]">{capital.toLocaleString('vi-VN')}đ</div>
      </div>

      <h3 className="font-semibold mb-4">Giao dịch gần đây</h3>
      {transactions.map(tx => (
        <div key={tx.id} className="flex justify-between py-4 border-b">
          <div>
            <div>{tx.description}</div>
            <div className="text-xs text-gray-400">{tx.date}</div>
          </div>
          <div className="font-semibold text-[#7c5cbf]">+{tx.amount.toLocaleString('vi-VN')}đ</div>
        </div>
      ))}
    </div>
  );
}

export default OwnerFinance;