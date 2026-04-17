import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import TreatmentHistoryViewer from './TreatmentHistoryViewer';

function OwnerCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('customers').select('*');
      setCustomers(data || []);
    };
    load();
  }, []);

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🌸 Khách hàng</h2>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm khách hàng..." className="w-full p-4 border rounded-3xl mb-6" />

      <div className="space-y-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-3xl p-6 shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-gray-500">{c.phone}</div>
            </div>
            <button onClick={() => setViewing(c.id)} className="text-green-600 text-2xl">📸</button>
          </div>
        ))}
      </div>

      {viewing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-auto">
            <TreatmentHistoryViewer custId={viewing} />
            <button onClick={() => setViewing(null)} className="mt-6 w-full py-4 bg-gray-100 rounded-3xl">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerCustomers;