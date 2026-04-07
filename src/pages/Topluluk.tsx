import { MessageSquare, TrendingUp, Users, Plus, Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Topluluk() {
  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  const handleTagClick = (tag: string) => {
    handleComingSoon(tag);
  };
  const posts = [
    { id: 1, author: 'GamerX', avatar: 'https://picsum.photos/seed/u1/40/40', time: '2 saat önce', title: 'Valorant yeni ajan hakkında ne düşünüyorsunuz?', content: 'Sizce yeni gelen ajan metayı nasıl etkileyecek? Yetenekleri çok güçlü duruyor...', likes: 24, comments: 12, category: 'Valorant' },
    { id: 2, author: 'ProPlayer', avatar: 'https://picsum.photos/seed/u2/40/40', time: '5 saat önce', title: 'CS2 FPS Drop sorunu çözümü', content: 'Son güncellemeden sonra FPS drop yaşayanlar için bulduğum birkaç çözüm yöntemini paylaşıyorum...', likes: 156, comments: 45, category: 'CS2' },
    { id: 3, author: 'NoobMaster', avatar: 'https://picsum.photos/seed/u3/40/40', time: '1 gün önce', title: 'En iyi F/P oyuncu faresi önerisi?', content: 'Maksimum 1000 TL bütçem var, FPS oyunları için fare arıyorum. Önerilerinizi bekliyorum.', likes: 8, comments: 32, category: 'Donanım' },
  ];

  const trending = [
    '#ValorantChampions', '#CS2Update', '#GTA6Fragman', '#Steamİndirimleri', '#LoLWorlds'
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Feed */}
      <div className="flex-1 space-y-6 min-w-0">
        <div className="flex items-center justify-between bg-[#232736] p-4 rounded-xl border border-white/5">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#5b68f6]" />
            Topluluk Akışı
          </h1>
          <button 
            onClick={() => handleComingSoon('Konu Aç')}
            className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Konu Aç
          </button>
        </div>

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-[#232736] p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="text-sm font-bold text-white">{post.author}</div>
                    <div className="text-xs text-gray-400">{post.time}</div>
                  </div>
                </div>
                <span className="bg-[#2b3142] text-gray-300 text-xs px-2.5 py-1 rounded-full">{post.category}</span>
              </div>
              
              <h2 className="text-lg font-bold text-white mb-2">{post.title}</h2>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.content}</p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleComingSoon('Beğen')}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-pink-500 transition-colors text-sm"
                >
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </button>
                <button 
                  onClick={() => handleComingSoon('Yorum Yap')}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-[#5b68f6] transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  {post.comments}
                </button>
                <button 
                  onClick={() => handleComingSoon('Paylaş')}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm ml-auto"
                >
                  <Share2 className="w-4 h-4" />
                  Paylaş
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="bg-[#232736] rounded-xl border border-white/5 p-5">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Yükselen Başlıklar
          </h3>
          <div className="space-y-3">
            {trending.map((tag, i) => (
              <button 
                key={i} 
                onClick={() => handleTagClick(tag)}
                className="block text-sm text-gray-400 hover:text-[#5b68f6] transition-colors text-left w-full"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#232736] rounded-xl border border-white/5 p-5">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            Popüler Gruplar
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/g${i}/40/40`} className="w-10 h-10 rounded-lg" alt="Group" />
                <div>
                  <div className="text-sm font-bold text-white">Grup Adı {i}</div>
                  <div className="text-xs text-gray-400">{i * 1200} Üye</div>
                </div>
                <button 
                  onClick={() => handleComingSoon('Gruba Katıl')}
                  className="ml-auto bg-[#2b3142] hover:bg-[#32394d] text-white text-xs px-3 py-1.5 rounded transition-colors"
                >
                  Katıl
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
