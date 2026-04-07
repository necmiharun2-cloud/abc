import { Flame, Store, Gamepad2, Key } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CategoryPills() {
  const location = useLocation();
  
  const handleComingSoon = (name: string) => {
    toast.success(`${name} kategorisi yakında eklenecek!`);
  };

  const pills = [
    { name: 'En Yeniler', icon: Flame, path: '/', type: 'link' },
    { name: 'İlan Pazarı', icon: Store, path: '/ilan-pazari', type: 'link' },
    { name: 'Valorant', icon: Gamepad2, path: '/valorant', type: 'button' },
    { name: 'PUBG Mobile', icon: Gamepad2, path: '/pubg-mobile', type: 'button' },
    { name: 'Roblox', icon: Gamepad2, path: '/roblox', type: 'link' },
    { name: 'League of Legends', icon: Gamepad2, path: '/lol', type: 'button' },
    { name: 'Counter Strike 2', icon: Gamepad2, path: '/cs2', type: 'button' },
    { name: 'Mobile Legends', icon: Gamepad2, path: '/mobile-legends', type: 'button' },
    { name: 'CD-Key', icon: Key, path: '/cd-key', type: 'button' },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {pills.map((pill) => {
        const isActive = location.pathname === pill.path;
        const baseClass = `flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
          isActive 
            ? 'bg-[#5b68f6] text-white' 
            : 'bg-[#32394d] text-gray-300 hover:bg-[#3d455c] hover:text-white'
        }`;

        if (pill.type === 'link') {
          return (
            <Link key={pill.name} to={pill.path} className={baseClass}>
              <pill.icon className="h-4 w-4" />
              {pill.name}
            </Link>
          );
        }

        return (
          <button 
            key={pill.name} 
            onClick={() => handleComingSoon(pill.name)}
            className={baseClass}
          >
            <pill.icon className="h-4 w-4" />
            {pill.name}
          </button>
        );
      })}
    </div>
  );
}
