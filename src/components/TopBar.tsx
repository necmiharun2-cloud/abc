import { Instagram, Youtube, Twitter, Percent, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function TopBar() {
  const handleComingSoon = (name: string) => {
    toast.success(`${name} bölümü yakında eklenecek!`);
  };

  return (
    <div className="bg-[#181b26] border-b border-white/5 h-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-xs font-medium">
        {/* Left Social Icons & Text */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="https://discord.gg/itemsatis" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded bg-[#232736] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#5b68f6] transition-colors">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
            </a>
            <a href="https://instagram.com/itemsatis" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded bg-[#232736] flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 transition-colors">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com/itemsatis" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded bg-[#232736] flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-colors">
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a href="https://twitter.com/itemsatis" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded bg-[#232736] flex items-center justify-center text-gray-400 hover:text-white hover:bg-black transition-colors">
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>
          <span className="text-gray-400">En uygun fiyatlarla Valorant VP satın almak için tıklayın.</span>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          <Link to="/firsatlar" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors">
            <Percent className="w-3.5 h-3.5" />
            Haftanın Fırsatları
          </Link>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">Blog</Link>
          <Link to="/yayincilar" className="text-gray-300 hover:text-white transition-colors">Yayıncılar</Link>
          <button 
            onClick={() => handleComingSoon('Destek Merkezi')}
            className="flex items-center gap-1 cursor-pointer text-gray-300 hover:text-white transition-colors group relative"
          >
            Destek Merkezi
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => handleComingSoon('Kurumsal')}
            className="flex items-center gap-1 cursor-pointer text-gray-300 hover:text-white transition-colors group relative"
          >
            Kurumsal
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
