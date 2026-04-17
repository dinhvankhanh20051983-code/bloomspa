import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Star, Send, Smile } from 'lucide-react';

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('feedbacks')
      .insert([{
        rating: rating,
        comment: comment,
        customer_id: 1 // Demo - sau này lấy từ localStorage
      }]);

    if (error) {
      alert('Lỗi khi gửi đánh giá: ' + error.message);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <Smile className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-purple-700">Cảm ơn bạn!</h2>
        <p className="text-gray-500 mt-2">Đánh giá của bạn đã được ghi nhận.</p>
        <p className="text-sm text-gray-400 mt-8">Chúng tôi sẽ cải thiện dịch vụ dựa trên phản hồi của bạn.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <Star className="w-8 h-8" />
        Đánh giá dịch vụ
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Rating stars */}
        <div>
          <p className="text-gray-600 mb-3">Bạn hài lòng với buổi trị liệu hôm nay bao nhiêu?</p>
          <div className="flex gap-2 justify-center">
            {[1,2,3,4,5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-5xl transition ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">{rating} sao</p>
        </div>

        {/* Comment */}
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Bạn thích gì nhất? Có gì cần cải thiện không?"
            rows="5"
            className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:border-purple-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-purple-600 text-white text-lg font-medium rounded-3xl flex items-center justify-center gap-3 hover:bg-purple-700 transition"
        >
          <Send className="w-6 h-6" />
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
}