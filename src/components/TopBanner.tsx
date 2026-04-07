export default function TopBanner() {
  return (
    <div className="w-full flex h-16 bg-[#1a1d27] text-white text-sm overflow-hidden">
      <div className="flex-1 flex items-center justify-center gap-4 border-r border-white/10 relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pubg/800/200')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative z-10 flex items-center gap-2 font-bold">
          <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs">PUBG MOBILE</span>
          RP A18 Şimdi Oyunda!
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-4 border-r border-white/10 relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/valo/800/200')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative z-10 flex items-center gap-2 font-bold">
          <span className="text-red-500">Valorant</span>
          Karaçalı Koleksiyonu Şimdi Oyunda
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-4 relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/fc26/800/200')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative z-10 flex items-center gap-2 font-bold">
          <span className="bg-white text-black px-2 py-0.5 rounded text-xs">FC26 Kategorisine Özel</span>
          BIZIMCOCUKLAR koduyla 50₺ üzeri alışverişlerinde %5 indirim!
        </div>
      </div>
    </div>
  );
}
