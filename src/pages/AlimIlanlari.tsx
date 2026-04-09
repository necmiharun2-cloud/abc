import { Filter, Search, PlusCircle, RefreshCw, X } from 'lucide-react';
import CategoryListings from '../components/CategoryListings';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function AlimIlanlari() {
  const { user, profile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<{ keyword: string; type: 'buy' | 'sell' }>({
    keyword: '',
    type: 'buy'
  });

  const [newListing, setNewListing] = useState({
    category: 'VALORANT',
    title: '',
    budget: '',
    description: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    toast.success('Filtreler uygulandı!');
  };

  const clearFilters = () => {
    setFilters({ keyword: '', type: 'buy' });
    toast.success('Filtreler temizlendi!');
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('İlan oluşturmak için giriş yapmalısınız.');
      return;
    }
    if (!newListing.category || !newListing.title || !newListing.budget) {
      toast.error('Lütfen gerekli alanları doldurun.');
      return;
    }

    if (newListing.title.length < 5) {
      toast.error('İlan başlığı en az 5 karakter olmalıdır.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        category: newListing.category.toUpperCase(),
        title: newListing.title,
        price: parseFloat(newListing.budget),
        description: newListing.description,
        sellerId: user.uid,
        sellerName: profile?.username || user.displayName || 'Anonim',
        sellerAvatar: profile?.avatar || user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
        status: 'active',
        type: 'buy',
        createdAt: serverTimestamp(),
        image: `https://picsum.photos/seed/${Math.random()}/400/300`
      });

      toast.success('Alım ilanınız başarıyla oluşturuldu!');
      setIsModalOpen(false);
      setNewListing({ category: 'VALORANT', title: '', budget: '', description: '' });
      // Force refresh of CategoryListings by changing a key or just letting it re-fetch if it has a listener
      // Since CategoryListings uses useEffect with empty deps, we might need to pass a refresh trigger
    } catch (error) {
      console.error('Error creating buying listing:', error);
      toast.error('İlan oluşturulurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Alım İlanı Oluştur
          </button>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-white mb-4">En Son Alım İlanları</h2>
          <CategoryListings filters={filters} />
        </div>
      </div>

      {/* Create Listing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#232736] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-white">Alım İlanı Oluştur</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateListing} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Kategori</label>
                <input 
                  type="text"
                  placeholder="Örn: Valorant, Roblox, Steam..."
                  value={newListing.category}
                  onChange={(e) => setNewListing({...newListing, category: e.target.value})}
                  className="w-full bg-[#2b3142] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">İlan Başlığı</label>
                <input 
                  type="text"
                  placeholder="Ne arıyorsunuz?"
                  value={newListing.title}
                  onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                  className="w-full bg-[#2b3142] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Bütçe (₺)</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={newListing.budget}
                  onChange={(e) => setNewListing({...newListing, budget: e.target.value})}
                  className="w-full bg-[#2b3142] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Açıklama (Opsiyonel)</label>
                <textarea 
                  rows={4}
                  placeholder="Aradığınız ürünün detaylarını belirtin..."
                  value={newListing.description}
                  onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                  className="w-full bg-[#2b3142] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors resize-none"
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                >
                  İlanı Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
