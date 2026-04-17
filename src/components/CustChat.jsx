import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Send, MessageCircle } from 'lucide-react';

export default function CustChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId] = useState('owner_cust_1'); // Demo room - sau này sẽ dùng customer_id
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel('cust-chat')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, fetchMessages)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) console.error(error);
    else setMessages(data || []);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('chats')
      .insert([{
        room_id: roomId,
        sender: 'customer',
        message: newMessage.trim()
      }]);

    if (error) alert('Lỗi gửi tin: ' + error.message);
    else {
      setNewMessage('');
      fetchMessages();
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-purple-700 text-white p-5 flex items-center gap-3">
        <MessageCircle className="w-6 h-6" />
        <div>
          <div className="font-semibold">Chat với chủ tiệm</div>
          <div className="text-xs opacity-75">BloomSpa & Wellness</div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
            <MessageCircle className="w-16 h-16 mb-4 opacity-30" />
            <p>Chưa có tin nhắn nào</p>
            <p className="text-sm">Hãy gửi tin nhắn đầu tiên cho chủ tiệm!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-3xl ${
                  msg.sender === 'customer'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
<p className="text-[10px] opacity-60 mt-1 text-right">
                  {new Date(msg.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={sendMessage} className="bg-white border-t p-4 flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-5 py-4 bg-gray-100 rounded-3xl focus:outline-none focus:bg-white border border-transparent focus:border-purple-300"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white w-14 h-14 rounded-3xl flex items-center justify-center hover:bg-purple-700 transition"
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}