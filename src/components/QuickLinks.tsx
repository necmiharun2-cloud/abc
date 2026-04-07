import toast from 'react-hot-toast';

export default function QuickLinks() {
  const handleLinkClick = (name: string) => {
    toast.success(`${name} kategorisi yakında eklenecek!`);
  };

  const links = [
    { name: 'CS2', icon: 'https://picsum.photos/seed/l4/24/24' },
    { name: 'CD Key', icon: 'https://picsum.photos/seed/l5/24/24' },
    { name: 'Hediye Kartı', icon: 'https://picsum.photos/seed/l6/24/24' },
    { name: 'Sosyal Medya', icon: 'https://picsum.photos/seed/l7/24/24' },
    { name: 'Random Hesap', icon: 'https://picsum.photos/seed/l8/24/24' },
    { name: 'MMO Oyunlar', icon: 'https://picsum.photos/seed/l9/24/24' },
    { name: 'Mobil Oyunlar', icon: 'https://picsum.photos/seed/l10/24/24' },
  ];

  return (
    <div className="flex items-center justify-between bg-[#232736] rounded-xl p-4 border border-white/5">
      {links.map((link) => (
        <button 
          key={link.name} 
          onClick={() => handleLinkClick(link.name)}
          className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors font-medium text-sm"
        >
          <img src={link.icon} alt={link.name} className="w-6 h-6 rounded" />
          {link.name}
        </button>
      ))}
    </div>
  );
}
