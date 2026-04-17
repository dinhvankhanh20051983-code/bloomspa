import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import PhotoCapture from './PhotoCapture';

function EmpAppts({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedApt, setSelectedApt] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('appointments')
        .select(`
          *,
          customers(name, phone),
          packages(name, emoji)
        `)
        .eq('emp_id', user.id)
        .order('date', { ascending: true });
      setAppointments(data || []);
    };
    load();
  }, [user.id]);

  const markDone = async (apt) => {
    setSelectedApt(apt);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📅 Lịch hẹn của tôi</h2>

      <div className="space-y-4">
        {appointments.map(apt => (
          <div key={apt.id} className="bg-white rounded-3xl p-6 shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{apt.packages?.emoji}</span>
                <div>
                  <div className="font-semibold">{apt.packages?.name}</div>
                  <div className="text-sm text-gray-500">{apt.customers?.name}</div>
                </div>
              </div>
              <button
                onClick={() => markDone(apt)}
                className="bg-green-500 text-white px-6 py-2 rounded-3xl text-sm"
              >
                Hoàn thành
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-4">{apt.date} • {apt.time}</div>
          </div>
        ))}
      </div>

      {selectedApt && (
        <PhotoCapture
          apt={selectedApt}
          user={user}
          onClose={() => setSelectedApt(null)}
          onDone={() => {
            setSelectedApt(null);
            // Reload list
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

export default EmpAppts;