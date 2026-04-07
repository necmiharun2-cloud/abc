import { Link } from 'react-router-dom';
import { ChevronRight, Eye } from 'lucide-react';

export default function Breadcrumb() {
  return (
    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
      <div className="flex items-center gap-2">
        <Link to="/" className="hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-500">Tüm Kategoriler</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-500">Sosyal Medya</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-500">VALORANT</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-yellow-500 font-medium">Valorant Random Hesap (10-100 Skin)</span>
      </div>
      <div className="flex items-center gap-1.5 bg-[#232736] px-2 py-1 rounded border border-white/5">
        <Eye className="w-3.5 h-3.5" />
        <span>101</span>
      </div>
    </div>
  );
}
