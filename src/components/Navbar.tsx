import { LayoutGrid, Store, ShoppingBag, Gift, Building2, Key, CreditCard, CreditCard as GiftCard, Users, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: 'Kategoriler', icon: LayoutGrid, hasDropdown: true, path: '/' },
    { name: 'İlan Pazarı', icon: Store, path: '/ilan-pazari' },
    { name: 'Alım İlanları', icon: ShoppingBag, path: '/alim-ilanlari' },
    { name: 'Çekilişler', icon: Gift, color: 'text-yellow-500', path: '/cekilisler' },
    { name: 'Mağazalar', icon: Building2, path: '/magazalar' },
    { name: 'CD-Key', icon: Key, path: '/cd-key' },
    { name: 'Top Up', icon: CreditCard, path: '/top-up' },
    { name: 'Hediye Kartları', icon: GiftCard, path: '/hediye-kartlari' },
    { name: 'Topluluk', icon: Users, path: '/topluluk' },
  ];

  return (
    <nav className="bg-[#232736] border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <ul className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 whitespace-nowrap group ${
                      item.color 
                        ? `${item.color} drop-shadow-[0_0_8px_rgba(234,179,8,0.6)] hover:drop-shadow-[0_0_12px_rgba(234,179,8,0.9)]` 
                        : isActive 
                          ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
                          : 'text-gray-300 hover:text-[#00f0ff] hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 transition-transform duration-300 ${!item.color && !isActive ? 'group-hover:scale-110' : ''}`} />
                    {item.name}
                    {item.hasDropdown && <span className="text-[10px] ml-1">▼</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <Link 
            to="/ilan-ekle"
            className="flex items-center gap-2 bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ml-4 shadow-[0_0_15px_rgba(91,104,246,0.5)] hover:shadow-[0_0_25px_rgba(91,104,246,0.8)]"
          >
            <Plus className="h-4 w-4" />
            İlan Ekle
          </Link>
        </div>
      </div>
    </nav>
  );
}
