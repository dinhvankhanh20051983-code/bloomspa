import { useState } from 'react';

function PinPad({ phone, role, onSuccess, onBack }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const addDigit = (digit) => {
    if (pin.length < 4) setPin(pin + digit);
  };

  const clearPin = () => setPin("");

  const verifyPin = () => {
    // Demo PIN: 1234 cho tất cả user
    if (pin === "1234") {
      onSuccess({
        id: role === 'employee' ? 'emp1' : 'cust1',
        name: role === 'employee' ? 'Nguyễn Thị Lan' : 'Trần Văn Minh',
        phone: phone,
        role: role
      });
    } else {
      setError("PIN không đúng");
      setTimeout(() => { setError(""); clearPin(); }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7c5cbf] to-[#5a3d9e] flex items-center justify-center p-6">
      <div className="max-w-[420px] w-full bg-white rounded-3xl shadow-2xl p-8">
        <button onClick={onBack} className="text-3xl mb-6">←</button>
        <h2 className="text-2xl font-bold text-center mb-2">Nhập PIN</h2>
        <p className="text-center text-gray-500 mb-8">{phone}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <button key={num} onClick={() => addDigit(num)} className="h-16 text-3xl font-semibold bg-gray-100 rounded-2xl hover:bg-gray-200">{num}</button>
          ))}
          <button onClick={clearPin} className="h-16 text-2xl font-semibold bg-gray-100 rounded-2xl">Xóa</button>
          <button onClick={() => addDigit(0)} className="h-16 text-3xl font-semibold bg-gray-100 rounded-2xl">0</button>
          <button onClick={verifyPin} className="h-16 text-3xl font-semibold bg-[#7c5cbf] text-white rounded-2xl">✓</button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default PinPad;