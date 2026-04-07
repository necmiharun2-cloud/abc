export default function QuickLinks() {
  const links = [
    { name: 'Steam', icon: 'https://picsum.photos/seed/l1/24/24' },
    { name: 'Mobile Legends', icon: 'https://picsum.photos/seed/l2/24/24' },
    { name: 'Clash of Clans', icon: 'https://picsum.photos/seed/l3/24/24' },
    { name: 'CS2', icon: 'https://picsum.photos/seed/l4/24/24' },
    { name: 'CD Key', icon: 'https://picsum.photos/seed/l5/24/24' },
    { name: 'Hediye Kartı', icon: 'https://picsum.photos/seed/l6/24/24' },
    { name: 'Sosyal Medya', icon: 'https://picsum.photos/seed/l7/24/24' },
  ];

  return (
    <div className="flex items-center justify-between bg-[#232736] rounded-xl p-4 border border-white/5">
      {links.map((link) => (
        <a key={link.name} href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors font-medium text-sm">
          <img src={link.icon} alt={link.name} className="w-6 h-6 rounded" />
          {link.name}
        </a>
      ))}
    </div>
  );
}
