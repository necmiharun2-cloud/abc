import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { Heart, MessageSquare, Zap, ShieldCheck } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { chatService } from '../services/chatService';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';

interface Filters {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  seller?: string;
  keyword?: string;
  includeDescription?: boolean;
  onlineOnly?: boolean;
  autoDelivery?: boolean;
  trustedOnly?: boolean;
  corporateOnly?: boolean;
  type?: 'buy' | 'sell';
}

interface CategoryListingsProps {
  filters?: Filters;
  initialCategory?: string;
}

export default function CategoryListings({ filters, initialCategory }: CategoryListingsProps) {
  const [activeTab, setActiveTab] = useState(initialCategory || 'VALORANT');
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [allListings, setAllListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Base query: only active listings
    let q = query(collection(db, 'products'), where('status', '==', 'active'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) }));
      setAllListings(fetched);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching listings:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleMessageSeller = async (e: React.MouseEvent, sellerId: string, sellerName: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Mesaj göndermek için giriş yapmalısınız.');
      return;
    }

    if (user.uid === sellerId) {
      toast.error('Kendi ilanınıza mesaj gönderemezsiniz.');
      return;
    }

    try {
      const chatId = await chatService.createChat(
        [user.uid, sellerId],
        {
          [user.uid]: { name: profile?.username || user.displayName || 'Me', avatar: profile?.avatar || user.photoURL || '' },
          [sellerId]: { name: sellerName, avatar: '' }
        }
      );
      navigate('/mesajlarim', { state: { activeChatId: chatId } });
    } catch (error) {
      toast.error('Sohbet başlatılamadı.');
    }
  };

  const tabs = [
    { name: 'VALORANT', icon: 'https://picsum.photos/seed/t4/20/20' },
    { name: 'ROBLOX', icon: 'https://picsum.photos/seed/t9/20/20' },
    { name: 'DISCORD', icon: 'https://picsum.photos/seed/t10/20/20' },
    { name: 'PUBG MOBILE', icon: 'https://picsum.photos/seed/t7/20/20' },
    { name: 'STEAM', icon: 'https://picsum.photos/seed/t2/20/20' },
  ];

  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      // Type filter (default to sell if not specified)
      const filterType = filters?.type || 'sell';
      const listingType = listing.type || 'sell';
      if (listingType !== filterType) return false;

      // Tab filter
      if (activeTab && listing.category !== activeTab) {
        return false;
      }

      // Sidebar filters
      if (filters) {
        if (filters.minPrice && listing.price < parseFloat(filters.minPrice)) return false;
        if (filters.maxPrice && listing.price > parseFloat(filters.maxPrice)) return false;
        if (filters.seller && !listing.sellerName?.toLowerCase().includes(filters.seller.toLowerCase())) return false;
        if (filters.keyword) {
          const searchIn = filters.includeDescription 
            ? `${listing.title} ${listing.description}`.toLowerCase()
            : listing.title?.toLowerCase();
          if (!searchIn?.includes(filters.keyword.toLowerCase())) return false;
        }
        if (filters.autoDelivery && listing.deliveryType !== 'Otomatik Teslimat') return false;
      }

      return true;
    });
  }, [allListings, activeTab, filters]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-[#232736] rounded-lg aspect-[4/6] animate-pulse border border-white/5"></div>
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeTab === tab.name 
                ? 'bg-[#5b68f6] border-[#5b68f6] text-white shadow-[0_0_15px_rgba(91,104,246,0.3)]' 
                : 'bg-[#232736] border-white/10 text-gray-300 hover:bg-[#32394d] hover:text-white'
            }`}
          >
            <img src={tab.icon} alt={tab.name} className="w-4 h-4 rounded-full" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredListings.map((listing) => (
            <Link to={`/product/${listing.id}`} key={`${listing.id}-${listing.category}`} className="bg-[#232736] rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-colors group cursor-pointer flex flex-col">
              {/* Image & Badge */}
              <div className="relative aspect-[4/3]">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                {listing.type === 'buy' ? (
                  <div className="absolute top-0 inset-x-0 bg-amber-500 text-white text-[10px] font-bold text-center py-1 tracking-wider">
                    ALIM İLANI
                  </div>
                ) : listing.isVitrin ? (
                  <div className="absolute top-0 inset-x-0 bg-[#10b981] text-white text-[10px] font-bold text-center py-1 tracking-wider">
                    VİTRİN İLANI
                  </div>
                ) : (
                  <div className="absolute top-0 inset-x-0 bg-[#3b82f6] text-white text-[10px] font-bold text-center py-1 tracking-wider">
                    YENİ İLAN
                  </div>
                )}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(listing.id.toString());
                  }}
                  className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-red-500 transition-colors group/fav"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(listing.id.toString()) ? 'fill-current text-white' : 'text-white'}`} />
                </button>
                <button 
                  onClick={(e) => handleMessageSeller(e, listing.sellerId, listing.sellerName)}
                  className="absolute bottom-2 left-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#5b68f6] transition-colors"
                  title="Satıcıya Mesaj Gönder"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                
                {listing.deliveryType === 'Otomatik Teslimat' && (
                  <div className="absolute top-8 right-2 p-1 bg-yellow-500 rounded-md shadow-lg" title="Otomatik Teslimat">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* Seller Info Bar */}
              <div className="bg-[#181b26] px-3 py-2 flex items-center gap-2.5 border-b border-white/5">
                <img src={listing.sellerAvatar || `https://picsum.photos/seed/${listing.sellerId}/40/40`} alt={listing.sellerName} className="w-7 h-7 rounded object-cover" />
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] text-gray-400 font-medium leading-none mb-1">{listing.type === 'buy' ? 'ALICI' : 'SATICI'}</span>
                  <span className="text-xs text-white font-bold leading-none truncate">{listing.sellerName}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-1">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">{listing.category}</span>
                
                <h4 className="text-sm text-white font-medium line-clamp-2 mb-3 leading-snug group-hover:text-blue-400 transition-colors">
                  {listing.title}
                </h4>
                
                <div className="mt-auto flex items-end gap-2">
                  <span className="text-yellow-500 font-bold text-lg leading-none">{(listing.price || 0).toFixed(2)} ₺</span>
                  {listing.oldPrice && (
                    <span className="text-gray-500 text-xs line-through leading-none mb-0.5">{(listing.oldPrice || 0).toFixed(2)} ₺</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-[#232736] rounded-xl border border-white/5 p-12 text-center">
          <p className="text-gray-400">Aradığınız kriterlere uygun ilan bulunamadı.</p>
        </div>
      )}

      <div className="flex justify-center pt-2">
        <button className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
          + Daha fazla {activeTab} ilanı göster
        </button>
      </div>
    </section>
  );
}

