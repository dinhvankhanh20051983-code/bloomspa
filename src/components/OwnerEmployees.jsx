import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Plus, User, Phone, Mail, Edit, Trash2 } from 'lucide-react';

export default function OwnerEmployees() {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'staff',
    salary: 0
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('name');

    if (error) console.error(error);
    else setEmployees(data || []);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('employees')
      .insert([newEmployee]);

    if (error) {
      alert('Lỗi: ' + error.message);
    } else {
      alert('✅ Thêm nhân viên thành công!');
      setShowAddForm(false);
      setNewEmployee({ name: '', phone: '', email: '', role: 'staff', salary: 0 });
      fetchEmployees();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <User className="w-8 h-8" />
          Quản lý nhân viên
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2 shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Thêm nhân viên
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {employees.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <User className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Chưa có nhân viên nào</p>
          </div>
        ) : (
          <div className="divide-y">
            {employees.map((emp) => (
              <div key={emp.id} className="p-5 flex items-center justify-between hover:bg-purple-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                    👷
                  </div>
                  <div>
                    <div className="font-semibold">{emp.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {emp.phone}
                      {emp.email && (
                        <>
                          <span className="mx-2">•</span>
                          <Mail className="w-4 h-4" /> {emp.email}
                        </>
                      )}
                    </div>
</div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-medium capitalize">{emp.role}</div>
                    <div className="text-xs text-gray-400">
                      Lương: {emp.salary ? emp.salary.toLocaleString('vi-VN') + 'đ' : 'Chưa có'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-2xl">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-100 rounded-2xl">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal thêm nhân viên */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 p-6">
            <h2 className="text-2xl font-bold mb-6">Thêm nhân viên mới</h2>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <input
                type="text"
                placeholder="Họ tên"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                required
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
              />
              <select
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
              >
                <option value="staff">Nhân viên</option>
                <option value="therapist">Kỹ thuật viên</option>
                <option value="manager">Quản lý</option>
              </select>
              <input
                type="number"
                placeholder="Lương cơ bản"
                value={newEmployee.salary}
onChange={(e) => setNewEmployee({ ...newEmployee, salary: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-purple-600 text-white rounded-3xl font-medium"
                >
                  Thêm nhân viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}