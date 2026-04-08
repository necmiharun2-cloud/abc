import { Star, ShieldCheck, Search, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function Magazalar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Öne Çıkanlar');
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'users'), orderBy('soldCount', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const fetchedStores = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          name: doc.data().username || doc.data().displayName || 'Kullanıcı',
          avatar: doc.data().avatar || `https://picsum.photos/seed/${doc.id}/64/64`,
          banner: `https://picsum.photos/seed/banner${doc.id}/400/120`,
          rating: (Math.random() * 1 + 4).toFixed(1), // Mock rating for now
          sales: doc.data().soldCount || 0,
          isVerified: true,
          isPro: doc.data().soldCount > 10
        }));
        setStores(fetchedStores);
      } catch (error) {
        console.error('Error fetching stores:', error);
        toast.error('Mağazalar yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#232736] rounded-xl border border-white/5 p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5b68f6] via-purple-500 to-[#5b68f6]"></div>
        <h1 className="text-3xl font-bold text-white mb-3">Öne Çıkan Mağazalar</h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          İtemsatış'ın en güvenilir, en çok satış yapan ve en yüksek puana sahip mağazalarını keşfedin.
        </p>
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Mağaza adı ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2b3142] border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#5b68f6] shadow-inner"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {['Öne Çıkanlar', 'En Çok Satış Yapanlar', 'En Yeniler'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${activeTab === tab ? 'bg-[#5b68f6] text-white' : 'bg-[#232736] text-gray-300 hover:text-white border border-white/5 hover:bg-[#2b3142]'} px-6 py-2.5 rounded-full text-sm font-medium transition-colors`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-white">Mağazalar yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStores.map(store => (
            <div key={store.id} className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden hover:border-white/20 transition-colors group">
              {/* Banner */}
              <div className="h-24 relative">
                <img src={store.banner} alt="Banner" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#232736] to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="px-5 pb-5 relative">
                {/* Avatar */}
                <div className="absolute -top-10 left-5">
                  <img src={store.avatar} alt={store.name} className="w-16 h-16 rounded-xl border-4 border-[#232736] bg-[#2b3142]" />
                </div>
                
                <div className="flex justify-end mb-2 pt-2">
                  <div className="flex items-center gap-1 bg-[#2b3142] px-2 py-1 rounded text-xs font-bold text-yellow-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {store.rating}
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5 mb-1">
                    {store.name}
                    {store.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                    {store.isPro && <Award className="w-4 h-4 text-[#5b68f6]" />}
                  </h3>
                  <div className="text-xs text-gray-400 mb-4">
                    <span className="text-white font-medium">{store.sales}</span> Başarılı İşlem
                  </div>
                  
                  <Link 
                    to={`/profile/${store.id}`}
                    className="block w-full bg-[#2b3142] hover:bg-[#32394d] text-white text-sm font-medium py-2 rounded transition-colors text-center"
                  >
                    Mağazaya Git
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
