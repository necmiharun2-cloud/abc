import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, missingFirebaseEnvKeys } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }
    if (missingFirebaseEnvKeys.length > 0) {
      toast.error('Firebase ayarları eksik. Sistem yöneticisiyle iletişime geçin.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with username
      await updateProfile(user, { displayName: username });

      // Save user to Firestore
      const newProfile = {
        uid: user.uid,
        username,
        email,
        avatar: '',
        bio: '',
        balance: 0,
        role: 'user',
        accountStatus: 'active',
        salesEnabled: true,
        riskNote: '',
        createdAt: new Date().toISOString(),
        listingCount: 0,
        soldCount: 0,
        rating: 0,
        reviewCount: 0,
        storeLevel: 'standard',
        isVerifiedSeller: false,
        kycStatus: 'none',
        kycReferenceId: '',
        notifications: {
          orders: true,
          messages: true,
          system: true,
          marketing: false,
        },
      };
      await setDoc(doc(db, 'users', user.uid), newProfile);

      toast.success('Kayıt başarılı! Yönlendiriliyorsunuz...');
      navigate('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Bu e-posta adresi zaten kullanımda.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Şifre en az 6 karakter olmalıdır.');
      } else if (error.code === 'auth/operation-not-allowed') {
        toast.error('E-posta/Şifre girişi Firebase konsolundan aktifleştirilmemiş!');
      } else if (error.code === 'auth/invalid-api-key' || error.code === 'auth/api-key-not-valid') {
        toast.error('Sistem yapılandırması eksik. Lütfen destekle iletişime geçin.');
      } else if (error.code === 'permission-denied') {
        toast.error('Kayıt tamamlandı fakat profil oluşturulamadı. Lütfen tekrar deneyin.');
      } else {
        toast.error('Kayıt sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#232736] rounded-xl border border-white/5 p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Kayıt Ol</h1>
        <p className="text-gray-400 text-sm">Aramıza katılın ve avantajlardan yararlanın.</p>
      </div>
      
      <form className="space-y-5" onSubmit={handleRegister}>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Kullanıcı Adı</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınız" 
              className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#5b68f6] transition-colors" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">E-posta Adresi</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com" 
              className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#5b68f6] transition-colors" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Şifre</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-[#181b26] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#5b68f6] transition-colors" 
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#5b68f6] hover:bg-[#4a55d6] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(91,104,246,0.3)] hover:shadow-[0_0_25px_rgba(91,104,246,0.5)]"
        >
          <UserPlus className="w-5 h-5" />
          {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Zaten hesabınız var mı? <Link to="/login" className="text-[#5b68f6] hover:text-[#4a55d6] font-medium transition-colors">Giriş Yap</Link>
      </div>
    </div>
  );
}
