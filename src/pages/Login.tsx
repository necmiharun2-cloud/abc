import { Mail, Lock, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Giriş başarılı! Yönlendiriliyorsunuz...');
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('E-posta adresi veya şifre hatalı.');
      } else if (error.code === 'auth/operation-not-allowed') {
        toast.error('E-posta/Şifre girişi Firebase konsolundan aktifleştirilmemiş!');
      } else {
        toast.error(`Hata: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#232736] rounded-xl border border-white/5 p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Giriş Yap</h1>
        <p className="text-gray-400 text-sm">Hesabınıza giriş yaparak alışverişe devam edin.</p>
      </div>
      
      <form className="space-y-5" onSubmit={handleLogin}>
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
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-300">Şifre</label>
            <Link to="/sifremi-unuttum" className="text-xs text-[#5b68f6] hover:text-[#4a55d6] transition-colors">Şifremi Unuttum</Link>
          </div>
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
          <LogIn className="w-5 h-5" />
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Hesabınız yok mu? <Link to="/register" className="text-[#5b68f6] hover:text-[#4a55d6] font-medium transition-colors">Hemen Kayıt Ol</Link>
      </div>
    </div>
  );
}
