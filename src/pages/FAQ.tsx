import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Nasıl bakiye yükleyebilirim?",
      answer: "Kredi kartı, banka kartı, havale/EFT veya mobil ödeme yöntemlerini kullanarak 'Bakiye Yükle' sayfasından güvenle bakiye yükleyebilirsiniz."
    },
    {
      question: "Satın aldığım ürün ne zaman teslim edilir?",
      answer: "E-pin ve CD-Key ürünleri anında teslim edilir. İlan pazarı ürünlerinde ise satıcının teslimat süresi ilanda belirtilmiştir, genellikle satıcı çevrimiçi olduğunda anında teslimat yapılır."
    },
    {
      question: "Güvenli alışveriş sistemi nasıl çalışır?",
      answer: "Siz ödemeyi yaptığınızda tutar İtemsatış havuz hesabında bekletilir. Siz ürünü teslim alıp onay verdiğinizde tutar satıcıya aktarılır. Bu sayede paranız her zaman güvendedir."
    },
    {
      question: "Satıcıyım, kazancımı nasıl çekebilirim?",
      answer: "Bakiyenizdeki çekilebilir tutarı 'Para Çek' sayfasından banka hesabınıza (IBAN) talep ederek çekebilirsiniz. Talepler genellikle aynı gün içinde işleme alınır."
    },
    {
      question: "Şifremi unuttum, ne yapmalıyım?",
      answer: "Giriş sayfasındaki 'Şifremi Unuttum' bağlantısına tıklayarak e-posta adresinize şifre sıfırlama bağlantısı isteyebilirsiniz."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[#5b68f6]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-[#5b68f6]" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Sıkça Sorulan Sorular</h1>
        <p className="text-gray-400">Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-[#232736] border border-white/5 rounded-xl overflow-hidden transition-all"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-bold text-white">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-400 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-[#232736] rounded-2xl border border-white/5 text-center">
        <h3 className="text-lg font-bold text-white mb-2">Başka bir sorunuz mu var?</h3>
        <p className="text-gray-400 mb-6 text-sm">Destek ekibimiz size yardımcı olmaktan mutluluk duyacaktır.</p>
        <a 
          href="/destek-sistemi" 
          className="inline-flex items-center justify-center bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-8 py-3 rounded-xl font-bold transition-all"
        >
          Destek Talebi Oluştur
        </a>
      </div>
    </div>
  );
}
