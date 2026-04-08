import { 
  Wallet, ArrowUpRight, ArrowDownRight, Package, Trophy, 
  ChevronDown, User, Shield, CreditCard, Settings, LifeBuoy,
  Bell, History, Landmark, UserCircle, Image, Link as LinkIcon,
  Star, Lock, Smartphone, Globe, Receipt, Gift, Eye, Plus, Trash2
} from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { updatePassword, updateEmail } from 'firebase/auth';
import { doc, updateDoc, collection, query, where, getDocs, orderBy, addDoc, deleteDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import toast from 'react-hot-toast';
import ConfirmationModal from '../components/ConfirmationModal';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const [activeView, setActiveView] = useState('summary');

  useEffect(() => {
    if (location.state?.activeView) {
      setActiveView(location.state.activeView);
    }
  }, [location.state]);
  const [openSections, setOpenSections] = useState({
    hesap: true,
    profil: false,
    guvenlik: true,
    banka: false,
    izinler: false
  });

  const [personalInfo, setPersonalInfo] = useState({
    username: '',
    avatar: '',
  });

  const [notifications, setNotifications] = useState({
    orders: true,
    messages: true,
    system: true,
    marketing: false
  });

  const [banks, setBanks] = useState<any[]>([]);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [newBank, setNewBank] = useState({ bankName: '', iban: '', accountHolder: '' });
  const [isSeedModalOpen, setIsSeedModalOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      setPersonalInfo({
        username: profile.username || '',
        avatar: profile.avatar || '',
      });
      if (profile.notifications) {
        setNotifications(profile.notifications);
      }
    }
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    const fetchBanks = async () => {
      const q = query(collection(db, 'users', user.uid, 'banks'));
      const snapshot = await getDocs(q);
      setBanks(snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) })));
    };
    fetchBanks();
  }, [user]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        username: personalInfo.username,
        avatar: personalInfo.avatar
      });
      toast.success('Profil bilgileriniz güncellendi.');
    } catch (error) {
      toast.error('Güncelleme başarısız oldu.');
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const form = e.target as HTMLFormElement;
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    if (!newPassword || newPassword.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Şifreler uyuşmuyor.');
      return;
    }

    try {
      await updatePassword(user, newPassword);
      toast.success('Şifreniz başarıyla güncellendi.');
      form.reset();
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Bu işlem için yakın zamanda giriş yapmış olmalısınız. Lütfen tekrar giriş yapın.');
      } else {
        toast.error('Şifre güncellenirken bir hata oluştu.');
      }
    }
  };

  const handleUpdateEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const form = e.target as HTMLFormElement;
    const newEmail = (form.elements.namedItem('newEmail') as HTMLInputElement).value;

    if (!newEmail || !newEmail.includes('@')) {
      toast.error('Geçersiz e-posta adresi.');
      return;
    }

    try {
      await updateEmail(user, newEmail);
      toast.success('E-posta adresiniz güncellendi.');
      form.reset();
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Bu işlem için yakın zamanda giriş yapmış olmalısınız. Lütfen tekrar giriş yapın.');
      } else {
        toast.error('E-posta güncellenirken bir hata oluştu.');
      }
    }
  };

  const handleUpdateNotifications = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        notifications
      });
      toast.success('Bildirim ayarlarınız kaydedildi.');
    } catch (error) {
      toast.error('Ayarlar kaydedilemedi.');
    }
  };

  const handleAddBank = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const ibanRegex = /^TR\d{24}$/;
    const cleanIban = newBank.iban.replace(/\s/g, '');

    if (!newBank.bankName || !newBank.iban || !newBank.accountHolder) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    if (!ibanRegex.test(cleanIban)) {
      toast.error('Geçersiz IBAN formatı. (TR ile başlamalı ve 26 karakter olmalıdır)');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'banks'), {
        ...newBank,
        iban: cleanIban,
        createdAt: serverTimestamp()
      });
      setBanks([...banks, { id: docRef.id, ...newBank, iban: cleanIban }]);
      setNewBank({ bankName: '', iban: '', accountHolder: '' });
      setIsAddingBank(false);
      toast.success('Banka hesabı eklendi.');
    } catch (error) {
      toast.error('Banka hesabı eklenemedi.');
    }
  };

  const handleDeleteBank = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'banks', id));
      setBanks(banks.filter(b => b.id !== id));
      toast.success('Banka hesabı silindi.');
    } catch (error) {
      toast.error('Banka hesabı silinemedi.');
    }
  };

  const handleAddBalance = async () => {
    if (!user || !profile) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        balance: profile.balance + 100
      });
      toast.success('Bakiyenize 100 ₺ eklendi! (Test Modu)');
    } catch (error) {
      toast.error('Bakiye eklenemedi.');
    }
  };

  const handleSeedData = async () => {
    if (!user) return;
    
    try {
      const batch = writeBatch(db);
      const sampleProducts = [
        {
          title: '100-150 Skinli Valorant Hesabı',
          category: 'VALORANT',
          price: 450,
          oldPrice: 550,
          description: 'İçinde ejder vandal ve yağmacı bıçak bulunan dolu hesap.',
          sellerId: user.uid,
          sellerName: profile?.username || user.displayName || 'Test Satıcı',
          sellerAvatar: profile?.avatar || 'https://picsum.photos/seed/u1/40/40',
          image: 'https://picsum.photos/seed/v1/400/300',
          status: 'active',
          isVitrin: true,
          type: 'sell',
          createdAt: serverTimestamp()
        },
        {
          title: 'Roblox 10.000 Robux - Hızlı Teslimat',
          category: 'ROBLOX',
          price: 250,
          description: 'Anında teslimat garantili robux.',
          sellerId: user.uid,
          sellerName: profile?.username || user.displayName || 'Test Satıcı',
          sellerAvatar: profile?.avatar || 'https://picsum.photos/seed/u1/40/40',
          image: 'https://picsum.photos/seed/r1/400/300',
          status: 'active',
          isVitrin: true,
          type: 'sell',
          createdAt: serverTimestamp()
        },
        {
          title: 'Steam 50 TL Cüzdan Kodu',
          category: 'STEAM',
          price: 45,
          oldPrice: 50,
          description: 'Global geçerli steam cüzdan kodu.',
          sellerId: user.uid,
          sellerName: profile?.username || user.displayName || 'Test Satıcı',
          sellerAvatar: profile?.avatar || 'https://picsum.photos/seed/u1/40/40',
          image: 'https://picsum.photos/seed/s1/400/300',
          status: 'active',
          isVitrin: false,
          type: 'sell',
          createdAt: serverTimestamp()
        },
        {
          title: 'Discord 1 Aylık Nitro Boost',
          category: 'DISCORD',
          price: 35,
          description: 'Kendi hesabınıza tanımlanan nitro boost.',
          sellerId: user.uid,
          sellerName: profile?.username || user.displayName || 'Test Satıcı',
          sellerAvatar: profile?.avatar || 'https://picsum.photos/seed/u1/40/40',
          image: 'https://picsum.photos/seed/d1/400/300',
          status: 'active',
          isVitrin: true,
          type: 'sell',
          createdAt: serverTimestamp()
        }
      ];

      sampleProducts.forEach(product => {
        const newDocRef = doc(collection(db, 'products'));
        batch.set(newDocRef, product);
      });

      await batch.commit();
      toast.success('Örnek ilanlar başarıyla oluşturuldu! Anasayfayı kontrol edebilirsiniz.');
    } catch (error) {
      console.error('Seed error:', error);
      toast.error('Veri oluşturulurken bir hata oluştu.');
    }
  };

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-[280px] shrink-0 space-y-4">
        {/* User Card */}
        <div className="bg-[#232736] rounded-xl border border-white/5 p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 border-[#1a1d27]">
            {profile?.avatar ? (
              <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#5b68f6] flex items-center justify-center text-3xl text-white font-bold">
                {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-lg font-bold text-white">{profile?.username || user.displayName || 'Kullanıcı'}</h2>
          <p className="text-emerald-400 font-semibold text-lg mt-1">{profile?.balance?.toFixed(2) || '0.00'} ₺</p>
          
          <div className="flex gap-2 w-full mt-4">
            <button 
              onClick={handleAddBalance}
              className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Bakiye Yükle
            </button>
            <Link to="/para-cek" className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              Para Çek
            </Link>
          </div>
          <button 
            onClick={() => setIsSeedModalOpen(true)}
            className="w-full mt-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            Örnek İlanları Yükle
          </button>
        </div>

          {/* Navigation Menu */}
          <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
            {/* Hesap Section */}
            <div>
              <button 
                onClick={() => toggleSection('hesap')}
                className={`w-full flex items-center justify-between p-4 transition-colors ${openSections.hesap ? 'bg-white/5 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3 font-medium">
                  <User className="w-5 h-5" />
                  Hesap
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${openSections.hesap ? 'rotate-180' : ''}`} />
              </button>
              {openSections.hesap && (
                <div className="bg-[#1a1d27] py-2">
                  <button 
                    onClick={() => setActiveView('summary')} 
                    className={`w-full flex items-center gap-3 px-12 py-2.5 text-sm text-left transition-colors ${activeView === 'summary' ? 'text-white bg-white/5 border-l-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    Hesap Özeti
                  </button>
                  <button onClick={() => setActiveView('personal-info')} className={`w-full flex items-center gap-3 px-12 py-2.5 text-sm text-left transition-colors ${activeView === 'personal-info' ? 'text-white bg-white/5 border-l-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    Kişisel Bilgiler
                  </button>
                  <button onClick={() => setActiveView('notifications')} className={`w-full flex items-center gap-3 px-12 py-2.5 text-sm text-left transition-colors ${activeView === 'notifications' ? 'text-white bg-white/5 border-l-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    Bildirim Ayarları
                  </button>
                </div>
              )}
            </div>

            {/* Güvenlik Section */}
            <div>
              <button 
                onClick={() => toggleSection('guvenlik')}
                className={`w-full flex items-center justify-between p-4 transition-colors border-t border-white/5 ${openSections.guvenlik ? 'bg-white/5 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3 font-medium">
                  <Shield className="w-5 h-5" />
                  Güvenlik
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${openSections.guvenlik ? 'rotate-180' : ''}`} />
              </button>
              {openSections.guvenlik && (
                <div className="bg-[#1a1d27] py-2">
                  <button 
                    onClick={() => setActiveView('security')} 
                    className={`w-full flex items-center gap-3 px-12 py-2.5 text-sm text-left transition-colors ${activeView === 'security' ? 'text-white bg-white/5 border-l-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    Şifre & Mail Değiştir
                  </button>
                </div>
              )}
            </div>

            {/* Banka & Bakiye Section */}
            <div>
              <button 
                onClick={() => toggleSection('banka')}
                className={`w-full flex items-center justify-between p-4 transition-colors border-t border-white/5 ${openSections.banka ? 'bg-white/5 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3 font-medium">
                  <CreditCard className="w-5 h-5" />
                  Banka & Bakiye
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${openSections.banka ? 'rotate-180' : ''}`} />
              </button>
              {openSections.banka && (
                <div className="bg-[#1a1d27] py-2">
                  <button onClick={() => setActiveView('banks')} className={`w-full flex items-center gap-3 px-12 py-2.5 text-sm text-left transition-colors ${activeView === 'banks' ? 'text-white bg-white/5 border-l-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    Banka Hesapları
                  </button>
                  <button onClick={() => setActiveView('balance')} className={`w-full flex items-center gap-3 px-12 py-2.5 text-sm text-left transition-colors ${activeView === 'balance' ? 'text-white bg-white/5 border-l-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    Bakiye Hareketleri
                  </button>
                </div>
              )}
            </div>

            {/* Destek Section */}
            <div>
              <Link to="/destek-sistemi" className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">
                <div className="flex items-center gap-3 font-medium">
                  <LifeBuoy className="w-5 h-5" />
                  Destek Sistemi
                </div>
              </Link>
            </div>
          </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {activeView === 'summary' && (
          <>
            {/* Hesap Özeti */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Hesap Özeti</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[#232736] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hesap Bakiyesi</p>
                    <p className="text-xl font-bold text-white">{profile?.balance?.toFixed(2) || '0.00'} ₺</p>
                  </div>
                </div>
                <div className="bg-[#232736] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Package className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Satılan Toplam İlan</p>
                    <p className="text-xl font-bold text-white">{profile?.soldCount || 0}</p>
                  </div>
                </div>
                <div className="bg-[#232736] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Çekilebilir Tutar</p>
                    <p className="text-xl font-bold text-white">{profile?.balance?.toFixed(2) || '0.00'} ₺</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Topluluk Özeti */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Topluluk Özeti</h2>
              <div className="bg-[#232736] p-6 rounded-xl border border-white/5 flex items-center gap-6">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-full bg-[#1a1d27] border-4 border-blue-500 flex items-center justify-center flex-col">
                    <span className="text-[10px] text-gray-400 font-bold">SEVİYE</span>
                    <span className="text-2xl font-bold text-white leading-none">2</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-yellow-400">
                    <Trophy className="w-6 h-6 fill-current" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">+45 EXP seviye atlamak için gerekiyor</span>
                    <span className="text-gray-400">45 toplam exp</span>
                  </div>
                  <div className="h-2 bg-[#1a1d27] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[50%]"></div>
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">50%</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'personal-info' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Kişisel Bilgiler</h2>
            <form onSubmit={handleUpdateProfile} className="bg-[#232736] rounded-xl border border-white/5 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Kullanıcı Adı</label>
                  <input 
                    type="text" 
                    value={personalInfo.username}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, username: e.target.value })}
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Avatar URL</label>
                  <input 
                    type="text" 
                    value={personalInfo.avatar}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, avatar: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6]" 
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-8 py-2.5 rounded-lg font-bold transition-colors"
              >
                Bilgileri Kaydet
              </button>
            </form>
          </div>
        )}

        {activeView === 'security' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Güvenlik Ayarları</h2>
            <div className="bg-[#232736] rounded-xl border border-white/5 p-6 space-y-6">
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <h3 className="text-white font-bold">Şifre Değiştir</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Yeni Şifre</label>
                    <input name="newPassword" type="password" placeholder="••••••••" className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Yeni Şifre (Tekrar)</label>
                    <input name="confirmPassword" type="password" placeholder="••••••••" className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6]" />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Şifreyi Güncelle
                </button>
              </form>

              <form onSubmit={handleUpdateEmail} className="pt-6 border-t border-white/5 space-y-4">
                <h3 className="text-white font-bold">E-Posta Değiştir</h3>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Yeni E-Posta Adresi</label>
                  <input name="newEmail" type="email" placeholder={user.email || ''} className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6]" />
                </div>
                <button 
                  type="submit"
                  className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  E-Postayı Güncelle
                </button>
              </form>
            </div>
          </div>
        )}

        {activeView === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Bildirim Ayarları</h2>
            <div className="bg-[#232736] rounded-xl border border-white/5 p-6 space-y-4">
              {[
                { id: 'orders', label: 'Yeni Sipariş Bildirimleri', desc: 'Bir ürününüz satıldığında bildirim alın.' },
                { id: 'messages', label: 'Mesaj Bildirimleri', desc: 'Yeni bir mesaj aldığınızda bildirim alın.' },
                { id: 'system', label: 'Sistem Duyuruları', desc: 'Önemli güncellemeler ve duyurular hakkında bilgi alın.' },
                { id: 'marketing', label: 'Kampanya ve Fırsatlar', desc: 'Size özel indirimlerden haberdar olun.' }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-[#1a1d27] rounded-lg border border-white/5">
                  <div>
                    <h4 className="text-white font-medium">{item.label}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifications] }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notifications[item.id as keyof typeof notifications] ? 'bg-[#5b68f6]' : 'bg-gray-600'}`}
                  >
                    <span className={`${notifications[item.id as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                  </button>
                </div>
              ))}
              <button 
                onClick={handleUpdateNotifications}
                className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-8 py-2.5 rounded-lg font-bold transition-colors mt-4"
              >
                Ayarları Kaydet
              </button>
            </div>
          </div>
        )}

        {activeView === 'banks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Banka Hesapları</h2>
              <button 
                onClick={() => setIsAddingBank(true)}
                className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Yeni Hesap Ekle
              </button>
            </div>

            {isAddingBank && (
              <form onSubmit={handleAddBank} className="bg-[#232736] rounded-xl border border-white/5 p-6 mb-6 space-y-4">
                <h3 className="text-white font-bold mb-4">Yeni Banka Hesabı Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Banka Adı</label>
                    <input 
                      type="text" 
                      value={newBank.bankName}
                      onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })}
                      placeholder="Örn: Ziraat Bankası" 
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Hesap Sahibi</label>
                    <input 
                      type="text" 
                      value={newBank.accountHolder}
                      onChange={(e) => setNewBank({ ...newBank, accountHolder: e.target.value })}
                      placeholder="Ad Soyad" 
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6]" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-gray-400">IBAN</label>
                    <input 
                      type="text" 
                      value={newBank.iban}
                      onChange={(e) => setNewBank({ ...newBank, iban: e.target.value })}
                      placeholder="TR00 0000 0000 0000 0000 0000 00" 
                      className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6]" 
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit"
                    className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-6 py-2 rounded-lg font-bold transition-colors"
                  >
                    Kaydet
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAddingBank(false)}
                    className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map(bank => (
                <div key={bank.id} className="bg-[#232736] rounded-xl border border-white/5 p-6 relative group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{bank.bankName}</h3>
                      <p className="text-sm text-gray-400">{bank.accountHolder}</p>
                    </div>
                  </div>
                  <div className="bg-[#1a1d27] p-3 rounded-lg border border-white/5">
                    <p className="text-sm text-gray-300 font-mono tracking-wider">{bank.iban}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteBank(bank.id)}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {banks.length === 0 && !isAddingBank && (
                <div className="col-span-full bg-[#232736] rounded-xl border border-white/5 p-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                      <Landmark className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Kayıtlı banka hesabı bulunamadı</h3>
                      <p className="text-sm text-gray-400">Para çekme işlemleri için bir banka hesabı eklemelisiniz.</p>
                    </div>
                    <button 
                      onClick={() => setIsAddingBank(true)}
                      className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                      Yeni Hesap Ekle
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === 'balance' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Bakiye Hareketleri</h2>
            <div className="bg-[#232736] rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-xs text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">İşlem</th>
                    <th className="px-6 py-4 font-bold">Tarih</th>
                    <th className="px-6 py-4 font-bold">Tutar</th>
                    <th className="px-6 py-4 font-bold">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">Bakiye Yükleme (Test)</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">Bugün</td>
                    <td className="px-6 py-4 text-sm text-emerald-500 font-bold">+100.00 ₺</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded uppercase">Tamamlandı</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal 
        isOpen={isSeedModalOpen}
        onClose={() => setIsSeedModalOpen(false)}
        onConfirm={handleSeedData}
        title="Test Verisi Oluştur"
        message="Hesabınız için örnek ilanlar oluşturulacaktır. Onaylıyor musunuz?"
        confirmText="Evet, Oluştur"
        cancelText="Vazgeç"
        type="info"
      />
    </div>
  );
}
