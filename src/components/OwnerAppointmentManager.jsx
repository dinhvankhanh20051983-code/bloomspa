import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function OwnerAppointmentManager() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppts = async () => {
      const { data } = await supabase.from('appointments').select(`
        *,
        customers(name, phone),
        packages(name, emoji)
      `).order('date', { ascending: false });
      setAppointments(data || []);
    };
    loadAppts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📅 Quản lý lịch hẹn</h2>
      <div className="space-y-4">
        {appointments.map(apt => (
          <div key={apt.id} className="bg-white rounded-3xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <span className="text-xl">{apt.packages?.emoji}</span>
                <span className="font-semibold ml-3">{apt.packages?.name}</span>
              </div>
              <span className={`px-4 py-1 rounded-3xl text-xs ${apt.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {apt.status}
              </span>
            </div>
            <div className="mt-4 text-sm">
              {apt.customers?.name} • {apt.customers?.phone}
            </div>
            <div className="text-xs text-gray-400 mt-1">{apt.date} {apt.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerAppointmentManager;