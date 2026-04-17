import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function EmpAppts() {
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const fetchMyAppointments = async () => {
    // Giả sử nhân viên đang login, lấy appointments của nhân viên này
    // (sau này sẽ lấy employee_id từ localStorage)
    const { data, error } = await supabase
      .from('appointments')
      .select('*, customers(name, phone), services(name)')
      .order('date')
      .order('time');

    if (error) console.error(error);
    else {
      setAppointments(data || []);

      // Lịch hôm nay
      const today = new Date().toISOString().split('T')[0];
      const todayList = data.filter(a => a.date === today);
      setTodayAppointments(todayList);
    }
  };

  const markAsDone = async (id) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'completed' })
      .eq('id', id);

    if (error) alert('Lỗi: ' + error.message);
    else fetchMyAppointments();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <Calendar className="w-8 h-8" />
        Lịch hẹn của tôi
      </h1>

      {/* Lịch hôm nay */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Hôm nay ({todayAppointments.length})
        </h2>
        <div className="space-y-4">
          {todayAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-400">
              Hôm nay chưa có lịch hẹn nào
            </div>
          ) : (
            todayAppointments.map((appt) => (
              <div key={appt.id} className="bg-white rounded-3xl p-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-purple-600 w-12">
                    {appt.time}
                  </div>
                  <div>
                    <div className="font-semibold">{appt.customers?.name}</div>
                    <div className="text-sm text-gray-500">{appt.services?.name}</div>
                  </div>
                </div>
                <button
                  onClick={() => markAsDone(appt.id)}
                  className="bg-green-500 text-white px-6 py-2 rounded-3xl flex items-center gap-2 hover:bg-green-600 transition"
                >
                  <CheckCircle className="w-5 h-5" />
                  Hoàn thành
                </button>
              </div>
            ))
          )}
        </div>
      </div>
{/* Tất cả lịch hẹn */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Tất cả lịch hẹn</h2>
        <div className="bg-white rounded-3xl shadow divide-y">
          {appointments.map((appt) => (
            <div key={appt.id} className="p-5 flex justify-between items-center">
              <div>
                <div className="font-medium">{appt.date} • {appt.time}</div>
                <div className="text-sm">{appt.customers?.name} - {appt.services?.name}</div>
              </div>
              <div className={`px-4 py-1 rounded-3xl text-xs font-medium ${appt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {appt.status === 'completed' ? 'Đã xong' : 'Chưa thực hiện'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}