import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Plus, Edit, Trash2, Clock } from 'lucide-react';

export default function OwnerPackages() {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
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

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    // Chỉ cho phép 1 dấu chấm
    if ((value.match(/\./g) || []).length > 1) {
      value = value.substring(0, value.lastIndexOf('.'));
    }
    setFormData({ ...formData, price: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const priceNumber = parseInt(formData.price) || 0;

    const payload = {
      name: formData.name,
      price: priceNumber,
      sessions: parseInt(formData.sessions) || 5,
      duration_days: parseInt(formData.duration_days) || 30,
      description: formData.description
    };

    let error;
    if (editingPackage) {
      ({ error } = await supabase.from('packages').update(payload).eq('id', editingPackage.id));
    } else {
      ({ error } = await supabase.from('packages').insert([payload]));
    }

    if (error) alert('Lỗi: ' + error.message);
    else {
      alert('✅ Lưu gói dịch vụ thành công!');
      setShowForm(false);
      setEditingPackage(null);
      setFormData({ name: '', price: '', sessions: 5, duration_days: 30, description: '' });
      fetchPackages();
    }
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price.toString(),
      sessions: pkg.sessions || 5,
      duration_days: pkg.duration_days || 30,
      description: pkg.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa gói dịch vụ này?')) {
      const { error } = await supabase.from('packages').delete().eq('id', id);
      if (error) alert('Lỗi xóa: ' + error.message);
      else fetchPackages();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <Clock className="w-8 h-8" />
          Quản lý gói dịch vụ
        </h1>
        <button
          onClick={() => {
            setEditingPackage(null);
            setFormData({ name: '', price: '', sessions: 5, duration_days: 30, description: '' });
setShowForm(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm gói mới
        </button>
      </div>

      {/* Danh sách gói */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition">
            <div className="font-bold text-xl">{pkg.name}</div>
            <div className="text-purple-600 text-4xl font-semibold mt-3">
              {pkg.price.toLocaleString('vi-VN')}đ
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {pkg.sessions} buổi • {pkg.duration_days} ngày
            </div>
            {pkg.description && <p className="text-gray-500 text-sm mt-4">{pkg.description}</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => handleEdit(pkg)} className="flex-1 py-3 border border-purple-200 text-purple-600 rounded-3xl">Sửa</button>
              <button onClick={() => handleDelete(pkg.id)} className="flex-1 py-3 border border-red-200 text-red-500 rounded-3xl">Xóa</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal thêm/sửa gói */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6">{editingPackage ? 'Sửa gói' : 'Thêm gói mới'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Tên gói"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-3xl"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Giá (VND)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={formData.price}
                    onChange={handlePriceChange}
                    className="w-full px-4 py-4 border border-gray-200 rounded-3xl text-right text-2xl"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Số buổi</label>
                  <input
                    type="number"
                    value={formData.sessions}
                    onChange={(e) => setFormData({ ...formData, sessions: e.target.value })}
className="w-full px-4 py-4 border border-gray-200 rounded-3xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500">Thời hạn (ngày)</label>
                <input
                  type="number"
                  value={formData.duration_days}
                  onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-3xl"
                />
              </div>

              <textarea
                placeholder="Mô tả gói"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-3xl h-24"
              />

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-purple-600 text-white rounded-3xl">Lưu gói</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}