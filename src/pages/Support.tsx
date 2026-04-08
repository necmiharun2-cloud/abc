import { MessageSquare, PlusCircle, Headphones, ChevronRight, ChevronDown, Clock, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, addDoc, serverTimestamp, orderBy, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', category: 'Genel', message: '' });
  const [tickets, setTickets] = useState<any[]>([]);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'support_tickets'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTickets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTickets(fetchedTickets);
    });

    return unsubscribe;
  }, [user]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Giriş yapmalısınız.');
      return;
    }
    if (!newTicket.subject || !newTicket.message) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await addDoc(collection(db, 'support_tickets'), {
        userId: user.uid,
        subject: newTicket.subject,
        category: newTicket.category,
        message: newTicket.message,
        status: 'Beklemede',
        createdAt: serverTimestamp()
      });

      setIsModalOpen(false);
      setNewTicket({ subject: '', category: 'Genel', message: '' });
      toast.success('Destek talebiniz başarıyla oluşturuldu!');
    } catch (error) {
      toast.error('Talep oluşturulurken bir hata oluştu.');
    }
  };

  const handleLiveSupport = () => {
    toast.success('Canlı destek operatörüne bağlanılıyor...');
    setTimeout(() => {
      navigate('/mesajlarim');
    }, 1500);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#5b68f6]/10 rounded-2xl flex items-center justify-center border border-[#5b68f6]/20">
            <Headphones className="w-8 h-8 text-[#5b68f6]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Destek Merkezi</h1>
            <p className="text-gray-400 text-sm">Size nasıl yardımcı olabiliriz? Taleplerinizi buradan iletebilirsiniz.</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
          >
            <PlusCircle className="w-5 h-5" />
            Destek Talebi Oluştur
          </button>
          <button 
            onClick={handleLiveSupport}
            className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <MessageSquare className="w-5 h-5" />
            Canlı Desteğe Bağlan
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#232736] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{tickets.length}</div>
            <div className="text-xs text-gray-400">Toplam Talep</div>
          </div>
        </div>
        <div className="bg-[#232736] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{tickets.filter(t => t.status === 'Cevaplandı').length}</div>
            <div className="text-xs text-gray-400">Cevaplanan</div>
          </div>
        </div>
        <div className="bg-[#232736] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{tickets.filter(t => t.status === 'Beklemede').length}</div>
            <div className="text-xs text-gray-400">Bekleyen</div>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-[#232736] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Geçmiş Destek Taleplerim</h2>
          <div className="text-xs text-gray-400">Son 30 güne ait talepler gösterilmektedir.</div>
        </div>
        
        <div className="divide-y divide-white/5">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="hover:bg-white/[0.02] transition-colors">
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer" onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a1d27] rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-500">#{ticket.id.slice(0, 6)}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{ticket.subject}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ticket.createdAt?.toDate ? ticket.createdAt.toDate().toLocaleString('tr-TR') : 'Yeni'}
                      </span>
                      <span className={`flex items-center gap-1 font-bold ${ticket.status === 'Cevaplandı' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'Cevaplandı' ? 'bg-emerald-400' : 'bg-yellow-400'}`}></div>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  className="flex items-center gap-2 text-[#5b68f6] hover:text-white transition-colors text-sm font-bold group"
                >
                  Talebi Gör
                  {expandedTicket === ticket.id ? (
                    <ChevronDown className="w-4 h-4 transition-transform" />
                  ) : (
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
              {expandedTicket === ticket.id && (
                <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#1a1d27]/50">
                  <div className="text-sm text-gray-300 whitespace-pre-wrap">
                    <span className="font-bold text-white block mb-2">Mesajınız:</span>
                    {ticket.message}
                  </div>
                  {ticket.reply && (
                    <div className="mt-4 p-4 bg-[#5b68f6]/10 rounded-lg border border-[#5b68f6]/20 text-sm text-gray-300 whitespace-pre-wrap">
                      <span className="font-bold text-[#5b68f6] block mb-2">Destek Ekibi:</span>
                      {ticket.reply}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {tickets.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              Henüz bir destek talebiniz bulunmuyor.
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#232736] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Yeni Destek Talebi</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Konu</label>
                <input 
                  type="text" 
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                  placeholder="Talebinizin konusunu giriniz..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Kategori</label>
                <select 
                  value={newTicket.category}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                >
                  <option value="Genel">Genel</option>
                  <option value="Ödeme İşlemleri">Ödeme İşlemleri</option>
                  <option value="İlan İşlemleri">İlan İşlemleri</option>
                  <option value="Hesap Güvenliği">Hesap Güvenliği</option>
                  <option value="Şikayet">Şikayet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Mesajınız</label>
                <textarea 
                  rows={5}
                  value={newTicket.message}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors resize-none"
                  placeholder="Sorununuzu detaylıca açıklayınız..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#5b68f6] hover:bg-[#4a55d6] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-500/20"
              >
                Talebi Oluştur
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
