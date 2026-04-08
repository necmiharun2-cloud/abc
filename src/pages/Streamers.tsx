import { Users, Star, MessageSquare, Play, Heart } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Streamers() {
  const [streamers, setStreamers] = useState([
    { id: 1, name: 'GamerX', avatar: 'https://picsum.photos/seed/u1/100/100', followers: '1.2M', platform: 'Twitch', status: 'Canlı', game: 'Valorant', isFollowing: false },
    { id: 2, name: 'ProPlayer', avatar: 'https://picsum.photos/seed/u2/100/100', followers: '850K', platform: 'YouTube', status: 'Canlı', game: 'CS2', isFollowing: false },
    { id: 3, name: 'NoobMaster', avatar: 'https://picsum.photos/seed/u3/100/100', followers: '450K', platform: 'Twitch', status: 'Çevrimdışı', game: 'LoL', isFollowing: false },
    { id: 4, name: 'StreamQueen', avatar: 'https://picsum.photos/seed/u4/100/100', followers: '2.5M', platform: 'TikTok', status: 'Canlı', game: 'Sohbet', isFollowing: false },
  ]);

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  const handleFollow = (id: number) => {
    setStreamers(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = !s.isFollowing;
        toast.success(newStatus ? `${s.name} takip edildi!` : `${s.name} takipten çıkarıldı.`);
        return { ...s, isFollowing: newStatus };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#232736] rounded-2xl p-10 border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#5b68f6]" />
            <h1 className="text-3xl font-bold text-white">Yayıncılar & Partnerler</h1>
          </div>
          <p className="text-gray-400 max-w-xl">İtemsatış partner yayıncılarını keşfedin, canlı yayınlarını takip edin ve özel çekilişlere katılın!</p>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10">
          <Play className="w-48 h-48 text-white fill-current" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {streamers.map((streamer) => (
          <div key={streamer.id} className="bg-[#232736] rounded-xl border border-white/5 p-6 flex flex-col items-center text-center hover:border-[#5b68f6]/50 transition-all group">
            <div className="relative mb-4">
              <img src={streamer.avatar} alt={streamer.name} className="w-24 h-24 rounded-full border-4 border-[#1a1d27] group-hover:border-[#5b68f6] transition-colors" />
              {streamer.status === 'Canlı' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Canlı
                </div>
              )}
            </div>
            
            <h3 className="text-white font-bold text-lg mb-1">{streamer.name}</h3>
            <p className="text-gray-500 text-xs mb-4">{streamer.game} • {streamer.platform}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-white font-bold text-sm">{streamer.followers}</span>
                <span className="text-gray-500 text-[10px]">Takipçi</span>
              </div>
              <div className="w-px h-6 bg-white/5"></div>
              <div className="flex flex-col items-center">
                <span className="text-white font-bold text-sm">24</span>
                <span className="text-gray-500 text-[10px]">Çekiliş</span>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <button 
                onClick={() => handleFollow(streamer.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 ${streamer.isFollowing ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#5b68f6] hover:bg-[#4a55d6] text-white'}`}
              >
                <Star className={`w-3.5 h-3.5 ${streamer.isFollowing ? 'fill-current' : ''}`} />
                {streamer.isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
              </button>
              <button 
                onClick={() => handleComingSoon('Mesaj Gönder')}
                className="flex-1 bg-[#2b3142] hover:bg-[#32394d] text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Mesaj
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#232736] to-[#1a1d27] rounded-xl border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#5b68f6]/20 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-[#5b68f6]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Yayıncı Başvurusu Yap</h2>
            <p className="text-gray-400 text-sm">Siz de İtemsatış partneri olmak ve avantajlardan yararlanmak ister misiniz?</p>
          </div>
        </div>
        <button 
          onClick={() => handleComingSoon('Yayıncı Başvurusu')}
          className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-xl font-bold transition-colors"
        >
          Hemen Başvur
        </button>
      </div>
    </div>
  );
}
