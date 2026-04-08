import { Filter, Search, PlusCircle, RefreshCw } from 'lucide-react';
import CategoryListings from '../components/CategoryListings';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AlimIlanlari() {
  const [filters, setFilters] = useState({
    keyword: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    toast.success('Filtreler uygulandı!');
  };

  const clearFilters = () => {
    setFilters({ keyword: '' });
    toast.success('Filtreler temizlendi!');
  };

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
                <input 
                  type="text" 
                  placeholder="Kategori ara..." 
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange('keyword', e.target.value)}
                  className="w-full bg-[#2b3142] border border-white/10 rounded-md py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#5b68f6]" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={applyFilters}
                className="w-full bg-[#5b68f6] hover:bg-[#4a55d6] text-white font-medium py-2 rounded-md text-sm transition-colors"
              >
                Filtreleri Uygula
              </button>
              <button 
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 bg-[#1a1d27] hover:bg-[#2b3142] border border-white/5 text-gray-400 hover:text-white py-2 rounded-md text-sm transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Temizle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-8 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#232736] p-6 rounded-xl border border-white/5">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Alım İlanları Pazarı</h1>
            <p className="text-sm text-gray-400">Aradığın ürünü bulamıyor musun? Hemen bir alım ilanı oluştur, satıcılar sana ulaşsın.</p>
          </div>
          <button className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors">
            <PlusCircle className="w-5 h-5" />
            Alım İlanı Oluştur
          </button>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-white mb-4">En Son Alım İlanları</h2>
          <CategoryListings filters={filters} />
        </div>
      </div>
    </div>
  );
}
