import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Package, Truck, CheckCircle2, AlertCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { chatService } from '../services/chatService';
import toast from 'react-hot-toast';

export default function OrderDetail() {
  const { id } = useParams();
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      setFetching(true);
      try {
        const orderDoc = await getDoc(doc(db, 'orders', id));
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
        } else {
          toast.error('Sipariş bulunamadı.');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Sipariş yüklenirken bir hata oluştu.');
      } finally {
        setFetching(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleMessageSeller = async () => {
    if (!user || !profile || !order) return;
    try {
      const chatId = await chatService.createChat(
        [user.uid, order.sellerId],
        {
          [user.uid]: {
            name: profile.username || user.displayName || 'Alıcı',
            avatar: profile.avatar || ''
          },
          [order.sellerId]: {
            name: order.sellerName || 'Satıcı',
            avatar: ''
          }
        }
      );
      navigate('/mesajlarim', { state: { activeChatId: chatId } });
    } catch (error) {
      toast.error('Sohbet başlatılamadı.');
    }
  };

  const updateOrderStatus = async (status: string) => {
    if (!order || !user) return;
    setUpdating(true);
    try {
      await updateDoc(doc(db, 'orders', order.id), {
        status,
        updatedAt: serverTimestamp(),
      });
      if (status === 'completed') {
        await addDoc(collection(db, 'notifications'), {
          userId: order.sellerId,
          title: 'Sipariş Tamamlandı',
          message: `#${order.id.slice(0, 8)} siparişi alıcı tarafından tamamlandı.`,
          type: 'success',
          isRead: false,
          createdAt: serverTimestamp(),
        });
      }
      setOrder((prev: any) => ({ ...prev, status }));
      toast.success('Sipariş durumu güncellendi.');
    } catch {
      toast.error('Durum güncellenemedi.');
    } finally {
      setUpdating(false);
    }
  };

  const openDispute = async () => {
    if (!order || !user) return;
    try {
      await addDoc(collection(db, 'disputes'), {
        orderId: order.id,
        buyerId: order.buyerId,
        sellerId: order.sellerId,
        reason: 'Kullanıcı siparişten anlaşmazlık bildirdi.',
        status: 'open',
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'orders', order.id), {
        status: 'disputed',
        updatedAt: serverTimestamp(),
      });
      setOrder((prev: any) => ({ ...prev, status: 'disputed' }));
      toast.success('Uyuşmazlık kaydı oluşturuldu.');
    } catch {
      toast.error('Uyuşmazlık açılamadı.');
    }
  };

  if (loading || fetching) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!order) return <div className="text-center py-20 text-white">Sipariş bulunamadı.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/siparislerim" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Siparişlerime Dön
      </Link>

      <div className="bg-[#232736] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Sipariş Detayı</h1>
            <p className="text-sm text-gray-400">#{order.id}</p>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-500' : 
            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
          }`}>
            {order.status === 'delivered' ? 'Teslim Edildi' : order.status === 'pending' ? 'Beklemede' : 'İptal Edildi'}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Progress Tracker */}
          <div className="relative flex justify-between">
            <div className="absolute top-5 left-0 w-full h-0.5 bg-white/5"></div>
            <div className={`absolute top-5 left-0 h-0.5 bg-[#5b68f6] transition-all duration-500 ${order.status === 'delivered' ? 'w-full' : 'w-1/2'}`}></div>
            
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#5b68f6] flex items-center justify-center text-white">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">Sipariş Alındı</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${order.status !== 'pending' ? 'bg-[#5b68f6]' : 'bg-[#1a1d27] border border-white/10'}`}>
                <Truck className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold ${order.status !== 'pending' ? 'text-white' : 'text-gray-500'}`}>Yolda / Hazırlanıyor</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${order.status === 'delivered' ? 'bg-emerald-500' : 'bg-[#1a1d27] border border-white/10'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold ${order.status === 'delivered' ? 'text-white' : 'text-gray-500'}`}>Teslim Edildi</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Ürün Bilgileri</h3>
              <div className="flex gap-4 bg-[#1a1d27] p-4 rounded-xl border border-white/5">
                <img src={order.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <h4 className="text-white font-bold mb-1">{order.productTitle}</h4>
                  <p className="text-[#5b68f6] font-bold">{order.price} ₺</p>
                  <p className="text-xs text-gray-500 mt-2">Satıcı: {order.sellerName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">İşlem Özeti</h3>
              <div className="bg-[#1a1d27] p-6 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ara Toplam</span>
                  <span className="text-white">{order.price} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Hizmet Bedeli</span>
                  <span className="text-white">0.00 ₺</span>
                </div>
                <div className="pt-3 border-t border-white/5 flex justify-between font-bold">
                  <span className="text-white">Toplam</span>
                  <span className="text-yellow-500">{order.price} ₺</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={openDispute}
              className="flex-1 bg-[#2b3142] hover:bg-[#32394d] text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              Sorun Bildir
            </button>
            <button 
              onClick={handleMessageSeller}
              className="flex-1 bg-[#5b68f6] hover:bg-[#4a55d6] text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Satıcıya Mesaj Gönder
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              disabled={updating || order.status === 'processing'}
              onClick={() => updateOrderStatus('processing')}
              className="bg-[#1a1d27] hover:bg-[#2b3142] disabled:opacity-50 text-white py-2 rounded-lg text-sm"
            >
              İşleniyor
            </button>
            <button
              disabled={updating || order.status === 'delivered'}
              onClick={() => updateOrderStatus('delivered')}
              className="bg-[#1a1d27] hover:bg-[#2b3142] disabled:opacity-50 text-white py-2 rounded-lg text-sm"
            >
              Teslim Edildi
            </button>
            <button
              disabled={updating || order.status === 'completed'}
              onClick={() => updateOrderStatus('completed')}
              className="bg-[#1a1d27] hover:bg-[#2b3142] disabled:opacity-50 text-white py-2 rounded-lg text-sm"
            >
              Tamamlandı
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
