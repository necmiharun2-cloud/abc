import { Flame, Store, Gamepad2, Key } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function CategoryPills() {
  const location = useLocation();
  
  const pills = [
    { name: 'En Yeniler', icon: Flame, path: '/' },
    { name: 'İlan Pazarı', icon: Store, path: '/ilan-pazari' },
    { name: 'Valorant', icon: Gamepad2, path: '/valorant' },
    { name: 'PUBG Mobile', icon: Gamepad2, path: '/pubg-mobile' },
    { name: 'Roblox', icon: Gamepad2, path: '/roblox' },
    { name: 'League of Legends', icon: Gamepad2, path: '/lol' },
    { name: 'Counter Strike 2', icon: Gamepad2, path: '/cs2' },
    { name: 'Mobile Legends', icon: Gamepad2, path: '/mobile-legends' },
    { name: 'CD-Key', icon: Key, path: '/cd-key' },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {pills.map((pill) => {
        const isActive = location.pathname === pill.path;
        return (
          <Link
            key={pill.name}
            to={pill.path}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              isActive 
                ? 'bg-[#5b68f6] text-white' 
                : 'bg-[#32394d] text-gray-300 hover:bg-[#3d455c] hover:text-white'
            }`}
          >
            <pill.icon className="h-4 w-4" />
            {pill.name}
          </Link>
        );
      })}
    </div>
  );
}
