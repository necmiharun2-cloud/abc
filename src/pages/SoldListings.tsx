import { RefreshCw, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';

export default function SoldListings() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sattığım İlanlar</h1>
          <p className="text-gray-400 text-sm">
            Sattığınız tüm ürün ve ilanlar aşağıda listelenmektedir.<br/>
            Sipariş detaylarını görmek için siparişin üstüne tıklayabilirsiniz.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-gray-400 text-sm">Satın aldıklarını mı arıyorsun?</span>
          <Link to="/siparislerim" className="bg-[#5b68f6]/20 hover:bg-[#5b68f6]/30 text-[#60a5fa] border border-[#5b68f6]/30 px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 text-sm">
            Siparişlerim
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-end gap-3">
        <button className="bg-[#232736] hover:bg-white/5 border border-white/5 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Sayfayı Yenile
        </button>
        <button className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(91,104,246,0.3)]">
          <Filter className="w-4 h-4" />
          Gelişmiş Filtre
        </button>
      </div>

      {/* Orders List */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Şubat 2023</h2>
        <div className="space-y-4">
          {/* Order 1 */}
          <div className="bg-[#232736] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
            <img src="https://picsum.photos/seed/sold1/80/80" alt="Product" className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 w-full">
              <div className="text-gray-400 text-sm mb-1">Sipariş No : 1461229</div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Sipariş teslim edildi
              </div>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto gap-6 mt-4 md:mt-0">
              <div className="text-right">
                <div className="text-gray-400 text-sm mb-1">2 Şubat 2023, 17:06, Perşembe</div>
                <div className="text-yellow-500 font-bold text-lg">350.00 ₺</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#5b68f6] group-hover:text-white transition-colors">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
