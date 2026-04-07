import { HelpCircle, Rocket, FileText } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function MyListings() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'active' | 'passive'>('active');

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-8 border-b border-white/10 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('active')}
            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'active' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Aktif İlanlarım
            {activeTab === 'active' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5b68f6] shadow-[0_0_10px_rgba(91,104,246,0.8)]"></div>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('passive')}
            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'passive' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Pasif İlanlarım
            {activeTab === 'passive' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5b68f6] shadow-[0_0_10px_rgba(91,104,246,0.8)]"></div>
            )}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full md:w-auto">
          <button className="w-full sm:w-auto bg-[#5b68f6]/20 hover:bg-[#5b68f6]/30 text-[#60a5fa] border border-[#5b68f6]/30 px-4 py-2 rounded-full font-medium transition-colors flex items-center justify-center gap-2 text-sm">
            <HelpCircle className="w-4 h-4" />
            İlan Yukarı Taşıma Nedir?
          </button>
          <button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Rocket className="w-4 h-4" />
            Otomatik İlan Yukarı Taşıma
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-[#232736] border border-white/5 rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-24 h-24 bg-[#1a1d27] rounded-full flex items-center justify-center mb-6 border border-white/5 relative">
          <FileText className="w-10 h-10 text-gray-400" />
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#232736] rounded-full flex items-center justify-center">
            <SearchIcon className="w-5 h-5 text-[#5b68f6]" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {activeTab === 'active' ? 'Aktif ilan bulunamadı.' : 'Pasif ilan bulunamadı.'}
        </h3>
        <p className="text-gray-400 text-sm">
          {activeTab === 'active' ? 'Satıcıya ait hiçbir aktif ilan bulunamadı.' : 'Satıcıya ait hiçbir pasif ilan bulunamadı.'}
        </p>
      </div>
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
