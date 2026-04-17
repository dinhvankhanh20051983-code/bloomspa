import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function OwnerInventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      setProducts(data || []);
    };
    loadProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📦 Quản lý kho hàng</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-3xl p-6 shadow">
            <div className="text-4xl mb-4 text-center">{p.emoji}</div>
            <div className="font-semibold text-center">{p.name}</div>
            <div className="text-[#7c5cbf] text-center font-bold mt-4">{p.price.toLocaleString('vi-VN')}đ</div>
            <div className="text-xs text-gray-400 text-center mt-2">Tồn kho: {p.stock}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerInventory;