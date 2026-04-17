import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function OwnerEmployees() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('employees').select('*');
      setEmployees(data || []);
    };
    load();
  }, []);

  const save = async () => {
    if (editing.id) {
      await supabase.from('employees').update(editing).eq('id', editing.id);
    } else {
      await supabase.from('employees').insert(editing);
    }
    setEditing(null);
    const { data } = await supabase.from('employees').select('*');
    setEmployees(data || []);
  };

  const addNew = () => setEditing({ name: "", role: "", phone: "", pin: "1234", salary: 8000000 });

  return (
    <div className="p-4">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">👥 Nhân viên</h2>
        <button onClick={addNew} className="bg-[#7c5cbf] text-white px-6 py-3 rounded-3xl">+ Thêm</button>
      </div>

      <div className="space-y-4">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white rounded-3xl p-6 shadow flex justify-between">
            <div>
              <div className="font-semibold">{emp.name}</div>
              <div className="text-gray-500">{emp.role}</div>
            </div>
            <button onClick={() => setEditing(emp)} className="text-[#7c5cbf]">✏️</button>
          </div>
        ))}
      </div>

      {/* Modal edit */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-8">
            <h3 className="text-xl font-bold mb-6">Chỉnh sửa nhân viên</h3>
            <input value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full p-4 border rounded-3xl mb-4" placeholder="Họ tên" />
            <input value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})} className="w-full p-4 border rounded-3xl mb-4" placeholder="Chức vụ" />
            <div className="flex gap-4 mt-8">
              <button onClick={() => setEditing(null)} className="flex-1 py-4 bg-gray-100 rounded-3xl">Huỷ</button>
              <button onClick={save} className="flex-1 py-4 bg-[#7c5cbf] text-white rounded-3xl">Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerEmployees;