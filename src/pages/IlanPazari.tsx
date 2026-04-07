import { Filter, Search, Folder, Banknote, User, Key, Star, Zap, ShieldCheck, Building2, RefreshCw } from 'lucide-react';
import ShowcaseListings from '../components/ShowcaseListings';
import CategoryListings from '../components/CategoryListings';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function IlanPazari() {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    seller: '',
    keyword: '',
    includeDescription: false,
    onlineOnly: false,
    autoDelivery: false,
    trustedOnly: false,
    corporateOnly: false
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    console.log('Applying filters:', filters);
    toast.success('Filtreler uygulandı! (Demo modunda sonuçlar değişmeyebilir)');
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      seller: '',
      keyword: '',
      includeDescription: false,
      onlineOnly: false,
      autoDelivery: false,
      trustedOnly: false,
      corporateOnly: false
    });
    toast.success('Filtreler temizlendi!');
  };

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
                <input 
                  type="text" 
                  placeholder="Kategori ara..." 
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" 
                />
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                {['Diğer Ürün Satışları', 'Valorant', 'Roblox', 'Discord'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => handleFilterChange('category', cat)}
                    className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm ${filters.category === cat ? 'bg-[#5b68f6]/20 text-white border border-[#5b68f6]/30' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    <img src={`https://picsum.photos/seed/${cat}/24/24`} className="w-6 h-6 rounded-full" alt="" />
                    {cat}
                  </button>
                ))}
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
                  <input 
                    type="number" 
                    placeholder="En az" 
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-7 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" 
                  />
                </div>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₺</span>
                  <input 
                    type="number" 
                    placeholder="En çok" 
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-7 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" 
                  />
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
                <input 
                  type="text" 
                  placeholder="Satıcı adı..." 
                  value={filters.seller}
                  onChange={(e) => handleFilterChange('seller', e.target.value)}
                  className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" 
                />
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
                <input 
                  type="text" 
                  placeholder="Arama kelimesi..." 
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange('keyword', e.target.value)}
                  className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors" 
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={filters.includeDescription}
                  onChange={(e) => handleFilterChange('includeDescription', e.target.checked)}
                />
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${filters.includeDescription ? 'bg-[#5b68f6] border-[#5b68f6]' : 'border-white/20 bg-[#181b26] group-hover:border-[#5b68f6]'}`}>
                  {filters.includeDescription && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
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
                {[
                  { id: 'onlineOnly', label: 'Çevrimiçi Satıcı', icon: <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div> },
                  { id: 'autoDelivery', label: 'Otomatik Teslimat', icon: <Zap className="w-4 h-4 text-yellow-500 shrink-0" /> },
                  { id: 'trustedOnly', label: 'Güvenilir Satıcı', icon: <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" /> },
                  { id: 'corporateOnly', label: 'Kurumsal Satıcı', icon: <Building2 className="w-4 h-4 text-cyan-400 shrink-0" /> }
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#181b26] border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={(filters as any)[opt.id]}
                      onChange={(e) => handleFilterChange(opt.id, e.target.checked)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${(filters as any)[opt.id] ? 'bg-[#5b68f6] border-[#5b68f6]' : 'border-white/20 bg-[#232736]'}`}>
                      {(filters as any)[opt.id] && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    {opt.icon}
                    <span className="text-sm text-gray-300 font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button 
                onClick={applyFilters}
                className="w-full bg-gradient-to-r from-[#5b68f6] to-purple-600 hover:from-[#4a55d6] hover:to-purple-700 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-lg shadow-purple-500/20"
              >
                Filtre Uygula
              </button>
              <button 
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 bg-[#181b26] hover:bg-[#2b3142] border border-white/5 text-gray-300 hover:text-white font-medium py-3 rounded-lg text-sm transition-colors"
              >
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
