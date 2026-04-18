import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Plus, Edit, Trash2, Clock } from 'lucide-react';

export default function OwnerServices() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    duration_minutes: 60,
    description: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name');
    if (error) console.error(error);
    else setServices(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const priceNumber = parseInt(formData.price) || 0;

    const payload = {
      name: formData.name,
      price: priceNumber,
      duration_minutes: parseInt(formData.duration_minutes) || 60,
      description: formData.description
    };

    let error;
    if (editingService) {
      ({ error } = await supabase.from('services').update(payload).eq('id', editingService.id));
    } else {
      ({ error } = await supabase.from('services').insert([payload]));
    }

    if (error) alert('Lỗi: ' + error.message);
    else {
      alert('✅ Lưu dịch vụ thành công!');
      setShowForm(false);
      setEditingService(null);
      setFormData({ name: '', price: 0, duration_minutes: 60, description: '' });
      fetchServices();
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      price: service.price,
      duration_minutes: service.duration_minutes || 60,
      description: service.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa dịch vụ này?')) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) alert('Lỗi xóa: ' + error.message);
      else fetchServices();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <Clock className="w-8 h-8" />
          Quản lý Dịch vụ
        </h1>
        <button
          onClick={() => {
            setEditingService(null);
            setFormData({ name: '', price: 0, duration_minutes: 60, description: '' });
            setShowForm(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm dịch vụ mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
<div key={service.id} className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition">
            <div className="font-bold text-xl">{service.name}</div>
            <div className="text-purple-600 text-3xl font-semibold mt-3">
              {service.price.toLocaleString('vi-VN')}đ
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4" />
              {service.duration_minutes} phút
            </div>
            {service.description && <p className="text-gray-500 text-sm mt-4 line-clamp-2">{service.description}</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => handleEdit(service)} className="flex-1 py-3 border border-purple-200 text-purple-600 rounded-3xl">Sửa</button>
              <button onClick={() => handleDelete(service.id)} className="flex-1 py-3 border border-red-200 text-red-500 rounded-3xl">Xóa</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal thêm/sửa dịch vụ */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingService ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Tên dịch vụ"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-3xl"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Giá (VND)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-3xl"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Thời gian (phút)</label>
                  <input
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 60 })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-3xl"
                  />
                </div>
              </div>
              <textarea
                placeholder="Mô tả dịch vụ"
                value={formData.description}
onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-4 border border-gray-200 rounded-3xl h-24"
              />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-purple-600 text-white rounded-3xl">Lưu dịch vụ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}