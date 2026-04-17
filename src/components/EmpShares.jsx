import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function EmpShares({ user }) {
  const [shares, setShares] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('shares_transactions')
        .select('amount')
        .eq('to_id', user.id);
      const total = data ? data.reduce((sum, t) => sum + t.amount, 0) : 0;
      setShares(total);
    };
    load();
  }, [user.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🏅 Cổ phần của tôi</h2>
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#3d2a6e] text-white rounded-3xl p-8 text-center">
        <div className="text-6xl font-bold">{shares}</div>
        <div className="text-sm opacity-75">cổ phần</div>
      </div>
    </div>
  );
}

export default EmpShares;