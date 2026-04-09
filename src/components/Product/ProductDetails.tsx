import { RefreshCw, Star, MessageCircle, Shield, HelpCircle, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

interface ProductDetailsProps {
  product: any;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!product.id) return;
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', product.id),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [product.id]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Değerlendirme yapmak için giriş yapmalısınız.');
      return;
    }
    if (newReview.comment.length < 10) {
      toast.error('Değerlendirme en az 10 karakter olmalıdır.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        productId: product.id,
        userId: user.uid,
        userName: profile?.username || user.displayName || 'Anonim',
        userAvatar: profile?.avatar || user.photoURL || '',
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: serverTimestamp()
      });
      setNewReview({ rating: 5, comment: '' });
      toast.success('Değerlendirmemiz için teşekkürler!');
    } catch (error) {
      toast.error('Değerlendirme gönderilemedi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Price History & Alternatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#232736] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-sm text-white font-medium mb-6">
            <svg className="w-4 h-4 text-[#5b68f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            Son 30 Gün Fiyat Geçmişi
          </div>
          <div className="h-24 flex items-end gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex-1 bg-[#2b3142] rounded-t" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-2">
            <span>1 Ay Önce</span>
            <span>Bugün</span>
          </div>
        </div>

        <div className="bg-[#232736] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-sm text-white font-medium mb-4">
            <RefreshCw className="w-4 h-4 text-emerald-500" />
            Akıllı Alternatif Önerileri
          </div>
          <div className="space-y-3">
            <div 
              onClick={() => toast.success('Alternatif ürünler yakında eklenecek!')}
              className="bg-[#2b3142] rounded p-3 flex justify-between items-center cursor-pointer hover:bg-[#32394d] transition-colors"
            >
              <div>
                <div className="text-xs text-white font-medium">Daha Hızlı Teslimat Yapan Satıcı</div>
                <div className="text-[10px] text-gray-400">Ort. Yanıt: 2dk • FastSeller</div>
              </div>
              <div className="text-emerald-500 font-bold text-sm">{(product.price * 0.9).toFixed(2)} ₺</div>
            </div>
            <div 
              onClick={() => toast.success('Alternatif ürünler yakında eklenecek!')}
              className="bg-[#2b3142] rounded p-3 flex justify-between items-center cursor-pointer hover:bg-[#32394d] transition-colors"
            >
              <div>
                <div className="text-xs text-white font-medium">Daha Güvenilir Satıcı (Risk: 0)</div>
                <div className="text-[10px] text-gray-400">10.000+ İşlem • ProSeller</div>
              </div>
              <div className="text-[#5b68f6] font-bold text-sm">{(product.price * 1.1).toFixed(2)} ₺</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
        <div className="flex border-b border-white/5">
          <button 
            onClick={() => setActiveTab('description')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'description' ? 'bg-[#5b68f6] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2b3142]'}`}
          >
            Açıklama
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'reviews' ? 'bg-[#5b68f6] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2b3142]'}`}
          >
            Değerlendirme ({reviews.length})
          </button>
          <button 
            onClick={() => setActiveTab('safety')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'safety' ? 'bg-[#5b68f6] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2b3142]'}`}
          >
            Güvenli Ticaret
          </button>
          <button 
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'qa' ? 'bg-[#5b68f6] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2b3142]'}`}
          >
            Soru & Cevap
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'description' && (
            <>
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#2b3142] p-4 rounded-lg">
                  <div className="text-[10px] text-[#5b68f6] font-medium mb-1">Gönderim Süresi</div>
                  <div className="text-white font-bold">1-24 Saat</div>
                </div>
                <div className="bg-[#2b3142] p-4 rounded-lg">
                  <div className="text-[10px] text-[#5b68f6] font-medium mb-1">Garanti Süresi</div>
                  <div className="text-white font-bold">7 Gün</div>
                </div>
                <div className="bg-[#2b3142] p-4 rounded-lg">
                  <div className="text-[10px] text-[#5b68f6] font-medium mb-1">Gönderim Lokasyonu</div>
                  <div className="text-white font-bold">Karışık</div>
                </div>
              </div>

              {/* Description Content */}
              <div className="space-y-6 text-sm">
                <div>
                  <h3 className="text-white font-bold underline underline-offset-4 mb-4">{product.title} ilanımıza Hoşgeldiniz.</h3>
                  
                  <div className="text-red-500 font-bold mb-2">📌 Nasıl Teslim Edilir?</div>
                  <p className="text-white font-medium mb-2">İlanımızı Satın Aldığınızda Bize İlettiğiniz Link Gelir, O Linke Gönderimi Sağlarız.</p>
                  <p className="text-red-500 font-medium">Hesabınızın Gizli Olmaması Gerekir. Şayet Bu Gönderimi İmkansız Hale Kılar ve Gönderimi İptal Edemediğim İçin İade Olmaz.</p>
                </div>

                <div>
                  <div className="text-yellow-500 font-bold mb-2">😱 Sorun Yaşadım:</div>
                  <p className="text-[#5b68f6] font-medium">Sorun Yaşadığınız Takdirde Kişisel Olarak Sorununuzla İlgileniyorum, Eğer Sorunu Çözemiyorsam Anında İadenizi Veriyorum.</p>
                </div>

                <div>
                  <div className="text-yellow-500 font-bold mb-2">😉 Peki Niye Bu İlan:</div>
                  <p className="text-white font-medium">Kaliteden Ödün Vermeden Olabilecek En Ucuz Fiyattan Satış Sağlamaya Çalışıyorum, Bende Bir İnsan ve Yeri Geldiğinde Bir Müşteri oluyorum.</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Add Review Form */}
              {user && (
                <form onSubmit={handleAddReview} className="bg-[#1a1d27] p-6 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    Değerlendirme Yap
                  </h4>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        className={`transition-colors ${newReview.rating >= star ? 'text-yellow-500' : 'text-gray-600'}`}
                      >
                        <Star className={`w-6 h-6 ${newReview.rating >= star ? 'fill-yellow-500' : ''}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Ürün ve satıcı hakkındaki görüşlerinizi paylaşın..."
                    className="w-full bg-[#232736] border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-[#5b68f6] transition-colors resize-none mb-4"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#5b68f6] hover:bg-[#4a55d6] disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Gönder
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <img src={review.userAvatar || `https://picsum.photos/seed/${review.userId}/40/40`} className="w-10 h-10 rounded-full shrink-0" alt="" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-bold text-sm">{review.userName}</span>
                        <span className="text-gray-500 text-[10px]">
                          {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString('tr-TR') : 'Yeni'}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                ))}
                {reviews.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Henüz değerlendirme yapılmamış.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <Shield className="w-6 h-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-white font-bold mb-1">Güvenli Ticaret Sistemi</h4>
                  <p className="text-gray-400 text-sm">Ödemeniz havuz hesabımızda tutulur. Ürünü teslim alıp onaylayana kadar satıcıya aktarılmaz.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#1a1d27] rounded-xl border border-white/5">
                  <div className="text-[#5b68f6] font-bold mb-2">1. Adım</div>
                  <p className="text-gray-300 text-xs">Ürünü satın alın, ödeme havuz hesabına geçsin.</p>
                </div>
                <div className="p-4 bg-[#1a1d27] rounded-xl border border-white/5">
                  <div className="text-[#5b68f6] font-bold mb-2">2. Adım</div>
                  <p className="text-gray-300 text-xs">Satıcı ürünü size teslim etsin.</p>
                </div>
                <div className="p-4 bg-[#1a1d27] rounded-xl border border-white/5">
                  <div className="text-[#5b68f6] font-bold mb-2">3. Adım</div>
                  <p className="text-gray-300 text-xs">Ürünü kontrol edin ve onay verin.</p>
                </div>
                <div className="p-4 bg-[#1a1d27] rounded-xl border border-white/5">
                  <div className="text-[#5b68f6] font-bold mb-2">4. Adım</div>
                  <p className="text-gray-300 text-xs">Ödeme satıcıya aktarılsın.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">Soru & Cevap Bölümü</h4>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">Bu bölüm yakında aktif edilecektir. Satıcıya doğrudan mesaj göndererek sorularınızı iletebilirsiniz.</p>
            </div>
          )}
        </div>
      </div>

      {/* Discord Banner */}
      <div className="bg-[#232736] rounded-xl p-6 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm">D</div>
            <span className="text-white font-medium text-sm">Discord Mağaza Sunucumuz Aktif!</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Duyurular ve sohbet için hemen Discord sunucumuza katılın!</h3>
          <p className="text-gray-400 text-sm mb-6">En yeni ilan duyuruları, özel kampanyalar ve 7/24 destek için mağaza Discord kanalımızda olun.</p>
          <button 
            onClick={() => window.open('https://discord.com', '_blank')}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Hemen Katıl!
          </button>
        </div>
      </div>
    </div>
  );
}
