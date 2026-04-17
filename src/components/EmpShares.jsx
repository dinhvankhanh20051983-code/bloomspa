import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Award, Plus, Users } from 'lucide-react';

export default function EmpShares() {
  const [shares, setShares] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newShare, setNewShare] = useState({
    employee_id: '',
    amount: 0,
    reason: 'Thưởng doanh số'
  });

  useEffect(() => {
    fetchShares();
  }, []);

  const fetchShares = async () => {
    const { data, error } = await supabase
      .from('emp_shares')
      .select('*, employees(name)')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setShares(data || []);
  };

  const handleAddShare = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('emp_shares')
      .insert([newShare]);

    if (error) alert('Lỗi: ' + error.message);
    else {
      alert('✅ Đã thêm thưởng!');
      setShowForm(false);
      setNewShare({ employee_id: '', amount: 0, reason: 'Thưởng doanh số' });
      fetchShares();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <Award className="w-8 h-8" />
        Chia cổ phần & Thưởng
      </h1>

      <button
        onClick={() => setShowForm(true)}
        className="mb-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2 shadow-lg transition"
      >
        <Plus className="w-5 h-5" />
        Thêm thưởng mới
      </button>

      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {shares.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Chưa có khoản thưởng nào</p>
          </div>
        ) : (
          <div className="divide-y">
            {shares.map((s) => (
              <div key={s.id} className="p-5 flex justify-between items-center hover:bg-purple-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl">🏆</div>
                  <div>
                    <div className="font-semibold">{s.employees?.name || 'Nhân viên'}</div>
                    <div className="text-sm text-gray-500">{s.reason}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    +{s.amount.toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(s.created_at).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
{/* Modal thêm thưởng */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 p-6">
            <h2 className="text-2xl font-bold mb-6">Thêm thưởng / Chia cổ phần</h2>
            <form onSubmit={handleAddShare} className="space-y-4">
              <input
                type="text"
                placeholder="Mã nhân viên (demo: emp_001)"
                value={newShare.employee_id}
                onChange={(e) => setNewShare({ ...newShare, employee_id: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                required
              />
              <input
                type="number"
                placeholder="Số tiền thưởng"
                value={newShare.amount}
                onChange={(e) => setNewShare({ ...newShare, amount: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                required
              />
              <input
                type="text"
                placeholder="Lý do (Thưởng doanh số, Thưởng KPI...)"
                value={newShare.reason}
                onChange={(e) => setNewShare({ ...newShare, reason: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-purple-600 text-white rounded-3xl">Thêm thưởng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}