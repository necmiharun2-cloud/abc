import { Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart();

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOriginalPrice = items.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const discount = totalOriginalPrice - totalPrice;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Sepetim</h1>
        <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Alışverişe Geri Dön
        </Link>
      </div>

      {/* Coupons Section */}
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Kupon Kodlarım</h2>
        <p className="text-sm text-gray-400 mb-4">Herkese açık kampanya kodlarını buradan tek tıkla uygulayabilirsiniz. Gizli kodları aşağıdaki alana yazman yeterli.</p>
        
        <div className="flex flex-wrap gap-4">
          {/* Coupon 1 */}
          <div className="bg-[#232736] border border-white/5 rounded-xl flex overflow-hidden w-full md:w-[400px]">
            <div className="bg-[#5b68f6]/20 w-12 flex items-center justify-center border-r border-white/5">
              <span className="text-[#5b68f6] font-bold -rotate-90 tracking-widest text-sm">KUPON</span>
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-white font-bold mb-1">THEBOYS5</h3>
              <p className="text-emerald-400 text-sm font-medium mb-2">%5 indirim</p>
              <p className="text-yellow-500/80 text-xs mb-4 leading-relaxed">Bu kupon sepetinizdeki kategoriler için geçerli değil. Sepetinizde bu kuponun geçerli olduğu...</p>
              <button className="w-full py-2 rounded-lg border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors">
                + Kuponu Uygula
              </button>
            </div>
          </div>

          {/* Coupon 2 */}
          <div className="bg-[#232736] border border-white/5 rounded-xl flex overflow-hidden w-full md:w-[400px]">
            <div className="bg-[#5b68f6]/20 w-12 flex items-center justify-center border-r border-white/5">
              <span className="text-[#5b68f6] font-bold -rotate-90 tracking-widest text-sm">KUPON</span>
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-white font-bold mb-1">BIZIMCOCUKLAR</h3>
              <p className="text-emerald-400 text-sm font-medium mb-2">%5 indirim</p>
              <p className="text-yellow-500/80 text-xs mb-4 leading-relaxed">Bu kupon sepetinizdeki kategoriler için geçerli değil. Sepetinizde bu kuponun geçerli olduğu...</p>
              <button className="w-full py-2 rounded-lg border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors">
                + Kuponu Uygula
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="bg-[#232736] border border-white/5 rounded-xl p-8 text-center">
              <p className="text-gray-400">Sepetinizde ürün bulunmamaktadır.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-[#232736] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img src={item.image} alt="Product" className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">Stoklardan anında teslim edilecektir.</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Satıcı :</span>
                    <span className="text-white bg-white/5 px-2 py-1 rounded flex items-center gap-1">
                      <img src={`https://picsum.photos/seed/${item.seller}/16/16`} alt="Seller" className="w-4 h-4 rounded" />
                      {item.seller}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                  <div className="flex items-center bg-[#1a1d27] rounded-lg border border-white/5">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >-</button>
                    <div className="w-10 text-center text-white text-sm">{item.quantity}</div>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >+</button>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 line-through text-sm">{item.originalPrice.toFixed(2)} ₺</div>
                    <div className="text-emerald-400 font-bold text-lg">{item.price.toFixed(2)} ₺</div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[350px] space-y-4">
          <div className="bg-[#232736] border border-white/5 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Sepet Özeti</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Sepet Toplamı</span>
                <span className="text-white font-medium">{totalOriginalPrice.toFixed(2)} ₺</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">İndirim Tutarı</span>
                <span className="text-emerald-400 font-medium">-{discount.toFixed(2)} ₺</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-white font-bold">Toplam</span>
                <span className="text-white font-bold text-xl">{totalPrice.toFixed(2)} ₺</span>
              </div>
            </div>

            <div className="bg-[#1a1d27] rounded-lg p-4 mb-6 border border-white/5">
              <h3 className="text-white font-medium text-sm mb-1">Kupon Kodunuzmu Var?</h3>
              <p className="text-gray-400 text-xs mb-3">Kupon kodunuzu girerek indirimden yararlanabilirsiniz.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 bg-[#232736] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                />
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Kullan
                </button>
              </div>
            </div>

            <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Ödeme Adımına Geç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
