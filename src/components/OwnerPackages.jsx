import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function OwnerPackages() {
  const [packages, setPackages] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('packages').select('*');
      setPackages(data || []);
    };
    load();
  }, []);

  const savePackage = async () => {
    if (!editing) return;
    if (editing.id) {
      await supabase.from('packages').update(editing).eq('id', editing.id);
    } else {
      await supabase.from('packages').insert(editing);
    }
    setEditing(null);
    // Reload
    const { data } = await supabase.from('packages').select('*');
    setPackages(data || []);
  };

  const addNew = () => {
    setEditing({ name: "", emoji: "💆", price: 0, sessions: 1, duration: 60 });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">💆 Gói dịch vụ</h2>
        <button onClick={addNew} className="bg-[#7c5cbf] text-white px-6 py-3 rounded-3xl">+ Thêm gói</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-3xl p-6 shadow flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{pkg.emoji}</span>
              <div>
                <div className="font-semibold">{pkg.name}</div>
                <div className="text-[#7c5cbf] font-bold">{pkg.price.toLocaleString('vi-VN')}đ • {pkg.sessions} buổi</div>
              </div>
            </div>
            <button onClick={() => setEditing(pkg)} className="text-[#7c5cbf]">✏️</button>
          </div>
        ))}
      </div>

      {/* Modal chỉnh sửa */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-8">
            <h3 className="text-xl font-bold mb-6">Chỉnh sửa gói dịch vụ</h3>
            <input value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} placeholder="Tên gói" className="w-full p-4 border rounded-3xl mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <input value={editing.emoji} onChange={e => setEditing({...editing, emoji: e.target.value})} placeholder="Emoji" className="w-full p-4 border rounded-3xl text-center text-3xl" />
              <input type="number" value={editing.price} onChange={e => setEditing({...editing, price: Number(e.target.value)})} placeholder="Giá" className="w-full p-4 border rounded-3xl" />
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setEditing(null)} className="flex-1 py-4 bg-gray-100 rounded-3xl">Huỷ</button>
<button onClick={savePackage} className="flex-1 py-4 bg-[#7c5cbf] text-white rounded-3xl">Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerPackages;