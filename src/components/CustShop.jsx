import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Package, ShoppingCart, Plus, Check } from 'lucide-react';

export default function CustShop() {
  const [packages, setPackages] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    // Gói dịch vụ
    const { data: pkgData } = await supabase
      .from('packages')
      .select('*')
      .order('price');
    setPackages(pkgData || []);

    // Sản phẩm
    const { data: prodData } = await supabase
      .from('products')
      .select('*')
      .order('name');
    setProducts(prodData || []);
  };

  const addToCart = (item, type) => {
    setCart([...cart, { ...item, type }]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" />
          Cửa hàng
        </h1>
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-purple-600 text-white px-6 py-3 rounded-3xl flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Giỏ hàng
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Gói dịch vụ */}
      <h2 className="text-xl font-semibold mb-4">Gói dịch vụ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition">
            <div className="font-bold text-2xl">{pkg.name}</div>
            <div className="text-purple-600 text-4xl font-semibold mt-3">
              {pkg.price.toLocaleString('vi-VN')}đ
            </div>
            <div className="text-sm text-gray-500 mt-1">{pkg.sessions} buổi • {pkg.duration_days} ngày</div>
            <button
              onClick={() => addToCart(pkg, 'package')}
              className="mt-6 w-full py-4 bg-purple-600 text-white rounded-3xl flex items-center justify-center gap-2 hover:bg-purple-700 transition"
            >
              <Plus className="w-5 h-5" />
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      {/* Sản phẩm */}
      <h2 className="text-xl font-semibold mb-4">Sản phẩm</h2>
<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition text-center">
            <div className="text-5xl mb-4">📦</div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-purple-600 text-2xl font-bold mt-2">
              {product.price.toLocaleString('vi-VN')}đ
            </div>
            <button
              onClick={() => addToCart(product, 'product')}
              className="mt-6 w-full py-3 bg-purple-100 text-purple-700 rounded-3xl text-sm hover:bg-purple-200 transition"
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      {/* Giỏ hàng modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-t-3xl md:rounded-3xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Giỏ hàng ({cart.length})</h2>
              {cart.length === 0 ? (
                <p className="text-center py-12 text-gray-400">Giỏ hàng trống</p>
              ) : (
                <div className="space-y-4 mb-8">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.type === 'package' ? 'Gói dịch vụ' : 'Sản phẩm'}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-bold text-purple-600">
                          {item.price.toLocaleString('vi-VN')}đ
                        </div>
                        <button onClick={() => removeFromCart(index)} className="text-red-500">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-6">
                <div className="flex justify-between text-xl font-semibold">
                  <span>Tổng tiền</span>
                  <span className="text-purple-600">{getTotal().toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowCart(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl">Đóng</button>
                <button className="flex-1 py-4 bg-purple-600 text-white rounded-3xl">Thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}