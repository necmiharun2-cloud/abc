import { LayoutGrid, Store, ShoppingBag, Gift, Building2, Key, CreditCard, CreditCard as GiftCard, Users, Plus } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { name: 'Kategoriler', icon: LayoutGrid, hasDropdown: true },
    { name: 'İlan Pazarı', icon: Store },
    { name: 'Alım İlanları', icon: ShoppingBag },
    { name: 'Çekilişler', icon: Gift, color: 'text-yellow-500' },
    { name: 'Mağazalar', icon: Building2 },
    { name: 'CD-Key', icon: Key },
    { name: 'Top Up', icon: CreditCard },
    { name: 'Hediye Kartları', icon: GiftCard },
    { name: 'Topluluk', icon: Users },
  ];

  return (
    <nav className="bg-[#232736] border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center gap-2 text-sm font-medium hover:text-white transition-colors ${item.color || 'text-gray-300'}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  {item.hasDropdown && <span className="text-[10px] ml-1">▼</span>}
                </a>
              </li>
            ))}
          </ul>
          
          <button className="flex items-center gap-2 bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
            <Plus className="h-4 w-4" />
            İlan Ekle
          </button>
        </div>
      </div>
    </nav>
  );
}
