import { valorantListings } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function CategoryListings() {
  const tabs = [
    { name: 'Valorant', icon: 'https://picsum.photos/seed/t4/20/20', active: true },
    { name: 'Roblox', icon: 'https://picsum.photos/seed/t9/20/20' },
    { name: 'Discord', icon: 'https://picsum.photos/seed/t10/20/20' },
    { name: 'Valorant Random Hesap', icon: 'https://picsum.photos/seed/t11/20/20' },
    { name: 'PUBG Mobile', icon: 'https://picsum.photos/seed/t7/20/20' },
    { name: 'Steam', icon: 'https://picsum.photos/seed/t2/20/20' },
  ];

  return (
    <section className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              tab.active 
                ? 'bg-[#5b68f6] border-[#5b68f6] text-white' 
                : 'bg-[#232736] border-white/10 text-gray-300 hover:bg-[#32394d] hover:text-white'
            }`}
          >
            <img src={tab.icon} alt={tab.name} className="w-4 h-4 rounded-full" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {valorantListings.map((listing) => (
          <Link to={`/product/${listing.id}`} key={listing.id} className="bg-[#232736] rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-colors group cursor-pointer flex flex-col">
            {/* Image & Badge */}
            <div className="relative aspect-[4/3]">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              {listing.isVitrin && (
                <div className="absolute top-0 inset-x-0 bg-[#10b981] text-white text-[10px] font-bold text-center py-1 tracking-wider">
                  VİTRİN İLANI
                </div>
              )}
              {/* Seller Avatar Overlay */}
              <div className="absolute -bottom-4 left-3 flex items-center gap-2">
                <img src={listing.sellerAvatar} alt={listing.sellerName} className="w-8 h-8 rounded-md border-2 border-[#232736] bg-[#2b3142]" />
              </div>
            </div>

            {/* Content */}
            <div className="p-3 pt-6 flex flex-col flex-1">
              <div className="flex flex-col gap-0.5 mb-2">
                <span className="text-[10px] text-gray-500 font-medium">SATICI</span>
                <span className="text-xs text-white font-medium truncate">{listing.sellerName}</span>
              </div>
              
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">{listing.category}</span>
              
              <h4 className="text-sm text-white font-medium line-clamp-2 mb-3 leading-snug group-hover:text-blue-400 transition-colors">
                {listing.title}
              </h4>
              
              <div className="mt-auto flex items-end gap-2">
                <span className="text-yellow-500 font-bold text-lg leading-none">{listing.price.toFixed(2)} ₺</span>
                {listing.oldPrice && (
                  <span className="text-gray-500 text-xs line-through leading-none mb-0.5">{listing.oldPrice.toFixed(2)} ₺</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <button className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
          + Daha fazla Valorant ilanı göster
        </button>
      </div>
    </section>
  );
}
