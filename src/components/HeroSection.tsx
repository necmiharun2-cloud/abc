export default function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[300px]">
      {/* Left 3 Cards */}
      <div className="flex gap-4 w-full lg:w-auto h-full">
        <div className="relative w-[180px] h-full rounded-xl overflow-hidden group cursor-pointer">
          <img src="https://picsum.photos/seed/h1/200/400" alt="Valorant" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <button className="w-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-xs font-medium py-2 rounded hover:bg-white/20 transition-colors">
              Hemen VP Satın Al!
            </button>
          </div>
        </div>
        
        <div className="relative w-[180px] h-full rounded-xl overflow-hidden group cursor-pointer">
          <img src="https://picsum.photos/seed/h2/200/400" alt="Alışveriş" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <button className="w-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-xs font-medium py-2 rounded hover:bg-white/20 transition-colors">
              Alışverişe Başla!
            </button>
          </div>
        </div>

        <div className="relative w-[180px] h-full rounded-xl overflow-hidden group cursor-pointer">
          <img src="https://picsum.photos/seed/h3/200/400" alt="Bakiye" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <button className="w-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-xs font-medium py-2 rounded hover:bg-white/20 transition-colors">
              Hemen Bakiye Yükle
            </button>
          </div>
        </div>
      </div>

      {/* Right Large Banner */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-[#3b82f6] group cursor-pointer h-full">
        <div className="absolute inset-0 flex items-center justify-between px-12">
          <div className="max-w-md z-10">
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Topluluk<br/>Sayfası 😎 Artık<br/>İtemSatış'ta!
            </h2>
            <button className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
              Gönderi Yayınla
            </button>
          </div>
          <img src="https://picsum.photos/seed/h4/800/600" alt="Community" className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
    </div>
  );
}
