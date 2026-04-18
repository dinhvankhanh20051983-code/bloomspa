import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Calendar, Clock, User, Check } from 'lucide-react';

export default function BookingForm({ onClose, onSuccess }) {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchEmployees();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('name');
    setServices(data || []);
  };

  const fetchEmployees = async () => {
    const { data } = await supabase.from('employees').select('*').order('name');
    setEmployees(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('appointments')
      .insert([{
        customer_name: customerName,
        customer_phone: customerPhone,
        service_id: selectedService,
        employee_id: selectedEmployee,
        date: date,
        time: time,
        status: 'pending'
      }]);

    setLoading(false);

    if (error) {
      alert('Lỗi đặt lịch: ' + error.message);
    } else {
      alert('✅ Đặt lịch thành công!');
      onSuccess?.();
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-purple-700">Đặt lịch hẹn mới</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Dịch vụ */}
          <div>
            <label className="block text-sm font-medium mb-2">Dịch vụ</label>
            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full px-4 py-4 border border-gray-200 rounded-3xl" required>
              <option value="">Chọn dịch vụ...</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Nhân viên thực hiện */}
          <div>
            <label className="block text-sm font-medium mb-2">Nhân viên thực hiện</label>
            <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className="w-full px-4 py-4 border border-gray-200 rounded-3xl" required>
              <option value="">Chọn nhân viên...</option>
{employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ngày</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-4 border border-gray-200 rounded-3xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Giờ</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-4 border border-gray-200 rounded-3xl" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Họ tên khách hàng</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-4 border border-gray-200 rounded-3xl" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Số điện thoại</label>
            <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full px-4 py-4 border border-gray-200 rounded-3xl" required />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-gray-600 bg-gray-100 rounded-3xl font-medium">Hủy</button>
            <button type="submit" disabled={loading} className="flex-1 py-4 bg-purple-600 text-white rounded-3xl font-medium">
              {loading ? 'Đang đặt...' : 'Đặt lịch ngay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}