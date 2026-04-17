import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function PinPad({ onPinCorrect }) {
  const [pin, setPin] = useState('');

  const handleNumber = (num) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin === '1234') { // Demo PIN
      onPinCorrect();
    } else {
      alert('PIN sai! Demo: 1234');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-xs w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-purple-700">Nhập PIN</h1>
          <div className="mt-6 flex justify-center gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-2xl border-2 flex items-center justify-center text-2xl font-light ${pin.length > i ? 'border-purple-600 bg-purple-100' : 'border-gray-200'}`}
              >
                {pin.length > i ? '•' : ''}
              </div>
            ))}
          </div>
        </div>

        {/* Bàn phím PIN */}
        <div className="grid grid-cols-3 gap-4 text-3xl font-light">
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="h-16 bg-gray-100 hover:bg-gray-200 rounded-3xl transition active:scale-95"
            >
              {num}
            </button>
          ))}
          <button onClick={handleDelete} className="h-16 bg-gray-100 hover:bg-red-100 text-red-500 rounded-3xl transition active:scale-95 text-2xl">⌫</button>
          <button onClick={() => handleNumber(0)} className="h-16 bg-gray-100 hover:bg-gray-200 rounded-3xl transition active:scale-95">0</button>
          <button onClick={handleSubmit} className="h-16 bg-purple-600 text-white rounded-3xl transition active:scale-95">OK</button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">Demo PIN: 1234</p>
      </div>
    </div>
  );
}