import { Filter, Search, ChevronDown } from 'lucide-react';
import ShowcaseListings from '../components/ShowcaseListings';
import CategoryListings from '../components/CategoryListings';

export default function IlanPazari() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 shrink-0 space-y-4">
        <div className="bg-[#232736] rounded-xl border border-white/5 p-4">
          <div className="flex items-center gap-2 text-white font-bold mb-4">
            <Filter className="w-4 h-4" />
            Filtrele
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Kategori Ara</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Kategori ara..." className="w-full bg-[#2b3142] border border-white/10 rounded-md py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6]" />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Fiyat Aralığı</label>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full bg-[#2b3142] border border-white/10 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:border-[#5b68f6]" />
                <span className="text-gray-500">-</span>
                <input type="number" placeholder="Max" className="w-full bg-[#2b3142] border border-white/10 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:border-[#5b68f6]" />
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <button className="flex items-center justify-between w-full text-sm text-gray-300 hover:text-white py-2">
                <span>Teslimat Süresi</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-between w-full text-sm text-gray-300 hover:text-white py-2">
                <span>Satıcı Durumu</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <button className="w-full bg-[#5b68f6] hover:bg-[#4a55d6] text-white font-medium py-2 rounded-md text-sm transition-colors">
              Filtreleri Uygula
            </button>
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
