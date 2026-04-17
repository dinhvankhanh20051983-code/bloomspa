import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

function ChatRoom({ roomId, myId, myName, partnerName, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase.from('chats').select('*').eq('room_id', roomId).order('time', { ascending: true });
      setMessages(data || []);
    };
    loadMessages();
  }, [roomId]);

  useEffect(() => {
    const channel = supabase.channel(`chat:${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats', filter: `room_id=eq.${roomId}` }, payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [roomId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await supabase.from('chats').insert({
      room_id: roomId,
      from_type: myId.includes("owner") ? "owner" : "customer",
      from_id: myId,
      from_name: myName,
      text: newMessage.trim(),
      time: new Date().toISOString()
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#f4f6f9]">
      <div className="bg-gradient-to-r from-[#7c5cbf] to-[#5a3d9e] text-white px-4 py-4 flex items-center gap-3">
        {onClose && <button onClick={onClose} className="text-3xl">←</button>}
        <div className="flex-1 font-bold text-lg">{partnerName}</div>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(msg => {
          const isMe = msg.from_id === myId;
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] px-5 py-3 rounded-3xl ${isMe ? "bg-[#7c5cbf] text-white" : "bg-white shadow-sm"}`}>
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
      <div className="p-4 bg-white border-t flex gap-3">
        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Nhập tin nhắn..." className="flex-1 border rounded-3xl px-6 py-4" />
        <button onClick={sendMessage} className="bg-[#7c5cbf] text-white w-12 h-12 rounded-3xl">➤</button>
      </div>
    </div>
  );
}

export default ChatRoom;