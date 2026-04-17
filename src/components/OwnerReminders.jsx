import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Bell, Calendar, Send, Clock } from 'lucide-react';

export default function OwnerReminders() {
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    send_date: '',
    send_time: ''
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .order('send_date');

    if (error) console.error(error);
    else setReminders(data || []);
  };

  const handleCreateReminder = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('reminders')
      .insert([newReminder]);

    if (error) alert('Lỗi: ' + error.message);
    else {
      alert('✅ Đã tạo nhắc lịch!');
      setShowForm(false);
      setNewReminder({ title: '', description: '', send_date: '', send_time: '' });
      fetchReminders();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <Bell className="w-8 h-8" />
          Nhắc lịch tự động
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-3xl flex items-center gap-2"
        >
          <Send className="w-5 h-5" />
          Tạo nhắc lịch
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {reminders.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Chưa có nhắc lịch nào</p>
          </div>
        ) : (
          <div className="divide-y">
            {reminders.map((r) => (
              <div key={r.id} className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <div>
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-sm text-gray-500">{r.description}</div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="flex items-center gap-1 text-purple-600">
                    <Clock className="w-4 h-4" />
                    {r.send_date} {r.send_time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal tạo nhắc lịch */}
      {showForm && (
<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 p-6">
            <h2 className="text-2xl font-bold mb-6">Tạo nhắc lịch mới</h2>
            <form onSubmit={handleCreateReminder} className="space-y-4">
              <input
                type="text"
                placeholder="Tiêu đề nhắc lịch"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                required
              />
              <textarea
                placeholder="Nội dung nhắc"
                value={newReminder.description}
                onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl h-24"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newReminder.send_date}
                  onChange={(e) => setNewReminder({ ...newReminder, send_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                  required
                />
                <input
                  type="time"
                  value={newReminder.send_time}
                  onChange={(e) => setNewReminder({ ...newReminder, send_time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-purple-600 text-white rounded-3xl">Tạo nhắc lịch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}