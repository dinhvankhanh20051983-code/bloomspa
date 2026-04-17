import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function FeedbackForm({ appointment, onClose, onSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    await supabase.from('feedbacks').insert({
      customer_id: appointment.cust_id,
      appointment_id: appointment.id,
      rating,
      comment
    });

    await supabase.rpc('award_loyalty_points', {
      cid: appointment.cust_id,
      pts: 50,
      reason: 'Feedback sau buổi trị liệu'
    });

    setSubmitted(true);
    setTimeout(() => {
      onSubmitted();
      onClose();
    }, 1800);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-2xl font-bold">Cảm ơn bạn!</h3>
        <p className="text-gray-600 mt-3">Bạn đã nhận +50 điểm Loyalty</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Bạn hài lòng với buổi trị liệu hôm nay?</h2>
      <div className="flex justify-center gap-2 mb-8">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`text-5xl transition ${rating >= n ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Nhận xét của bạn..."
        rows="4"
        className="w-full p-4 border rounded-3xl mb-8"
      />
      <button onClick={submit} className="w-full py-5 bg-[#7c5cbf] text-white rounded-3xl font-semibold">
        Gửi đánh giá
      </button>
    </div>
  );
}

export default FeedbackForm;