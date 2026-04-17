import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

function CustChat({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const endRef = useRef(null);
  const roomId = `owner_cust_${user.id}`;

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('chats').select('*').eq('room_id', roomId).order('time');
      setMessages(data || []);
    };
    load();
  }, [roomId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!newMessage.trim()) return;
    await supabase.from('chats').insert({
      room_id: roomId,
      from_type: "customer",
      from_id: user.id,
      from_name: user.name,
      text: newMessage
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#f4f6f9]">
      <div className="bg-[#7c5cbf] text-white p-4">Chat với chủ tiệm</div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.from_type === "customer" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-5 py-3 rounded-3xl ${m.from_type === "customer" ? "bg-[#7c5cbf] text-white" : "bg-white"}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-4 bg-white border-t flex gap-3">
        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Nhập tin nhắn..." className="flex-1 border rounded-3xl px-6 py-4" />
        <button onClick={send} className="bg-[#7c5cbf] text-white w-12 h-12 rounded-3xl">➤</button>
      </div>
    </div>
  );
}

export default CustChat;