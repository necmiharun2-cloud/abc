export default function SimilarProducts() {
  const products = [
    {
      id: 1,
      title: "ŞİFRE DEĞİŞEN PRİME HESAP",
      category: "WOLFTEAM",
      image: "https://picsum.photos/seed/sim1/400/300",
      price: 15.00,
      seller: "ValoKing"
    },
    {
      id: 2,
      title: "ARC RAIDERS DELUXE EDITION",
      category: "ARC RAIDERS",
      image: "https://picsum.photos/seed/sim2/400/300",
      price: 45.00,
      seller: "GameStore"
    },
    {
      id: 3,
      title: "CAPCUT PRO 1 AYLIK",
      category: "CAPCUT",
      image: "https://picsum.photos/seed/sim3/400/300",
      price: 25.00,
      seller: "DigitalKeys"
    },
    {
      id: 4,
      title: "FORZA HORIZON 5 PREMIUM EDITION",
      category: "FORZA HORIZON",
      image: "https://picsum.photos/seed/sim4/400/300",
      price: 85.00,
      seller: "XboxStore"
    }
  ];

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Benzer İlanlar</h2>
        <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
          Tümünü Gör →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-[#232736] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors group cursor-pointer">
            <div className="relative aspect-[4/3]">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-[10px] text-gray-300 font-medium mb-1">{product.category}</div>
                <div className="text-sm text-white font-bold line-clamp-1">{product.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
