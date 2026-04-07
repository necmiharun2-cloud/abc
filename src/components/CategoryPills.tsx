import { Flame, Store, Gamepad2, Key } from 'lucide-react';

export default function CategoryPills() {
  const pills = [
    { name: 'En Yeniler', icon: Flame, active: true },
    { name: 'İlan Pazarı', icon: Store },
    { name: 'Valorant', icon: Gamepad2 },
    { name: 'PUBG Mobile', icon: Gamepad2 },
    { name: 'Roblox', icon: Gamepad2 },
    { name: 'League of Legends', icon: Gamepad2 },
    { name: 'Counter Strike 2', icon: Gamepad2 },
    { name: 'Mobile Legends', icon: Gamepad2 },
    { name: 'CD-Key', icon: Key },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {pills.map((pill) => (
        <button
          key={pill.name}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            pill.active 
              ? 'bg-[#5b68f6] text-white' 
              : 'bg-[#32394d] text-gray-300 hover:bg-[#3d455c] hover:text-white'
          }`}
        >
          <pill.icon className="h-4 w-4" />
          {pill.name}
        </button>
      ))}
    </div>
  );
}
