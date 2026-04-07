import { MessageSquare, PlusCircle, Headphones, Info, Eye } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import SupportAssistant from '../components/SupportAssistant';
import toast from 'react-hot-toast';

export default function Support() {
  const { user, loading } = useAuth();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header Area */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold text-white tracking-tight">Destek Sistemi</h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Destek talepleriniz 09:00 - 00:00 aralığında en geç 24 saat içerisinde cevaplanmaktadır.<br/>
          İlan ve ürün şikayetleriniz için mutlaka video kaydı iletmelisiniz.
        </p>
      </div>

      {/* Main Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="relative group">
          <button 
            onClick={() => setIsAssistantOpen(true)}
            className="w-full bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] group-hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">İtemSatış Asistana Sor</span>
          </button>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-orange-400 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Hızlı bilgi ve destek için tercih edilir
          </div>
        </div>

        <button 
          onClick={() => handleComingSoon('Destek Talebi Oluştur')}
          className="w-full bg-[#10b981] hover:bg-[#059669] text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg">Destek Talebi Oluştur</span>
        </button>

        <button 
          onClick={() => handleComingSoon('Canlı Destek')}
          className="w-full bg-[#374151] hover:bg-[#4b5563] text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all border border-white/5 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Headphones className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg">Canlı Desteğe Bağlan</span>
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-[#581c87]/30 border border-[#581c87]/50 rounded-xl p-4 flex items-center gap-4 text-[#d8b4fe] text-sm max-w-4xl mx-auto">
        <div className="w-8 h-8 rounded-full bg-[#581c87]/50 flex items-center justify-center shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <p>Anlık destek ve bilgi almak için ekranın sağ alt kısmında bulunan canlı destek butonunu kullanabilir ve canlı destek personellerimizden destek alabilirsiniz.</p>
      </div>

      {/* Tickets Table */}
      <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden max-w-[1400px] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#1a1d27] text-gray-400">
                <th className="px-6 py-4 font-medium">TALEP NO</th>
                <th className="px-6 py-4 font-medium">BAŞLIK</th>
                <th className="px-6 py-4 font-medium">KATEGORİ</th>
                <th className="px-6 py-4 font-medium">DURUM</th>
                <th className="px-6 py-4 font-medium">OLUŞTURULMA T.</th>
                <th className="px-6 py-4 font-medium">İŞLEM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="text-white hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-[#5b68f6] font-bold">#98492</td>
                <td className="px-6 py-4 font-medium">Satın aldığım hesap geri alindi</td>
                <td className="px-6 py-4">
                  <span className="bg-[#5b68f6]/10 text-[#5b68f6] px-3 py-1 rounded-lg text-xs font-bold border border-[#5b68f6]/20">İlanlar</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs font-bold border border-red-500/20 flex items-center gap-1.5 w-fit">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    Kapatıldı
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  3 yıl önce
                </td>
                <td className="px-6 py-4">
                  <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <Eye className="w-3.5 h-3.5" />
                    Talebi Gör
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Assistant Modal */}
      <SupportAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
        userName={user.displayName || user.email?.split('@')[0] || 'Kullanıcı'} 
      />
    </div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
