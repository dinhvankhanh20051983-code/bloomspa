import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function CustAppts() {
  const [appointments, setAppointments] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    fetchCustomerAppointments();
  }, []);

  const fetchCustomerAppointments = async () => {
    // Demo: lấy theo customer_id (sau này sẽ lấy từ localStorage)
    const { data, error } = await supabase
      .from('appointments')
      .select('*, services(name)')
      .order('date', { ascending: false });

    if (error) console.error(error);
    else {
      setAppointments(data || []);

      const today = new Date().toISOString().split('T')[0];
      const upcomingList = data.filter(a => a.date >= today);
      const pastList = data.filter(a => a.date < today);

      setUpcoming(upcomingList);
      setPast(pastList);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <Calendar className="w-8 h-8" />
        Lịch hẹn của tôi
      </h1>

      {/* Lịch hẹn sắp tới */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-600">
          <AlertCircle className="w-5 h-5" />
          Sắp tới ({upcoming.length})
        </h2>
        <div className="space-y-4">
          {upcoming.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-400">
              Bạn chưa có lịch hẹn nào sắp tới
            </div>
          ) : (
            upcoming.map((appt) => (
              <div key={appt.id} className="bg-white rounded-3xl p-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-purple-600 w-14 text-center">
                    {appt.date?.slice(8,10)}
                  </div>
                  <div>
                    <div className="font-semibold">{appt.services?.name}</div>
                    <div className="text-sm text-gray-500">{appt.date} • {appt.time}</div>
                  </div>
                </div>
                <div className="text-purple-600 font-medium">Đang chờ</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lịch sử đã qua */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Lịch sử ({past.length})
        </h2>
        <div className="bg-white rounded-3xl shadow divide-y">
          {past.map((appt) => (
            <div key={appt.id} className="p-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div>
<div className="font-medium">{appt.date} • {appt.time}</div>
                  <div className="text-sm text-gray-500">{appt.services?.name}</div>
                </div>
              </div>
              <div className="text-green-600 font-medium text-sm">Đã hoàn thành</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}