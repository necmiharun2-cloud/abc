import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Upload, Info, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export default function IlanEkle() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'VALORANT',
    subcategory: '',
    deliveryType: 'Otomatik Teslimat',
    stock: '1',
  });

  const categories = [
    'VALORANT', 'ROBLOX', 'STEAM', 'DISCORD', 'PUBG MOBILE', 'LEAGUE OF LEGENDS', 'CS2', 'GROWTOPIA', 'KNIGHT ONLINE', 'METIN2'
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('İlan eklemek için giriş yapmalısınız.');
      return;
    }

    if (!formData.title || !formData.price || !formData.description) {
      toast.error('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        sellerId: user.uid,
        sellerName: user.displayName || 'Anonim Satıcı',
        status: 'active',
        createdAt: new Date().toISOString(),
        image: `https://picsum.photos/seed/${Math.random()}/400/300`
      });

      toast.success('İlanınız başarıyla oluşturuldu!');
      navigate('/ilanlarim');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('İlan oluşturulurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#232736] rounded-2xl p-8 border border-white/5">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#5b68f6]/20 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-[#5b68f6]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Yeni İlan Oluştur</h1>
            <p className="text-gray-400 text-sm">Ürünlerinizi binlerce alıcıyla buluşturun.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">İlan Başlığı *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Örn: 100-150 Skinli Valorant Hesabı"
                className="w-full bg-[#1a1d27] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Kategori *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#1a1d27] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Fiyat (₺) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="w-full bg-[#1a1d27] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Stok Adedi</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#1a1d27] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">İlan Açıklaması *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              placeholder="Ürününüz hakkında detaylı bilgi verin..."
              className="w-full bg-[#1a1d27] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5b68f6] transition-colors resize-none"
            />
          </div>

          <div className="bg-[#1a1d27] rounded-xl p-6 border border-white/5">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Info className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Teslimat Bilgisi</h4>
                <p className="text-xs text-gray-400">
                  İlanınız onaylandıktan sonra alıcıya nasıl teslim edileceğini seçin. 
                  Otomatik teslimat seçeneği için ürün bilgilerini sisteme girmeniz gerekmektedir.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryType: 'Otomatik Teslimat' })}
                className={`p-4 rounded-xl border transition-all text-left ${
                  formData.deliveryType === 'Otomatik Teslimat'
                    ? 'bg-[#5b68f6]/10 border-[#5b68f6] text-white'
                    : 'bg-[#232736] border-white/5 text-gray-400 hover:border-white/10'
                }`}
              >
                <div className="text-sm font-bold mb-1">Otomatik Teslimat</div>
                <div className="text-[10px]">7/24 Anında Teslimat</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryType: 'Manuel Teslimat' })}
                className={`p-4 rounded-xl border transition-all text-left ${
                  formData.deliveryType === 'Manuel Teslimat'
                    ? 'bg-[#5b68f6]/10 border-[#5b68f6] text-white'
                    : 'bg-[#232736] border-white/5 text-gray-400 hover:border-white/10'
                }`}
              >
                <div className="text-sm font-bold mb-1">Manuel Teslimat</div>
                <div className="text-[10px]">Satıcı Onayı Gerekir</div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#5b68f6] hover:bg-[#4a55d6] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#5b68f6]/20 flex items-center gap-2"
            >
              {loading ? 'Oluşturuluyor...' : 'İlanı Yayınla'}
              {!loading && <CheckCircle2 className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#232736] p-6 rounded-2xl border border-white/5 space-y-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-sm font-bold text-white">Güvenli Alışveriş</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Tüm işlemler İtemsatış güvencesi altındadır. Ödemeler havuz sisteminde tutulur.
          </p>
        </div>
        <div className="bg-[#232736] p-6 rounded-2xl border border-white/5 space-y-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Upload className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-sm font-bold text-white">Hızlı Listeleme</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            İlanınız saniyeler içinde yayına girer ve binlerce kullanıcıya ulaşır.
          </p>
        </div>
        <div className="bg-[#232736] p-6 rounded-2xl border border-white/5 space-y-3">
          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-sm font-bold text-white">Düşük Komisyon</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Sektördeki en düşük komisyon oranlarıyla kazancınızı maksimize edin.
          </p>
        </div>
      </div>
    </div>
  );
}
