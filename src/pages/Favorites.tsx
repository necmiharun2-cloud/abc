import { ClipboardList } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Favorites() {
  const { user, loading } = useAuth();

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header Area */}
      <div>
        <h1 className="text-xl font-bold text-white mb-6">Favori İlanlarım</h1>
      </div>

      {/* Content Area */}
      <div className="bg-[#232736] border border-white/5 rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-24 h-24 mb-6 relative">
          <ClipboardList className="w-full h-full text-gray-400 opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <div className="w-8 h-1 bg-yellow-500 rounded-full"></div>
            <div className="w-8 h-1 bg-emerald-500 rounded-full"></div>
            <div className="w-8 h-1 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Favori ilan bulunamadı.</h3>
        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          Favorilerinize eklediğiniz hiçbir ilan bulunamadı.<br/>
          İlanları yakından takip edebilmek için hemen bir kaç tane ilanı favorilerinize ekleyin.
        </p>
        <Link 
          to="/favori-sistemi"
          className="bg-[#2b3142] hover:bg-[#32394d] text-gray-300 border border-white/10 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Favori sistemi hakkında detaylı bilgi için tıklayınız.
        </Link>
      </div>
    </div>
  );
}
