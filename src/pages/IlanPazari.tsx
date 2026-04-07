import { Filter, Search, Folder, Banknote, User, Key, Star, Zap, ShieldCheck, Building2, RefreshCw } from 'lucide-react';
import ShowcaseListings from '../components/ShowcaseListings';
import CategoryListings from '../components/CategoryListings';

export default function IlanPazari() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Filters */}
      <div className="w-full md:w-[280px] shrink-0 space-y-4">
        <div className="bg-[#232736] rounded-xl border border-white/5 p-5">
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-6 border-b border-white/5 pb-4">
            <Filter className="w-5 h-5" />
            Filtrele
          </div>
          
          <div className="space-y-6">
            {/* Kategoriler */}
            <div>
              <div className="flex items-center gap-2 text-white font-bold mb-3">
                <Folder className="w-4 h-4 text-blue-400" />
                Kategoriler
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Kategori ara..." className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" />
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                <button className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-300 hover:text-white text-sm">
                  <img src="https://picsum.photos/seed/cat1/24/24" className="w-6 h-6 rounded-full" alt="" />
                  Diğer Ürün Satışları
                </button>
                <button className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-300 hover:text-white text-sm">
                  <img src="https://picsum.photos/seed/cat2/24/24" className="w-6 h-6 rounded-full" alt="" />
                  Valorant
                </button>
                <button className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-300 hover:text-white text-sm">
                  <img src="https://picsum.photos/seed/cat3/24/24" className="w-6 h-6 rounded-full" alt="" />
                  Roblox
                </button>
                <button className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-300 hover:text-white text-sm">
                  <img src="https://picsum.photos/seed/cat4/24/24" className="w-6 h-6 rounded-full" alt="" />
                  Discord
                </button>
              </div>
            </div>

            {/* Fiyat Aralığı */}
            <div>
              <div className="flex items-center gap-2 text-white font-bold mb-3">
                <Banknote className="w-4 h-4 text-emerald-400" />
                Fiyat Aralığı (₺)
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₺</span>
                  <input type="number" placeholder="En az" className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-7 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" />
                </div>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₺</span>
                  <input type="number" placeholder="En çok" className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-7 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" />
                </div>
              </div>
            </div>

            {/* Satıcı Filtrele */}
            <div>
              <div className="flex items-center gap-2 text-white font-bold mb-3">
                <User className="w-4 h-4 text-purple-400" />
                Satıcı Filtrele
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Satıcı adı..." className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" />
              </div>
            </div>

            {/* Kelime Filtrele */}
            <div>
              <div className="flex items-center gap-2 text-white font-bold mb-3">
                <Key className="w-4 h-4 text-orange-400" />
                Kelime Filtrele
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Arama kelimesi..." className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-white/20 bg-[#181b26] flex items-center justify-center group-hover:border-[#5b68f6] transition-colors shrink-0"></div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">İlan açıklamalarını dahil et</span>
              </label>
            </div>

            {/* Diğer Özellikler */}
            <div>
              <div className="flex items-center gap-2 text-white font-bold mb-3">
                <Star className="w-4 h-4 text-yellow-400" />
                Diğer Özellikler
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-2.5 rounded-lg bg-[#181b26] border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                  <div className="w-4 h-4 rounded border border-white/20 bg-[#232736] flex items-center justify-center shrink-0"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                  <span className="text-sm text-gray-300 font-medium">Çevrimiçi Satıcı</span>
                </label>
                <label className="flex items-center gap-3 p-2.5 rounded-lg bg-[#181b26] border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                  <div className="w-4 h-4 rounded border border-white/20 bg-[#232736] flex items-center justify-center shrink-0"></div>
                  <Zap className="w-4 h-4 text-yellow-500 shrink-0" />
                  <span className="text-sm text-gray-300 font-medium">Otomatik Teslimat</span>
                </label>
                <label className="flex items-center gap-3 p-2.5 rounded-lg bg-[#181b26] border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                  <div className="w-4 h-4 rounded border border-white/20 bg-[#232736] flex items-center justify-center shrink-0"></div>
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-sm text-gray-300 font-medium">Güvenilir Satıcı</span>
                </label>
                <label className="flex items-center gap-3 p-2.5 rounded-lg bg-[#181b26] border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                  <div className="w-4 h-4 rounded border border-white/20 bg-[#232736] flex items-center justify-center shrink-0"></div>
                  <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-sm text-gray-300 font-medium">Kurumsal Satıcı</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button className="w-full bg-gradient-to-r from-[#5b68f6] to-purple-600 hover:from-[#4a55d6] hover:to-purple-700 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-lg shadow-purple-500/20">
                Filtre Uygula
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-[#181b26] hover:bg-[#2b3142] border border-white/5 text-gray-300 hover:text-white font-medium py-3 rounded-lg text-sm transition-colors">
                <RefreshCw className="w-4 h-4" />
                Filtreleri Temizle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-8 min-w-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">İlan Pazarı</h1>
          <p className="text-sm text-gray-400">Binlerce ilan arasından aradığını bul veya hemen ilan ekle.</p>
        </div>
        
        <ShowcaseListings />
        
        <div className="pt-8 border-t border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">En Son Eklenen İlanlar</h2>
          <CategoryListings />
        </div>
      </div>
    </div>
  );
}
