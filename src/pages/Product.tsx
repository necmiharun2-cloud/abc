import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Breadcrumb from '../components/Product/Breadcrumb';
import ProductGallery from '../components/Product/ProductGallery';
import SellerCard from '../components/Product/SellerCard';
import PurchaseCard from '../components/Product/PurchaseCard';
import ProductDetails from '../components/Product/ProductDetails';
import SimilarProducts from '../components/Product/SimilarProducts';
import toast from 'react-hot-toast';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (id) {
        try {
          const docRef = doc(db, 'products', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            toast.error('Ürün bulunamadı.');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!product) return <div className="text-center py-20 text-white">Ürün bulunamadı.</div>;

  return (
    <div className="max-w-[1200px] mx-auto">
      <Breadcrumb category={product.category} title={product.title} />
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6 min-w-0">
          <ProductGallery image={product.image} />
          <ProductDetails product={product} />
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
          <SellerCard sellerName={product.sellerName} sellerAvatar={product.sellerAvatar} sellerId={product.sellerId} />
          <PurchaseCard product={product} />
          
          {/* Help Banner */}
          <div className="bg-[#232736] rounded-xl border border-white/5 p-6 text-center">
            <div className="w-12 h-12 bg-[#2b3142] rounded-full flex items-center justify-center mx-auto mb-4 text-[#5b68f6] font-bold text-xl">
              ?
            </div>
            <h3 className="text-white font-bold mb-2">Yardıma mı ihtiyacınız var?</h3>
            <p 
              onClick={() => handleComingSoon('Yardım Merkezi')}
              className="text-gray-400 text-xs mb-6 underline cursor-pointer hover:text-white"
            >
              Buraya tıklayarak yardım merkezi sayfamıza ulaşabilirsiniz.
            </p>
            <button 
              onClick={() => handleComingSoon('Akıllı Sorun Bildir')}
              className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 font-medium py-2.5 rounded text-sm transition-colors border border-red-500/20"
            >
              Akıllı Sorun Bildir (Ses/Ekran Kaydı)
            </button>
          </div>
        </div>
      </div>

      <SimilarProducts category={product.category} />
    </div>
  );
}
