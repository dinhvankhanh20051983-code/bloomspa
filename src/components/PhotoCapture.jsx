import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function PhotoCapture({ apt, user, onClose, onDone }) {
  const [beforeImg, setBeforeImg] = useState(null);
  const [afterImg, setAfterImg] = useState(null);
  const [note, setNote] = useState("");
  const [step, setStep] = useState("before");

  const handleFile = (e, setImage) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const savePhotos = async () => {
    await supabase.from('photo_sessions').insert({
      cust_id: apt.cust_id,
      apt_id: apt.id,
      package_id: apt.pkg_id,
      date: apt.date,
      before_img: beforeImg,
      after_img: afterImg,
      note: note
    });
    await supabase.from('appointments').update({ status: 'done' }).eq('id', apt.id);
    onDone();
  };

  return (
    <div className="fixed inset-0 bg-[#f4f6f9] z-50 flex flex-col max-w-[480px] mx-auto">
      <div className="bg-gradient-to-r from-[#0f2027] to-[#2c5364] text-white p-4 flex items-center gap-3">
        <button onClick={onClose} className="text-2xl">←</button>
        <div className="flex-1 font-bold">📸 Ảnh Trước & Sau</div>
      </div>

      <div className="flex border-b bg-white">
        {["before", "after", "confirm"].map(s => (
          <div key={s} className={`flex-1 text-center py-3 font-medium ${step === s ? "border-b-2 border-[#38b2ac] text-[#38b2ac]" : "text-gray-400"}`}>
            {s === "before" ? "📷 Trước" : s === "after" ? "✨ Sau" : "✅ Xác nhận"}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-6">
        {step === "before" && (
          <div>
            <input type="file" accept="image/*" capture="environment" onChange={e => handleFile(e, setBeforeImg)} className="hidden" id="beforeInput" />
            <label htmlFor="beforeInput" className="block w-full text-center py-12 border-2 border-dashed border-amber-300 rounded-3xl cursor-pointer">
              {beforeImg ? <img src={beforeImg} className="max-h-80 mx-auto rounded-2xl" /> : <div className="text-6xl mb-4">📷</div>}
            </label>
            <button onClick={() => beforeImg && setStep("after")} className="mt-8 w-full py-5 bg-[#38b2ac] text-white rounded-3xl font-semibold">Tiếp tục → Ảnh SAU</button>
          </div>
        )}
        {step === "after" && (
          <div>
            <input type="file" accept="image/*" capture="environment" onChange={e => handleFile(e, setAfterImg)} className="hidden" id="afterInput" />
            <label htmlFor="afterInput" className="block w-full text-center py-12 border-2 border-dashed border-green-300 rounded-3xl cursor-pointer">
              {afterImg ? <img src={afterImg} className="max-h-80 mx-auto rounded-2xl" /> : <div className="text-6xl mb-4">📷</div>}
            </label>
<button onClick={() => afterImg && setStep("confirm")} className="mt-8 w-full py-5 bg-[#38b2ac] text-white rounded-3xl font-semibold">Tiếp tục → Xác nhận</button>
          </div>
        )}
        {step === "confirm" && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div><div className="text-xs text-red-500 mb-2">TRƯỚC</div>{beforeImg && <img src={beforeImg} className="rounded-2xl" />}</div>
              <div><div className="text-xs text-green-500 mb-2">SAU</div>{afterImg && <img src={afterImg} className="rounded-2xl" />}</div>
            </div>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Ghi chú kết quả" rows="4" className="w-full p-4 border rounded-3xl" />
            <button onClick={savePhotos} className="mt-8 w-full py-5 bg-[#38b2ac] text-white rounded-3xl font-semibold">💾 Lưu & Hoàn thành</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoCapture;