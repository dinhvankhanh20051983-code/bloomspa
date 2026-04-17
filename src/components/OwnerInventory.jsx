import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Plus, Search, Package, AlertTriangle, Edit } from 'lucide-react';

export default function OwnerInventory() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    stock: 0,
    price: 0,
    unit: 'chai'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');

    if (error) console.error(error);
    else setProducts(data || []);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('products')
      .insert([newProduct]);

    if (error) alert('Lỗi: ' + error.message);
    else {
      alert('✅ Thêm sản phẩm thành công!');
      setShowAddForm(false);
      setNewProduct({ name: '', stock: 0, price: 0, unit: 'chai' });
      fetchProducts();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <Package className="w-8 h-8" />
          Quản lý kho hàng
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-3xl focus:outline-none focus:border-purple-400"
        />
      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Chưa có sản phẩm nào trong kho</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-5 flex items-center justify-between hover:bg-purple-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl">
📦
                  </div>
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.unit} • {product.price.toLocaleString('vi-VN')}đ</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className={`font-medium ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                    {product.stock} {product.unit}
                    {product.stock < 10 && <AlertTriangle className="inline w-4 h-4 ml-1" />}
                  </div>
                  <button className="text-purple-600 hover:text-purple-700">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal thêm sản phẩm */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 p-6">
            <h2 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input type="text" placeholder="Tên sản phẩm" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Số lượng" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)||0})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl" />
                <input type="number" placeholder="Giá bán" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseInt(e.target.value)||0})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl" />
              </div>
              <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-3xl font-medium">Thêm vào kho</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="w-full py-4 text-gray-600 bg-gray-100 rounded-3xl">Hủy</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}