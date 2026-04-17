import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Send, MessageCircle } from 'lucide-react';

export default function ChatRoom({ roomId = 'owner_cust_1', currentUser = 'customer' }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel(`chat-${roomId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'chats',
        filter: `room_id=eq.${roomId}`
      }, fetchMessages)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [roomId]);

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
        sender: currentUser,
        message: newMessage.trim()
      }]);

    if (error) alert('Lỗi gửi tin nhắn');
    else {
      setNewMessage('');
      fetchMessages();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-purple-700 text-white p-4 flex items-center gap-3">
        <MessageCircle className="w-6 h-6" />
        <div className="font-semibold">Chat trực tiếp</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-5 py-3 rounded-3xl ${msg.sender === currentUser ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-100 rounded-bl-none'}`}>
              <p>{msg.message}</p>
              <p className="text-xs opacity-70 text-right mt-1">
                {new Date(msg.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-5 py-4 bg-gray-100 rounded-3xl focus:outline-none focus:bg-white"
        />
        <button type="submit" className="bg-purple-600 text-white w-14 h-14 rounded-3xl flex items-center justify-center">
<Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}