import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Plus, Search, User, Phone, Gift } from 'lucide-react';

export default function OwnerCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setCustomers(data || []);
  };

  const filteredCustomers = customers.filter(c =>
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone || '').includes(searchTerm)
  );

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('customers')
      .insert([newCustomer]);

    if (error) {
      alert('Lỗi khi thêm khách hàng: ' + error.message);
    } else {
      alert('✅ Thêm khách hàng thành công!');
      setShowAddForm(false);
      setNewCustomer({ name: '', phone: '', email: '', notes: '' });
      fetchCustomers();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <User className="w-8 h-8" />
          Quản lý khách hàng
        </h1>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2 shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Thêm khách hàng mới
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm theo tên hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-3xl focus:outline-none focus:border-purple-400"
        />
      </div>

      {/* Danh sách khách hàng */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <User className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Chưa có khách hàng nào</p>
            <p className="text-sm mt-1">Nhấn nút “Thêm khách hàng mới” để bắt đầu</p>
          </div>
        ) : (
          <div className="divide-y">
{filteredCustomers.map((customer) => (
              <div key={customer.id} className="p-5 flex items-center justify-between hover:bg-purple-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <div className="font-semibold">{customer.name}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4" />
                      {customer.phone}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {customer.loyalty_points !== undefined && (
                    <div className="flex items-center gap-1 text-amber-500 text-sm">
                      <Gift className="w-4 h-4" />
                      <span className="font-medium">{customer.loyalty_points} điểm</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {customer.created_at ? new Date(customer.created_at).toLocaleDateString('vi-VN') : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal thêm khách hàng */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Thêm khách hàng mới</h2>
              <form onSubmit={handleAddCustomer} className="space-y-4">
                <input
                  type="text"
                  placeholder="Họ tên"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400"
                  required
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400"
                  required
                />
                <input
                  type="email"
                  placeholder="Email (tùy chọn)"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400"
                />
                <textarea
                  placeholder="Ghi chú"
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 h-24"
                />
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-4 text-gray-600 bg-gray-100 rounded-3xl font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-purple-600 text-white rounded-3xl font-medium"
                  >
                    Thêm khách hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}