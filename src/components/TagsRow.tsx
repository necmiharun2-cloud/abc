import { LayoutGrid } from 'lucide-react';

export default function TagsRow() {
  const tags = [
    { name: 'Tümü', icon: LayoutGrid, active: true },
    { name: 'Instagram', icon: 'https://picsum.photos/seed/t1/20/20' },
    { name: 'Steam', icon: 'https://picsum.photos/seed/t2/20/20' },
    { name: 'TikTok', icon: 'https://picsum.photos/seed/t3/20/20' },
    { name: 'Steam Random Key', icon: 'https://picsum.photos/seed/t12/20/20' },
    { name: 'Minecraft', icon: 'https://picsum.photos/seed/t5/20/20' },
    { name: 'Youtube', icon: 'https://picsum.photos/seed/t6/20/20' },
    { name: 'OpenAI', icon: 'https://picsum.photos/seed/t14/20/20' },
    { name: 'Microsoft', icon: 'https://picsum.photos/seed/t15/20/20' },
    { name: 'Yapay Zeka', icon: 'https://picsum.photos/seed/t18/20/20' },
    { name: 'Roblox', icon: 'https://picsum.photos/seed/t9/20/20' },
    { name: 'Discord', icon: 'https://picsum.photos/seed/t10/20/20' },
    { name: 'Valorant Random Hesap', icon: 'https://picsum.photos/seed/t11/20/20' },
    { name: 'ARC Raiders', icon: 'https://picsum.photos/seed/t13/20/20' },
    { name: 'PUBG Mobile', icon: 'https://picsum.photos/seed/t7/20/20' },
    { name: 'Valorant', icon: 'https://picsum.photos/seed/t4/20/20' },
    { name: 'Hayday', icon: 'https://picsum.photos/seed/t16/20/20' },
    { name: 'GTA 5 Boost', icon: 'https://picsum.photos/seed/t19/20/20' },
    { name: 'Kick', icon: 'https://picsum.photos/seed/t17/20/20' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.name}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
            tag.active 
              ? 'bg-[#5b68f6] border-[#5b68f6] text-white' 
              : 'bg-[#232736] border-white/10 text-gray-300 hover:bg-[#32394d] hover:text-white'
          }`}
        >
          {typeof tag.icon === 'string' ? (
            <img src={tag.icon} alt={tag.name} className="w-4 h-4 rounded-full" />
          ) : (
            <tag.icon className="w-4 h-4" />
          )}
          {tag.name}
        </button>
      ))}
    </div>
  );
}
