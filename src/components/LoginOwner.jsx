import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function LoginOwner({ onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Thông tin đăng nhập Chủ tiệm (không lộ mật khẩu)
    const correctPhone = '0933251983';
    const correctPin = '@Hung05201983';

    try {
      if (phone === correctPhone && pin === correctPin) {
        const userData = {
          id: 1,
          role: 'owner',
          name: 'Chủ tiệm BloomSpa',
          phone: phone
        };
        localStorage.setItem('bloomspa_user', JSON.stringify(userData));
        onLoginSuccess(userData);
      } else {
        alert('Số điện thoại hoặc PIN sai!');
      }
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center text-5xl mb-4">👑</div>
          <h1 className="text-3xl font-bold text-purple-700">Đăng nhập Chủ tiệm</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Số điện thoại</label>
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0933251983"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:border-purple-400 text-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">PIN / Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" />
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Nhập PIN"
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:border-purple-400 text-lg"
                required
              />
              <button
type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium rounded-3xl transition"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}