import { ClipboardList, Heart, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { Navigate, Link } from 'react-router-dom';
import { valorantListings, showcaseListings } from '../data/mockData';
import { useMemo } from 'react';

export default function Favorites() {
  const { user, loading } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();

  const allListings = useMemo(() => [...valorantListings, ...showcaseListings], []);
  
  const favoriteProducts = useMemo(() => {
    return allListings.filter(listing => favorites.includes(listing.id.toString()));
  }, [allListings, favorites]);

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      <div>
        <h1 className="text-xl font-bold text-white mb-6">Favori İlanlarım ({favoriteProducts.length})</h1>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {favoriteProducts.map((listing) => (
            <div key={listing.id} className="bg-[#232736] rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-colors group relative flex flex-col">
              <Link to={`/product/${listing.id}`} className="flex-1 flex flex-col">
                <div className="relative aspect-[4/3]">
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">{listing.category}</span>
                  <h4 className="text-sm text-white font-medium line-clamp-2 mb-3 leading-snug group-hover:text-blue-400 transition-colors">
                    {listing.title}
                  </h4>
                  <div className="mt-auto flex items-end gap-2">
                    <span className="text-yellow-500 font-bold text-lg leading-none">{listing.price.toFixed(2)} ₺</span>
                  </div>
                </div>
              </Link>
              <button 
                onClick={() => toggleFavorite(listing.id.toString())}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#232736] border border-white/5 rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-24 h-24 mb-6 relative">
            <ClipboardList className="w-full h-full text-gray-400 opacity-50" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Favori ilan bulunamadı.</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Favorilerinize eklediğiniz hiçbir ilan bulunamadı.<br/>
            İlanları yakından takip edebilmek için hemen bir kaç tane ilanı favorilerinize ekleyin.
          </p>
        </div>
      )}
    </div>
  );
}
