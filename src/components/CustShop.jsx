import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function CustShop({ user }) {
  const [tab, setTab] = useState("products");
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  const addToCart = (item) => {
    const exist = cart.find(i => i.id === item.id);
    if (exist) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const confirmPayment = async (method) => {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    alert(`✅ Thanh toán ${method} thành công!\nTổng: ${total.toLocaleString('vi-VN')}đ`);
    setShowPayment(false);
    setCart([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🛒 Cửa hàng BloomSpa</h2>

      <div className="flex gap-2 mb-8 bg-white rounded-3xl p-1">
        <button onClick={() => setTab("products")} className={`flex-1 py-3 rounded-3xl ${tab === "products" ? "bg-[#7c5cbf] text-white" : ""}`}>Sản phẩm</button>
        <button onClick={() => setTab("packages")} className={`flex-1 py-3 rounded-3xl ${tab === "packages" ? "bg-[#7c5cbf] text-white" : ""}`}>Gói dịch vụ</button>
      </div>

      {tab === "products" && (
        <div className="grid grid-cols-2 gap-4">
          {/* Demo products */}
          {[{ id: 1, name: "Tinh dầu Lavender", emoji: "💜", price: 180000 }, { id: 2, name: "Kem dưỡng ẩm", emoji: "🧴", price: 320000 }].map(p => (
            <div key={p.id} className="bg-white rounded-3xl p-5 shadow text-center">
              <div className="text-5xl mb-4">{p.emoji}</div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-[#7c5cbf] font-bold mt-2">{p.price.toLocaleString('vi-VN')}đ</div>
              <button onClick={() => addToCart(p)} className="mt-6 w-full py-3 bg-[#7c5cbf] text-white rounded-3xl text-sm">Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-2xl w-[92%] p-6 z-50">
          <button onClick={() => setShowPayment(true)} className="w-full py-4 bg-green-500 text-white rounded-3xl">Thanh toán ({cart.length})</button>
        </div>
      )}

      {showPayment && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-3xl w-full max-w-md p-8">
            <h3 className="text-center text-xl font-bold mb-8">Chọn phương thức thanh toán</h3>
            <div onClick={() => confirmPayment("Momo")} className="flex gap-4 p-6 border-2 border-blue-500 rounded-3xl mb-6 cursor-pointer">
              <span className="text-4xl">📱</span>
              <div className="flex-1">Thanh toán Momo</div>
            </div>
<div onClick={() => confirmPayment("Chuyển khoản")} className="flex gap-4 p-6 border-2 border-gray-700 rounded-3xl cursor-pointer">
              <span className="text-4xl">🏦</span>
              <div className="flex-1">Chuyển khoản ngân hàng</div>
            </div>
            <button onClick={() => setShowPayment(false)} className="mt-8 w-full py-4 bg-gray-100 rounded-3xl">Huỷ</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustShop;