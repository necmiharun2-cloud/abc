import { Gift, CreditCard, ShieldCheck, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GiftCards() {
  const cards = [
    { id: 1, title: 'Netflix 100 TL Gift Card', price: 100.00, image: 'https://picsum.photos/seed/nf1/300/200' },
    { id: 2, title: 'Google Play 50 TL', price: 50.00, image: 'https://picsum.photos/seed/gp1/300/200' },
    { id: 3, title: 'App Store 100 TL', price: 100.00, image: 'https://picsum.photos/seed/as1/300/200' },
    { id: 4, title: 'Spotify 3 Aylık Premium', price: 120.00, image: 'https://picsum.photos/seed/sp1/300/200' },
  ];

  const handleBuy = (title: string) => {
    toast.success(`${title} başarıyla satın alındı!`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#232736] rounded-2xl p-10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Gift className="w-8 h-8 text-pink-500" />
            Hediye Kartları
          </h1>
          <p className="text-gray-400 max-w-xl">Netflix, Spotify, Google Play ve App Store hediye kartları en uygun fiyatlarla burada.</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-xs text-pink-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              Anında Teslimat
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-bold">
              <CreditCard className="w-4 h-4" />
              Güvenli Ödeme
            </div>
          </div>
        </div>
        <div className="flex -space-x-12">
          <div className="w-40 h-24 bg-gradient-to-br from-red-600 to-black rounded-xl shadow-2xl rotate-[-10deg] flex items-center justify-center font-bold text-white">NETFLIX</div>
          <div className="w-40 h-24 bg-gradient-to-br from-green-600 to-black rounded-xl shadow-2xl rotate-[10deg] flex items-center justify-center font-bold text-white">SPOTIFY</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.id} className="bg-[#232736] rounded-xl border border-white/5 p-5 hover:border-pink-500/50 transition-all group">
            <img src={c.image} alt={c.title} className="w-full aspect-video object-cover rounded-lg mb-4" />
            <h3 className="text-white font-bold text-sm mb-4">{c.title}</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-pink-400 font-bold text-lg">{c.price.toFixed(2)} ₺</span>
            </div>
            <button 
              onClick={() => handleBuy(c.title)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Satın Al
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
