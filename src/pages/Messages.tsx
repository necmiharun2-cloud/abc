import { Search, AlertTriangle, MessageSquarePlus, Filter, CheckCircle2, User, Send, Paperclip, Smile } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import React, { useState } from 'react';

export default function Messages() {
  const { user, loading } = useAuth();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  const chats = [
    { id: 1, name: 'itemSatış Bot', avatar: 'https://picsum.photos/seed/bot/40/40', time: '16:27', lastMessage: '🎉 3 Kişiye MisBits Steam ...', isBot: true, online: true },
    { id: 2, name: 'Klann0', avatar: 'https://picsum.photos/seed/user/40/40', time: '19:08', lastMessage: 's.a buralarda mısın', isBot: false, online: true },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    toast.success('Mesaj gönderildi! (Demo modunda mesajlar kaydedilmez)');
    setMessageText('');
  };

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
            onClick={() => handleComingSoon('Yeni Sohbet')}
            className="w-full bg-[#5b68f6]/20 hover:bg-[#5b68f6]/30 text-[#60a5fa] py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border border-[#5b68f6]/30"
          >
            <MessageSquarePlus className="w-5 h-5" />
            YENİ SOHBET OLUŞTUR
          </button>

          <div className="flex gap-2">
            <button 
              onClick={() => handleComingSoon('Filtreleme')}
              className="bg-[#5b68f6] p-3 rounded-lg text-white hover:bg-[#4a55d6] transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Sohbet ara.." 
                onKeyDown={(e) => e.key === 'Enter' && handleComingSoon('Sohbet Arama')}
                className="w-full bg-[#232736] border border-white/5 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 bg-[#232736] rounded-lg border border-white/5 overflow-y-auto">
            {chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors flex items-start gap-3 ${selectedChat === chat.id ? 'bg-white/5 border-l-2 border-l-[#5b68f6]' : ''}`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#1a1d27] flex items-center justify-center">
                    <img src={chat.avatar} alt={chat.name} className="rounded-full" />
                  </div>
                  {chat.isBot ? (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  ) : chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#232736]"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-medium truncate ${chat.isBot ? 'text-white' : 'text-blue-400'}`}>{chat.name}</span>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 bg-[#232736] rounded-lg border border-white/5 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={chats.find(c => c.id === selectedChat)?.avatar} className="w-10 h-10 rounded-full" alt="" />
                  <div>
                    <div className="text-white font-bold">{chats.find(c => c.id === selectedChat)?.name}</div>
                    <div className="text-xs text-emerald-500">Çevrimiçi</div>
                  </div>
                </div>
                <button onClick={() => handleComingSoon('Sohbet Ayarları')} className="text-gray-400 hover:text-white transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="flex justify-center">
                  <span className="bg-[#1a1d27] text-gray-500 text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">Bugün</span>
                </div>
                
                <div className="flex flex-col gap-2 max-w-[80%]">
                  <div className="bg-[#2b3142] text-gray-200 p-3 rounded-2xl rounded-tl-none text-sm">
                    {chats.find(c => c.id === selectedChat)?.lastMessage}
                  </div>
                  <span className="text-[10px] text-gray-500 ml-1">{chats.find(c => c.id === selectedChat)?.time}</span>
                </div>

                <div className="flex flex-col gap-2 max-w-[80%] ml-auto items-end">
                  <div className="bg-[#5b68f6] text-white p-3 rounded-2xl rounded-tr-none text-sm">
                    Merhaba, nasıl yardımcı olabilirim?
                  </div>
                  <span className="text-[10px] text-gray-500 mr-1">19:10</span>
                </div>
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-[#1a1d27]/50">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleComingSoon('Dosya Ekle')} className="text-gray-400 hover:text-white transition-colors p-2">
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
                    <button type="button" onClick={() => handleComingSoon('Emoji')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
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
