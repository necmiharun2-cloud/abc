import { Search, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';

export default function Header() {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const { user } = useAuth();

  const toggleLang = () => {
    setLang(prev => prev === 'TR' ? 'EN' : 'TR');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Çıkış yapıldı.');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu.');
    }
  };

  return (
    <header className="bg-[#1a1d27] border-b border-white/5 relative overflow-hidden">
      {/* Subtle Background Pattern/Image */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pubg-bg/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1d27] via-[#1a1d27]/90 to-[#1a1d27] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://picsum.photos/seed/logo/40/40" alt="Logo" className="w-10 h-10 rounded-full" />
              <span className="text-white font-bold text-2xl tracking-tight">itemsatış</span>
            </Link>
            
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 bg-[#2b3142] hover:bg-[#32394d] px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-white/10 text-white"
            >
              <img 
                src={lang === 'TR' ? "https://flagcdn.com/w20/tr.png" : "https://flagcdn.com/w20/gb.png"} 
                alt={lang} 
                className="w-5 h-3.5 object-cover rounded-sm" 
              />
              <span>{lang === 'TR' ? 'EN' : 'TR'}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-4 pr-12 py-3 bg-[#2b3142] border border-white/10 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#5b68f6] transition-colors"
                placeholder="Google Hediye Kartı"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#5b68f6] flex items-center justify-center border border-white/10 text-white font-bold">
                    {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium text-white">{user.displayName || 'Kullanıcı'}</span>
                    <span className="text-emerald-400 text-xs">0.00 ₺</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full bg-[#2b3142] hover:bg-red-500/20 flex items-center justify-center border border-white/10 text-gray-400 hover:text-red-500 transition-colors"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center border border-white/10">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium text-white">Giriş Yap</span>
                  <span className="text-gray-400 text-xs">veya üye ol</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
