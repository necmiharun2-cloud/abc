import { Search, User, LogOut, Sliders, ShoppingCart, ShoppingBag, List, Heart, Wallet, LifeBuoy, MessageSquare, ChevronDown, ShieldCheck, PlusCircle, Bell, Package, Tag, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';

export default function Header() {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const { cartCount } = useCart();

  const toggleLang = () => {
    setLang(prev => prev === 'TR' ? 'EN' : 'TR');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Çıkış yapıldı.');
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu.');
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#1a1d27] border-b border-white/5 relative overflow-visible z-50">
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
              <>
                {/* Neon Icons */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link to="/mesajlarim" className="relative p-2 text-gray-400 hover:text-[#00f0ff] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.8)] group" title="Mesajlarım">
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-[#1a1d27]">3</span>
                  </Link>
                  
                  <div className="relative" ref={notificationRef}>
                    <button 
                      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                      className="relative p-2 text-gray-400 hover:text-[#00f0ff] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.8)] group" 
                      title="Bildirimler"
                    >
                      <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-[#1a1d27]">1</span>
                    </button>

                    {/* Notification Popover */}
                    {isNotificationOpen && (
                      <div className="absolute top-full right-0 mt-2 w-80 bg-[#232736] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                        <div className="p-4 border-b border-white/5 bg-[#1a1d27]/50 flex items-start gap-3 hover:bg-white/5 transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-lg bg-[#5b68f6]/20 flex items-center justify-center shrink-0">
                            <img src="https://picsum.photos/seed/logo/40/40" alt="Logo" className="w-6 h-6 rounded" />
                          </div>
                          <div>
                            <h4 className="text-white text-sm font-bold mb-1">Bu Hafta Neler Var</h4>
                            <p className="text-gray-400 text-xs line-clamp-2">Haftalık Fırsatlar sayfamız az önce güncellendi! Hemen göz at.</p>
                          </div>
                        </div>
                        <div className="p-3 bg-[#1a1d27]">
                          <Link 
                            to="/bildirimler" 
                            onClick={() => setIsNotificationOpen(false)}
                            className="block w-full text-center bg-[#5b68f6] hover:bg-[#4a55d6] text-white py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Tüm bildirimlerim
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link to="/sepet" className="relative p-2 text-gray-400 hover:text-[#00f0ff] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.8)] group" title="Sepetim">
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {cartCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-[#1a1d27]">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#5b68f6] flex items-center justify-center border border-white/10 text-white font-bold">
                      {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </div>
                    {/* Level Badge */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-[#1a1d27] flex items-center justify-center text-[10px] font-bold text-white">
                      2
                    </div>
                  </div>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium text-white">{user.displayName || 'Kullanıcı'}</span>
                    <span className="text-emerald-400 text-xs font-semibold">0.00 ₺</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#232736] rounded-xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-[#5b68f6] flex items-center justify-center border border-white/10 text-white font-bold text-lg">
                            {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-[#232736] flex items-center justify-center text-xs font-bold text-white">
                            2
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{user.displayName || 'Kullanıcı'}</span>
                          <span className="text-gray-400 text-xs">0.00 ₺</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-center gap-2 bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30 text-[#60a5fa] py-2 rounded-lg text-sm font-medium transition-colors border border-[#3b82f6]/30">
                          <PlusCircle className="w-4 h-4" />
                          Bakiye Yükle
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg text-sm font-medium transition-colors border border-emerald-500/30">
                          <ShieldCheck className="w-4 h-4" />
                          Güvenli Hesaba Yükselt
                        </button>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <User className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Profilim</span>
                      </Link>
                      <Link to="/kontrol-merkezi" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <Sliders className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Kontrol Merkezi</span>
                      </Link>
                      <Link to="/siparislerim" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <ShoppingCart className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Siparişlerim</span>
                      </Link>
                      <Link to="/sattigim-ilanlar" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <Package className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Sattığım İlanlar</span>
                      </Link>
                      <Link to="/ilanlarim" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <Tag className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">İlanlarım</span>
                      </Link>
                      <Link to="/favorilerim" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <Star className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Favori İlanlarım</span>
                      </Link>
                      <Link to="#" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <ShoppingBag className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Sattığım İlanlar</span>
                      </Link>
                      <Link to="#" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <List className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">İlanlarım</span>
                      </Link>
                      <Link to="#" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <Heart className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Favori İlanlarım</span>
                      </Link>
                      <Link to="#" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <Wallet className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Para Çek</span>
                      </Link>
                      <Link to="#" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <LifeBuoy className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Destek Sistemi</span>
                      </Link>
                      <Link to="#" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-[#00f0ff] transition-all duration-300 group text-sm">
                        <MessageSquare className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">Discord</span>
                      </Link>
                      <div className="h-px bg-white/5 my-1"></div>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-all duration-300 group text-sm">
                        <LogOut className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] group-hover:scale-110 transition-all" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]">Çıkış</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              </>
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
