import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#232736] border-t border-white/5 pt-16 pb-8 mt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-6">
              <img src="https://picsum.photos/seed/logo/40/40" alt="Logo" className="w-10 h-10 rounded-full" />
              <span className="text-white font-bold text-2xl tracking-tight">itemsatış</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Türkiye'nin en gelişmiş dijital oyun pazarı İtemsatış'ta hesap, item, skin, CD Key ve en ucuz Epin ürünlerini güvenle alıp sat, hızlıca kazanç sağla!
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center text-gray-400 hover:bg-[#5b68f6] hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center text-gray-400 hover:bg-[#5b68f6] hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center text-gray-400 hover:bg-[#5b68f6] hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center text-gray-400 hover:bg-[#5b68f6] hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">Hakkımızda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">Kullanıcı Sözleşmesi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">Mesafeli Satış Sözleşmesi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">İade Politikası</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">Sıkça Sorulan Sorular</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Kategoriler</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">Valorant Hesap Satışı</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">LoL Hesap Satışı</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">CS:GO 2 İtem Satışı</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">PUBG Mobile UC</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">Roblox Robux</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#5b68f6] transition-colors text-sm">Steam Cüzdan Kodu</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#5b68f6] shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">İtemsatış Teknoloji A.Ş.<br/>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#5b68f6] shrink-0" />
                <span className="text-gray-400 text-sm">0850 XXX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#5b68f6] shrink-0" />
                <span className="text-gray-400 text-sm">destek@itemsatis.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 İtemsatış Clone. Tüm hakları saklıdır. Bu bir klon projesidir.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-8 w-12 bg-[#2b3142] rounded flex items-center justify-center text-[10px] font-bold text-gray-500">VISA</div>
            <div className="h-8 w-12 bg-[#2b3142] rounded flex items-center justify-center text-[10px] font-bold text-gray-500">MASTER</div>
            <div className="h-8 w-12 bg-[#2b3142] rounded flex items-center justify-center text-[10px] font-bold text-gray-500">TROY</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
