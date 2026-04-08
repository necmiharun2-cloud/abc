import { Zap, ShieldCheck, CreditCard, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TopUp() {
  const products = [
    { id: 1, title: 'Valorant 1200 VP', price: 245.00, image: 'https://picsum.photos/seed/vp1/300/200' },
    { id: 2, title: 'PUBG Mobile 660 UC', price: 350.00, image: 'https://picsum.photos/seed/uc1/300/200' },
    { id: 3, title: 'Roblox 800 Robux', price: 180.00, image: 'https://picsum.photos/seed/rb1/300/200' },
    { id: 4, title: 'League of Legends 1600 RP', price: 290.00, image: 'https://picsum.photos/seed/rp1/300/200' },
  ];

  const handleBuy = (title: string) => {
    toast.success(`${title} başarıyla satın alındı!`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Zap className="w-8 h-8" />
            E-Pin & Top-Up
          </h1>
          <p className="max-w-xl opacity-90">Favori oyunlarınız için en ucuz E-Pin ve bakiye yükleme servisleri burada. 7/24 anında teslimat.</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              Resmi Distribütör
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <CreditCard className="w-4 h-4" />
              Tüm Kartlar Geçerli
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center">
            <img src="https://picsum.photos/seed/v1/48/48" className="w-12 h-12" alt="" />
          </div>
          <div className="w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center">
            <img src="https://picsum.photos/seed/p1/48/48" className="w-12 h-12" alt="" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-[#232736] rounded-xl border border-white/5 p-5 hover:border-emerald-500/50 transition-all group">
            <img src={p.image} alt={p.title} className="w-full aspect-video object-cover rounded-lg mb-4" />
            <h3 className="text-white font-bold text-sm mb-4">{p.title}</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-emerald-400 font-bold text-lg">{p.price.toFixed(2)} ₺</span>
            </div>
            <button 
              onClick={() => handleBuy(p.title)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Hemen Al
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
