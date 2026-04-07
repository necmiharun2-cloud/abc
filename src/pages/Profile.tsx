import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfileWarningModal from '../components/ProfileWarningModal';

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <ProfileWarningModal />
      
      <div className="bg-[#232736] rounded-xl border border-white/5 p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6">Profilim</h1>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-[#181b26] rounded-lg border border-white/5">
            <div className="w-16 h-16 rounded-full bg-[#5b68f6] flex items-center justify-center text-2xl text-white font-bold">
              {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xl font-bold text-white">{user.displayName || 'İsimsiz Kullanıcı'}</div>
              <div className="text-gray-400">{user.email}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#181b26] rounded-lg border border-white/5">
              <label className="block text-sm text-gray-400 mb-1">Hesap Durumu</label>
              <div className="text-emerald-400 font-medium">Aktif</div>
            </div>
            <div className="p-4 bg-[#181b26] rounded-lg border border-white/5">
              <label className="block text-sm text-gray-400 mb-1">Bakiye</label>
              <div className="text-white font-medium">0.00 ₺</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
