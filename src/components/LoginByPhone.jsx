import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Phone, ArrowRight } from 'lucide-react';

export default function LoginByPhone({ onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Demo login (thực tế sẽ kiểm tra DB)
    if (phone.length >= 9) {
      const userData = {
        id: Date.now(),
        role: 'customer',
        name: 'Khách hàng',
        phone: phone
      };
      localStorage.setItem('bloomspa_user', JSON.stringify(userData));
      onLoginSuccess(userData);
    } else {
      alert('Vui lòng nhập số điện thoại hợp lệ');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-pink-100 text-pink-600 rounded-3xl flex items-center justify-center text-4xl mb-4">📱</div>
          <h1 className="text-3xl font-bold text-purple-700">Đăng nhập bằng số điện thoại</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Số điện thoại</label>
            <div className="relative">
              <Phone className="absolute left-4 top-4 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0987654321"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:border-purple-400 text-lg"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium rounded-3xl flex items-center justify-center gap-3 transition"
          >
            {loading ? 'Đang kiểm tra...' : 'Tiếp tục'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Demo: Nhập bất kỳ số điện thoại nào (9 số trở lên)
        </p>
      </div>
    </div>
  );
}