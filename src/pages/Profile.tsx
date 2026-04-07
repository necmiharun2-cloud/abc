import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfileWarningModal from '../components/ProfileWarningModal';
import { Package, Star, Trophy, Users, UserPlus, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, loading } = useAuth();

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  if (loading) {
    return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <ProfileWarningModal />
      
      {/* Cover Photo Area */}
      <div className="h-[300px] w-full bg-[#1a1d27] relative overflow-hidden rounded-t-xl border-x border-t border-white/5">
        <img 
          src="https://picsum.photos/seed/cover/1400/300" 
          alt="Cover" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute top-4 right-4 text-xs text-gray-400 bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
          Üyelik Tarihi : 15 Kasım 2022
        </div>
      </div>

      {/* Profile Info Bar */}
      <div className="bg-[#232736] border border-white/5 rounded-b-xl px-8 pb-6 relative flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
        {/* Avatar & Basic Info */}
        <div className="flex gap-6 -mt-16 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-xl bg-[#1a1d27] border-4 border-[#232736] overflow-hidden flex items-center justify-center">
              <img src="https://picsum.photos/seed/avatar/128/128" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#232736]"></div>
          </div>
          
          <div className="pt-20">
            <div className="text-sm text-gray-400 mb-1">Yükleniyor...</div>
            <h1 className="text-2xl font-bold text-white mb-2">{user.displayName || user.email?.split('@')[0] || 'Kullanıcı'}</h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a1d27] border-2 border-yellow-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">2</span>
              </div>
            </div>
            <button 
              onClick={() => handleComingSoon('Profil Düzenleme')}
              className="mt-4 bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Profilini Düzenle
            </button>
          </div>
        </div>

        {/* Stats & Rating */}
        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <span className="text-xl font-bold text-white">?</span>
            <span className="text-gray-400">/ 10</span>
          </div>
          <div className="text-sm text-gray-400">Hiç değerlendirme yok</div>
          <div className="w-full md:w-48 bg-emerald-500/20 text-emerald-400 text-center py-2 rounded-lg text-sm font-medium border border-emerald-500/30">
            1 Başarılı İşlem
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-[#232736] p-2 rounded-xl border border-white/5">
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1a1d27] text-white font-medium border-b-2 border-[#5b68f6]">
          <Package className="w-4 h-4" />
          İlanlar
          <span className="bg-[#5b68f6]/20 text-[#5b68f6] px-2 py-0.5 rounded-full text-xs">0</span>
        </button>
        <button 
          onClick={() => handleComingSoon('Değerlendirmeler')}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Star className="w-4 h-4" />
          Değerlendirmeler
          <span className="bg-white/10 text-gray-400 px-2 py-0.5 rounded-full text-xs">0</span>
        </button>
        <button 
          onClick={() => handleComingSoon('Başarımlar')}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Trophy className="w-4 h-4" />
          Başarımlar
        </button>
        <button 
          onClick={() => handleComingSoon('Takipçiler')}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Users className="w-4 h-4" />
          Takipçiler
          <span className="bg-white/10 text-gray-400 px-2 py-0.5 rounded-full text-xs">0</span>
        </button>
        <button 
          onClick={() => handleComingSoon('Takip Ettikleri')}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Takip Ettikleri
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-[#232736] rounded-xl border border-white/5 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-24 h-24 bg-[#1a1d27] rounded-full flex items-center justify-center mb-6 relative">
          <Package className="w-12 h-12 text-blue-400" />
          <div className="absolute -bottom-2 -right-2 bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#232736]">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Aktif ilan bulunamadı.</h2>
        <p className="text-gray-400">Satıcıya ait hiçbir aktif ilan bulunamadı.</p>
      </div>
    </div>
  );
}

// Helper icon for the empty state
function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
