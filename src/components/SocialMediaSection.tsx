export default function SocialMediaSection() {
  const platforms = [
    { name: 'Facebook', color: 'bg-[#1877f2]', icon: 'https://picsum.photos/seed/fb/32/32' },
    { name: 'YouTube', color: 'bg-[#ff0000]', icon: 'https://picsum.photos/seed/yt/32/32' },
    { name: 'Spotify', color: 'bg-[#1db954]', icon: 'https://picsum.photos/seed/sp/32/32' },
    { name: 'Instagram', color: 'bg-[#e1306c]', icon: 'https://picsum.photos/seed/ig/32/32' },
    { name: 'TikTok', color: 'bg-[#000000]', icon: 'https://picsum.photos/seed/tk/32/32' },
    { name: 'Twitch', color: 'bg-[#9146ff]', icon: 'https://picsum.photos/seed/tw/32/32' },
    { name: 'Discord', color: 'bg-[#5865f2]', icon: 'https://picsum.photos/seed/dc/32/32' },
    { name: 'X', color: 'bg-[#000000]', icon: 'https://picsum.photos/seed/x/32/32' },
  ];

  return (
    <section className="py-8 text-center">
      <div className="mb-8">
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2 block">• KEŞFET</span>
        <h2 className="text-3xl font-bold text-white mb-2">Sosyal Medya İlanları</h2>
        <p className="text-gray-400 text-sm">Popüler sosyal medya kategorilerindeki binlerce ilanı keşfet!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href="#"
            className={`${platform.color} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform duration-300 shadow-lg`}
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain" />
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-sm">{platform.name}</div>
              <div className="text-white/70 text-[10px]">İlanları</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
