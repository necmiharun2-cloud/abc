# İtemtrClone

Bu proje, İtemtr platformunun bir klonudur. React, Vite, Tailwind CSS ve Firebase kullanılarak geliştirilmiştir.

## Özellikler
- Kullanıcı Kaydı ve Girişi (Firebase Auth)
- İlan Ekleme, Düzenleme ve Silme
- Sepet ve Favori Sistemi
- Gerçek Zamanlı Mesajlaşma (Firestore)
- Destek Sistemi
- Mağaza Profilleri

## Kurulum

1. Projeyi klonlayın.
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. `.env` dosyasını oluşturun ve Firebase yapılandırmanızı ekleyin:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Firebase Kuralları
`firestore.rules` dosyası, veritabanı güvenliğini sağlamak için yapılandırılmıştır. Projeyi deploy etmeden önce bu kuralları Firebase konsolundan uyguladığınızdan emin olun.

## Deploy
Projeyi build etmek için:
```bash
npm run build
```
Oluşan `dist` klasörünü herhangi bir statik hosting servisine (Vercel, Netlify, Firebase Hosting vb.) yükleyebilirsiniz.
