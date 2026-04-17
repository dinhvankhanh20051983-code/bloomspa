import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Save, Settings, Store, Phone, MapPin, Clock, Mail } from 'lucide-react';

export default function OwnerSettings() {
  const [settings, setSettings] = useState({
    shop_name: 'BloomSpa & Wellness',
    address: '',
    phone: '',
    email: '',
    opening_hours: '08:00 - 20:00',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .single();

    if (data) setSettings(data);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('settings')
      .upsert({ id: 1, ...settings }, { onConflict: 'id' });

    setLoading(false);

    if (error) {
      alert('❌ Lỗi khi lưu: ' + error.message);
    } else {
      alert('✅ Đã lưu cài đặt thành công!');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <Settings className="w-8 h-8" />
          Cài đặt
        </h1>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl mx-auto bg-white rounded-3xl shadow p-8 space-y-6">
        {/* Tên tiệm */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <Store className="w-5 h-5" />
            Tên tiệm
          </label>
          <input
            type="text"
            value={settings.shop_name}
            onChange={(e) => setSettings({ ...settings, shop_name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* Địa chỉ */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <MapPin className="w-5 h-5" />
            Địa chỉ
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400"
            placeholder="Số nhà, đường, quận/huyện"
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <Phone className="w-5 h-5" />
            Số điện thoại
          </label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <Mail className="w-5 h-5" />
            Email
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* Giờ mở cửa */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <Clock className="w-5 h-5" />
            Giờ mở cửa
          </label>
          <input
            type="text"
            value={settings.opening_hours}
            onChange={(e) => setSettings({ ...settings, opening_hours: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400"
            placeholder="08:00 - 20:00"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-3xl font-medium flex items-center justify-center gap-2 shadow-lg transition"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
        </button>
      </form>
    </div>
  );
}