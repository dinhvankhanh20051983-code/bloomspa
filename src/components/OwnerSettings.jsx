import { useState } from 'react';

function OwnerSettings() {
  const [spaName, setSpaName] = useState("BloomSpa & Wellness");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">⚙️ Cài đặt</h2>
      <div className="bg-white rounded-3xl p-8 shadow">
        <label className="block text-sm font-medium mb-2">Tên tiệm</label>
        <input value={spaName} onChange={e => setSpaName(e.target.value)} className="w-full p-4 border rounded-3xl" />
        <button className="mt-8 w-full py-5 bg-[#7c5cbf] text-white rounded-3xl font-semibold">Lưu cài đặt</button>
      </div>
    </div>
  );
}

export default OwnerSettings;