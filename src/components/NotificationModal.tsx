import { useState, useEffect } from 'react';
import { X, BellOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Sadece ilk girişte göstermek için localStorage kontrolü
    const hasSeenModal = localStorage.getItem('hasSeenNotificationModal');
    if (!hasSeenModal) {
      // Sayfa yüklendikten kısa bir süre sonra göster (daha doğal bir his için)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNotificationModal', 'true');
  };

  const handleEnableNotifications = () => {
    toast.success('Bildirimleri açmak için tarayıcı adres çubuğundaki kilit ikonuna tıklayıp "Bildirimler" seçeneğini aktif edebilirsiniz.', {
      duration: 6000,
      icon: '🔔'
    });
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#2b3142] rounded-2xl p-8 max-w-[500px] w-full relative shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
        {/* Kapatma Butonu */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* İkon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <BellOff className="w-16 h-16 text-[#ff6b6b]" strokeWidth={1.5} />
            {/* Zzz efekti için küçük detaylar eklenebilir, şimdilik BellOff kullanıyoruz */}
          </div>
        </div>

        {/* Başlık */}
        <h2 className="text-xl font-bold text-white text-center mb-4">
          Bildirim İznine İhtiyacımız Var!
        </h2>

        {/* Metin 1 */}
        <p className="text-gray-300 text-center text-sm mb-4 leading-relaxed">
          Tarayıcınızda bildirimler engellendiği için size bildirim gönderemiyoruz. Satın aldığınız ilanlar, kullanıcılarla mesajlaşmalar gibi önemli işlemlerinizi size iletemiyoruz.
        </p>

        {/* Metin 2 (Kırmızı) */}
        <p className="text-[#ff6b6b] text-center text-sm mb-8 leading-relaxed">
          Bildirimlere nasıl izin vereceğinizi bilmiyorsanız lütfen aşağıdaki izinleri aç butonuna tıklayın ve yönlendirilen sayfayı inceleyin.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleEnableNotifications}
            className="w-full sm:w-auto bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Bildirim İzinlerini Aç
          </button>
          <button 
            onClick={handleClose}
            className="w-full sm:w-auto bg-[#4b5563] hover:bg-[#374151] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Hayır, İstemiyorum
          </button>
        </div>
      </div>
    </div>
  );
}
