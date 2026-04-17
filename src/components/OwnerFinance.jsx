import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Plus, DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export default function OwnerFinance() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    amount: 0,
    description: '',
    category: ''
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('finance_transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else {
      setTransactions(data || []);
      const income = data.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expense = data.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      setTotalIncome(income);
      setTotalExpense(expense);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('finance_transactions')
      .insert([newTransaction]);

    if (error) alert('Lỗi: ' + error.message);
    else {
      alert('✅ Thêm giao dịch thành công!');
      setShowAddForm(false);
      setNewTransaction({ type: 'income', amount: 0, description: '', category: '' });
      fetchTransactions();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <DollarSign className="w-8 h-8" />
          Tài chính
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Thêm thu/chi
        </button>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-3 text-green-600">
            <TrendingUp className="w-6 h-6" />
            <span className="font-medium">Doanh thu</span>
          </div>
          <div className="text-4xl font-bold text-green-600 mt-2">
            {totalIncome.toLocaleString('vi-VN')}đ
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-3 text-red-600">
            <TrendingDown className="w-6 h-6" />
            <span className="font-medium">Chi phí</span>
          </div>
          <div className="text-4xl font-bold text-red-600 mt-2">
{totalExpense.toLocaleString('vi-VN')}đ
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-3 text-purple-700">
            <DollarSign className="w-6 h-6" />
            <span className="font-medium">Lợi nhuận</span>
          </div>
          <div className="text-4xl font-bold text-purple-700 mt-2">
            {(totalIncome - totalExpense).toLocaleString('vi-VN')}đ
          </div>
        </div>
      </div>

      {/* Danh sách giao dịch */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Chưa có giao dịch nào</p>
          </div>
        ) : (
          <div className="divide-y">
            {transactions.map((t) => (
              <div key={t.id} className="p-5 flex items-center justify-between hover:bg-purple-50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {t.type === 'income' ? '↑' : '↓'}
                  </div>
                  <div>
                    <div className="font-semibold">{t.description}</div>
                    <div className="text-sm text-gray-500">{t.category}</div>
                  </div>
                </div>
                <div className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')}đ
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal thêm thu/chi */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 p-6">
            <h2 className="text-2xl font-bold mb-6">Thêm thu/chi mới</h2>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
              >
                <option value="income">Thu tiền</option>
                <option value="expense">Chi tiền</option>
              </select>
              <input
                type="number"
                placeholder="Số tiền"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
required
              />
              <input
                type="text"
                placeholder="Mô tả"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                required
              />
              <input
                type="text"
                placeholder="Danh mục (ví dụ: Bán liệu trình, Mua vật tư...)"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-purple-600 text-white rounded-3xl">Lưu giao dịch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}