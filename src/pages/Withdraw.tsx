import { HelpCircle, PlusCircle, CreditCard, Wallet, Bitcoin, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Withdraw() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState<'bank' | 'tosla' | 'binance'>('bank');
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankAccount) {
      toast.error('Lütfen bir banka hesabı seçiniz.');
      return;
    }
    if (!amount || parseFloat(amount) < 30) {
      toast.error('Minimum çekim tutarı 30.00 ₺\'dir.');
      return;
    }
    if (!isAgreed) {
      toast.error('Lütfen sözleşmeyi onaylayın.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Para çekme talebiniz başarıyla oluşturuldu!');
      setAmount('');
      setBankAccount('');
      setIsAgreed(false);
    }, 1500);
  };

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Para Çekim Talebi</h1>
          <p className="text-gray-400 text-sm">Lütfen çekim yapmak istediğiniz hesap türünü seçin.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/destek-sistemi')}
            className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Sorun mu yaşıyorsunuz?
          </button>
          <button 
            onClick={() => navigate('/kontrol-merkezi', { state: { activeView: 'banks' } })}
            className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Banka Hesabı Ekle
          </button>
        </div>
      </div>

      {/* Method Tabs */}
      <div className="flex gap-4">
        <button 
          onClick={() => setMethod('bank')}
          className={`flex-1 md:flex-none md:w-48 p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${method === 'bank' ? 'bg-[#5b68f6]/10 border-[#5b68f6] text-white' : 'bg-[#232736] border-white/5 text-gray-400 hover:border-white/10'}`}
        >
          <CreditCard className="w-6 h-6" />
          <span className="text-sm font-bold uppercase tracking-wider">Banka Hesabı</span>
        </button>
        <button 
          onClick={() => setMethod('tosla')}
          className={`flex-1 md:flex-none md:w-48 p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${method === 'tosla' ? 'bg-pink-500/10 border-pink-500 text-white' : 'bg-[#232736] border-white/5 text-gray-400 hover:border-white/10'}`}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-sm font-bold uppercase tracking-wider">Tosla</span>
        </button>
        <button 
          onClick={() => setMethod('binance')}
          className={`flex-1 md:flex-none md:w-48 p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${method === 'binance' ? 'bg-yellow-500/10 border-yellow-500 text-white' : 'bg-[#232736] border-white/5 text-gray-400 hover:border-white/10'}`}
        >
          <Bitcoin className="w-6 h-6" />
          <span className="text-sm font-bold uppercase tracking-wider">Binance</span>
        </button>
      </div>

      {/* Withdrawal Form */}
      <form onSubmit={handleWithdraw} className="bg-[#232736] rounded-xl border border-white/5 p-8 space-y-6">
        <h2 className="text-white font-bold">Banka Para Çekim Talebi</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Banka Hesabınız</label>
            <div className="relative">
              <select 
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#5b68f6] transition-colors"
              >
                <option value="">Lütfen bir banka hesabı seçiniz</option>
                <option value="1">TR63 0004 6002 4888 8000 1639 22 - Çağlar Özbunar</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Tutar</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1a1d27] border border-white/5 rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-1">Hesabınıza Geçecek Bakiye</div>
              <div className="text-white font-bold">{amount ? (Math.max(0, parseFloat(amount) - 20)).toFixed(2) : '0.00'} ₺</div>
            </div>
            <div className="bg-[#1a1d27] border border-white/5 rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-1">İşlem Ücreti</div>
              <div className="text-white font-bold">20.00 ₺</div>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-white/10 bg-[#1a1d27] text-[#5b68f6] focus:ring-0 focus:ring-offset-0" 
            />
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
              Seçtiğim banka hesap bilgilerinin doğruluğunu ve bilgilerin hatalı olması durumunda oluşacak maddi zararın İtemSatış'ın sorumluluğunda olmadığını kabul ediyorum.
            </span>
          </label>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Talebiniz Gönderiliyor...' : 'Talebi Gönder'}
          </button>
        </div>
      </form>

      {/* Rules Section */}
      <div className="bg-[#232736] rounded-xl border border-white/5 p-8">
        <h3 className="text-white font-bold mb-4">Para Çekme Kuralları</h3>
        <ul className="space-y-2 text-xs text-gray-400 list-disc pl-4">
          <li>Banka hesabınıza hafta içi 09:30 - 15:00 arasında oluşturduğunuz tüm talepler gün sonuna kadar hesabınıza yatırılır.</li>
          <li>Banka hesabınıza hafta sonu 10:30 - 15:00 arasında oluşturduğunuz tüm talepler gün sonuna kadar hesabınıza yatırılır.</li>
          <li>Yukarıda belirtilen saatler dışında çekim yaptıysanız talebiniz ancak sonraki gün işleme alınabilir.</li>
          <li>İşleme alınan talepler en geç 24 saat içerisinde size ulaştırılır. 24 saat sonunda ulaşmayan tutarlar için lütfen destek talebi oluşturunuz.</li>
          <li>Hafta içi oluşturulan banka çekim taleplerinde işlem bedeli 20₺'dir.</li>
          <li>Hafta sonu oluşturulan banka çekim taleplerinde işlem bedeli 20₺'dir.</li>
          <li>Banka hesabınıza minimum 30₺ çekim yapabilirsiniz.</li>
          <li>Bir gün içerisinde yapılabilecek maksimum bakiye çekim limiti 25.000₺, mağaza üyelerimiz için ise 50.000₺'dir.</li>
          <li>Bakiye çekme işlemi için İTEMSATIŞ üyelik hesabınızın T.C. kimlik, telefon ve e-posta onayı olması zorunludur.</li>
          <li>"Bakiye Yükleme" işlemi yaparak hesabınıza yüklediğiniz bakiyenizi bu yöntem ile hesabınıza aktarmanız mümkün değildir. İTEMSATIŞ'ta yalnızca satıştan elde edilen gelirler için bakiye çekme talebinde bulunabilirsiniz. Yüklediğiniz bakiyenin iadesi için destek talebi oluşturunuz.</li>
          <li>İlan pazarında yaptığınız bir satış sebebiyle hakkınızda şikayet oluşturulmuşsa ise çekim talebiniz aynı gün gönderilmez ve sorun çözülene kadar bekletilir.</li>
          <li>Bakiye çekmek istediğiniz banka hesabı ile İTEMSATIŞ hesabınızda belirttiğiniz ismin aynı olması gerekmektedir. Aksi halde tutar size ulaşmayacaktır.</li>
        </ul>
        <p className="mt-4 text-xs text-red-500 font-medium">
          Dikkat! Destek sistemine; "bakiyem gelmedi, ne zaman gelir, acil lazım" demeniz süreci hızlandırmayacaktır. Destek sistemini çok fazla meşgul etmeniz durumunda moderatörler tarafından hesabınız bir süre askıya alınabilir.
        </p>
      </div>

      {/* History Table */}
      <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-white font-bold">Geçmiş Taleplerim</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#1a1d27] text-gray-400">
                <th className="px-6 py-4 font-medium">Talep Id</th>
                <th className="px-6 py-4 font-medium">Tutar</th>
                <th className="px-6 py-4 font-medium">Tarih</th>
                <th className="px-6 py-4 font-medium">Durum</th>
                <th className="px-6 py-4 font-medium">Çekim Yapılan Hesap</th>
                <th className="px-6 py-4 font-medium">İşlem Tarihi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="text-white hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">180410</td>
                <td className="px-6 py-4">322.50₺</td>
                <td className="px-6 py-4 text-gray-400">2 Şubat 2023 18:14</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">Onaylandı</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">AKBANK T.A.Ş.</div>
                  <div className="text-[10px] text-gray-500">TR63 0004 6002 4888 8000 1639 22</div>
                  <div className="text-[10px] text-gray-500">Çağlar Özbunar</div>
                </td>
                <td className="px-6 py-4 text-gray-400">3 Şubat 2023 16:14</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
