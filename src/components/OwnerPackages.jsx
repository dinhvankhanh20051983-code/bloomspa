import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Plus, Package, Clock, DollarSign } from 'lucide-react';

export default function OwnerPackages() {
  const [packages, setPackages] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: 0,
    sessions: 5,
    duration_days: 30,
    description: ''
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('price');

    if (error) console.error(error);
    else setPackages(data || []);
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('packages')
      .insert([newPackage]);

    if (error) alert('Lỗi: ' + error.message);
    else {
      alert('✅ Thêm gói dịch vụ thành công!');
      setShowAddForm(false);
      setNewPackage({ name: '', price: 0, sessions: 5, duration_days: 30, description: '' });
      fetchPackages();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <Package className="w-8 h-8" />
          Quản lý gói dịch vụ
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2 shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Thêm gói mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center text-gray-400">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Chưa có gói dịch vụ nào</p>
          </div>
        ) : (
          packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-3xl shadow p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-xl">{pkg.name}</div>
                  <div className="text-purple-600 text-3xl font-semibold mt-2">
                    {pkg.price.toLocaleString('vi-VN')}đ
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-3xl inline-block">
                    {pkg.sessions} buổi
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
<span className="flex items-center gap-2"><Clock className="w-4 h-4" />Thời hạn</span>
                  <span className="font-medium">{pkg.duration_days} ngày</span>
                </div>
                {pkg.description && (
                  <div className="text-gray-500 text-xs leading-relaxed border-t pt-3">
                    {pkg.description}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal thêm gói dịch vụ */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 p-6">
            <h2 className="text-2xl font-bold mb-6">Thêm gói dịch vụ mới</h2>
            <form onSubmit={handleAddPackage} className="space-y-4">
              <input
                type="text"
                placeholder="Tên gói (ví dụ: Liệu trình 5 buổi)"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Giá</label>
                  <input
                    type="number"
                    placeholder="Giá gói"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Số buổi</label>
                  <input
                    type="number"
                    placeholder="Số buổi"
                    value={newPackage.sessions}
                    onChange={(e) => setNewPackage({ ...newPackage, sessions: parseInt(e.target.value) || 5 })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                  />
                </div>
              </div>
              <input
                type="number"
                placeholder="Thời hạn (số ngày)"
                value={newPackage.duration_days}
                onChange={(e) => setNewPackage({ ...newPackage, duration_days: parseInt(e.target.value) || 30 })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
              />
              <textarea
                placeholder="Mô tả gói dịch vụ"
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
className="w-full px-4 py-3 border border-gray-200 rounded-2xl h-24"
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-purple-600 text-white rounded-3xl">Thêm gói</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}