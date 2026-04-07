import { Newspaper, Clock, User, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    { id: 1, title: 'Valorant Yeni Ajan Rehberi: Tüm Yetenekler ve Stratejiler', excerpt: 'Yeni gelen ajan ile metayı nasıl domine edebilirsiniz? En iyi yetenek kombinasyonları ve harita bazlı stratejiler...', date: '2 saat önce', author: 'GamerX', image: 'https://picsum.photos/seed/b1/800/400' },
    { id: 2, title: 'CS2 FPS Artırma Yöntemleri: 2026 Güncel Rehber', excerpt: 'Counter Strike 2\'de daha yüksek FPS almak için yapmanız gereken tüm ayarlar. Başlatma seçeneklerinden NVIDIA ayarlarına kadar her şey...', date: '5 saat önce', author: 'ProPlayer', image: 'https://picsum.photos/seed/b2/800/400' },
    { id: 3, title: 'Steam İlkbahar İndirimleri Başladı: Alınması Gereken 10 Oyun', excerpt: 'Steam\'de büyük indirimler başladı! Bütçe dostu ve mutlaka oynamanız gereken en iyi 10 oyunu sizin için listeledik...', date: '1 gün önce', author: 'SteamExpert', image: 'https://picsum.photos/seed/b3/800/400' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-[#5b68f6]" />
          <h1 className="text-3xl font-bold text-white tracking-tight">Blog & Haberler</h1>
        </div>
        <div className="flex items-center gap-2 bg-[#232736] px-4 py-2 rounded-lg border border-white/5 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          Son Güncelleme: Bugün 14:30
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#232736] rounded-2xl border border-white/5 overflow-hidden hover:border-[#5b68f6]/50 transition-all group flex flex-col md:flex-row">
            <div className="md:w-1/3 relative overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#5b68f6] transition-colors">{post.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{post.excerpt}</p>
              </div>
              <button className="flex items-center gap-2 text-[#5b68f6] hover:text-[#4a55d6] font-bold text-sm transition-colors group/btn">
                Devamını Oku
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button className="bg-[#2b3142] hover:bg-[#32394d] text-white px-8 py-3 rounded-xl font-bold transition-colors border border-white/10">
          Daha Fazla Yükle
        </button>
      </div>
    </div>
  );
}
