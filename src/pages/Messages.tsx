import { Search, AlertTriangle, MessageSquarePlus, Filter, CheckCircle2, User, Send, Paperclip, Smile } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import React, { useState, useEffect, useRef } from 'react';
import { chatService, Chat, ChatMessage } from '../services/chatService';

export default function Messages() {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = chatService.getChats(user.uid, (fetchedChats) => {
      setChats(fetchedChats);
      
      // Handle activeChatId from navigation state
      const stateActiveChatId = location.state?.activeChatId;
      if (stateActiveChatId && !selectedChatId) {
        setSelectedChatId(stateActiveChatId);
      }
    });
    return unsubscribe;
  }, [user, location.state, selectedChatId]);

  useEffect(() => {
    if (!selectedChatId) return;
    const unsubscribe = chatService.getMessages(selectedChatId, (fetchedMessages) => {
      setMessages(fetchedMessages);
    });
    return unsubscribe;
  }, [selectedChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChatId || !user) return;
    
    try {
      await chatService.sendMessage(selectedChatId, user.uid, messageText);
      setMessageText('');
    } catch (error) {
      toast.error('Mesaj gönderilemedi.');
    }
  };

  const selectedChat = chats.find(c => c.id === selectedChatId);
  const otherParticipantId = selectedChat?.participants.find(p => p !== user?.uid);
  const otherParticipantName = otherParticipantId ? selectedChat?.participantNames?.[otherParticipantId] : 'User';
  const otherParticipantAvatar = otherParticipantId ? selectedChat?.participantAvatars?.[otherParticipantId] : '';

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Red Warning Banner */}
      <div className="bg-[#ff4747]/10 border border-[#ff4747]/20 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="text-[#ff4747] shrink-0 mt-0.5" />
        <div>
          <h3 className="text-[#ff4747] font-bold">Önemli Uyarı!</h3>
          <p className="text-gray-300 text-sm">Site dışı iletişim kurmak alışveriş güvenliğini sağlayamayacağımız için <span className="text-[#ff4747] underline">yasaktır</span>.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[700px]">
        {/* Sidebar */}
        <div className="w-full md:w-[350px] flex flex-col gap-4">
          <button 
            onClick={() => toast.success('Yeni sohbet başlatmak için bir ilana gidip satıcıya mesaj gönderin.')}
            className="w-full bg-[#5b68f6]/20 hover:bg-[#5b68f6]/30 text-[#60a5fa] py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border border-[#5b68f6]/30"
          >
            <MessageSquarePlus className="w-5 h-5" />
            YENİ SOHBET OLUŞTUR
          </button>

          <div className="flex gap-2">
            <button className="bg-[#5b68f6] p-3 rounded-lg text-white hover:bg-[#4a55d6] transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Sohbet ara.." 
                className="w-full bg-[#232736] border border-white/5 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 bg-[#232736] rounded-lg border border-white/5 overflow-y-auto">
            {chats.length > 0 ? chats.map(chat => {
              const otherId = chat.participants.find(p => p !== user.uid);
              const name = otherId ? chat.participantNames?.[otherId] : 'User';
              const avatar = otherId ? chat.participantAvatars?.[otherId] : '';
              
              return (
                <div 
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors flex items-start gap-3 ${selectedChatId === chat.id ? 'bg-white/5 border-l-2 border-l-[#5b68f6]' : ''}`}
                >
                  <div className="relative">
                    {avatar ? (
                      <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center text-white text-xs font-bold">
                        {(name || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#232736]"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium truncate text-blue-400">{name}</span>
                      <span className="text-xs text-gray-500">
                        {chat.lastMessageAt?.toDate ? new Date(chat.lastMessageAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{chat.lastMessage || 'Henüz mesaj yok'}</p>
                  </div>
                </div>
              );
            }) : (
              <div className="p-8 text-center text-gray-500 text-sm">Henüz bir sohbetiniz bulunmuyor.</div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 bg-[#232736] rounded-lg border border-white/5 flex flex-col">
          {selectedChatId ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {otherParticipantAvatar ? (
                    <img src={otherParticipantAvatar} className="w-10 h-10 rounded-full" alt="" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center text-white text-xs font-bold">
                      {(otherParticipantName || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="text-white font-bold">{otherParticipantName}</div>
                    <div className="text-xs text-emerald-500">Çevrimiçi</div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => {
                  const isMe = msg.senderId === user.uid;
                  const showDate = idx === 0 || (msg.createdAt?.toDate && messages[idx-1].createdAt?.toDate && 
                    new Date(msg.createdAt.toDate()).toDateString() !== new Date(messages[idx-1].createdAt.toDate()).toDateString());

                  return (
                    <React.Fragment key={msg.id || idx}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="bg-[#1a1d27] text-gray-500 text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                            {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleDateString() : 'Bugün'}
                          </span>
                        </div>
                      )}
                      <div className={`flex flex-col gap-1 max-w-[80%] ${isMe ? 'ml-auto items-end' : 'items-start'}`}>
                        <div className={`p-3 rounded-2xl text-sm ${isMe ? 'bg-[#5b68f6] text-white rounded-tr-none' : 'bg-[#2b3142] text-gray-200 rounded-tl-none'}`}>
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-500">
                          {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-[#1a1d27]/50">
                <div className="flex items-center gap-3">
                  <button type="button" className="text-gray-400 hover:text-white transition-colors p-2">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="Mesajınızı yazın..." 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full bg-[#232736] border border-white/10 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                    />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button type="submit" className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white p-3 rounded-full transition-colors shadow-lg shadow-[#5b68f6]/20">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              
              <h2 className="text-xl font-bold text-white mb-4">Önemli Bilgilendirme</h2>
              
              <div className="space-y-4 text-sm text-gray-400 max-w-2xl">
                <p>
                  Mesajlaşma sistemi üzerinden size ulaşıp ilanınızı satın aldım diyen kişilere itibar etmeyiniz ve canlı desteğe raporlayınız. <span className="text-[#60a5fa] font-semibold">itemsatış sizinle hiçbir şekilde Chat, Facebook veya Instagram üzerinden iletişime geçmez!</span>
                </p>
                
                <p>
                  İlanınızın satıldığını nasıl anlayabilirsiniz?<br/>
                  Size ITEM SATIS başlığıyla SMS, no-reply@itemsatis.com adresinden mail ve site içerisindeki bildirimlerim sayfanızdan ulaşabileceğiniz teslimat mesajı gönderiyoruz. Bunun haricinde bir yerden gelen mesajı dikkate almayınız.
                </p>
                
                <p className="text-[#60a5fa] font-semibold">
                  LÜTFEN sizinle ilanı satın aldım diyerek iletişime geçen kişilere prim vermeyiniz ve destek ekibine bildiriniz! <span className="text-gray-400 font-normal">Sizlerin de desteğiyle daima güvenli bir alışveriş platformu olmaya devam edeceğiz.</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
