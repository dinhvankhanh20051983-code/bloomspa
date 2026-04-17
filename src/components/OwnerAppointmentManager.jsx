import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Plus, Calendar, Search, Clock } from 'lucide-react';
import BookingForm from './BookingForm';

export default function OwnerAppointmentManager() {
  const [appointments, setAppointments] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, customers(name, phone), services(name)')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) console.error(error);
    else setAppointments(data || []);
  };

  const filteredAppointments = appointments.filter(app =>
    app.customers?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.services?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <Calendar className="w-8 h-8" />
          Quản lý lịch hẹn
        </h1>
        
        <button
          onClick={() => setShowBookingForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2 shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Thêm lịch hẹn mới
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm theo tên khách hoặc dịch vụ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-3xl focus:outline-none focus:border-purple-400"
        />
      </div>

      {/* Danh sách lịch hẹn */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Chưa có lịch hẹn nào</p>
            <p className="text-sm mt-1">Nhấn nút “Thêm lịch hẹn mới” để bắt đầu</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredAppointments.map((app) => (
              <div key={app.id} className="p-5 flex items-center justify-between hover:bg-purple-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl">
{app.date?.slice(8,10)}
                  </div>
                  <div>
                    <div className="font-semibold">{app.customers?.name}</div>
                    <div className="text-sm text-gray-500">{app.services?.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-purple-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{app.time}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{app.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal thêm lịch hẹn */}
      {showBookingForm && (
        <BookingForm 
          onClose={() => setShowBookingForm(false)} 
          onSuccess={() => {
            setShowBookingForm(false);
            fetchAppointments();
          }} 
        />
      )}
    </div>
  );
}