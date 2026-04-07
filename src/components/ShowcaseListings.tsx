import { showcaseListings } from '../data/mockData';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShowcaseListings() {
  return (
    <section className="space-y-4">
      {/* Banner */}
      <div className="bg-[#32394d] rounded-xl p-4 flex items-center justify-between border border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <Rocket className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-bold">Binlerce vitrin ilanını kategori ayrımı olmadan görüntülüyorsunuz.</h3>
            <p className="text-gray-400 text-sm">Yukarıdan kategori seçimi yaparak istediğiniz kategorideki vitrin ilanları görüntüleyebilirsiniz.</p>
          </div>
        </div>
        <button className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          Vitrin İlanı Nedir?
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {showcaseListings.map((listing) => (
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
          + Daha fazla vitrin ilanı göster
        </button>
      </div>
    </section>
  );
}
