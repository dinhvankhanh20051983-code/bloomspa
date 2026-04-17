import { useState } from 'react';
import PinPad from './PinPad';

function LoginByPhone({ role, onLogin }) {
  const [phone, setPhone] = useState("");
  const [showPinPad, setShowPinPad] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = () => {
    if (phone.length < 9) {
      setError("Số điện thoại không hợp lệ");
      return;
    }
    setShowPinPad(true);
  };

  const handlePinSuccess = (userData) => {
    onLogin(userData);
  };

  if (showPinPad) {
    return <PinPad phone={phone} role={role} onSuccess={handlePinSuccess} onBack={() => setShowPinPad(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7c5cbf] to-[#5a3d9e] flex items-center justify-center p-6">
      <div className="max-w-[420px] w-full bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {role === 'employee' ? 'Đăng nhập Nhân viên' : 'Đăng nhập Khách hàng'}
        </h1>

        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
          className="w-full p-5 border border-gray-300 rounded-3xl text-lg mb-4"
        />

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          onClick={handlePhoneSubmit}
          className="w-full py-5 bg-[#7c5cbf] text-white rounded-3xl font-semibold text-xl"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default LoginByPhone;