import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function CustRefer({ user }) {
  const [refCode, setRefCode] = useState("");
  const [myRefs, setMyRefs] = useState([]);

  useEffect(() => {
    const code = "SPA" + String(user.id).padStart(4, "0");
    setRefCode(code);
  }, [user.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🎁 Giới thiệu bạn bè</h2>
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-3xl p-8 text-center mb-8">
        <div className="text-sm opacity-90">Mã giới thiệu của bạn</div>
        <div className="text-5xl font-mono font-bold tracking-widest mt-3">{refCode}</div>
      </div>
    </div>
  );
}

export default CustRefer;