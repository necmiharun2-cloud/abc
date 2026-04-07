import { Search, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');

  const toggleLang = () => {
    setLang(prev => prev === 'TR' ? 'EN' : 'TR');
  };

  return (
    <header className="bg-[#232736] border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2">
              <img src="https://picsum.photos/seed/logo/40/40" alt="Logo" className="w-10 h-10 rounded-full" />
              <span className="text-white font-bold text-2xl tracking-tight">itemsatış</span>
            </a>
            
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
            <button className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center border border-white/10">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium text-white">Giriş Yap</span>
                <span className="text-gray-400 text-xs">veya üye ol</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
