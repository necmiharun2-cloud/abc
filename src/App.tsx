/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Roblox from './pages/Roblox';
import Product from './pages/Product';
import IlanPazari from './pages/IlanPazari';
import AlimIlanlari from './pages/AlimIlanlari';
import Topluluk from './pages/Topluluk';
import Magazalar from './pages/Magazalar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import SoldListings from './pages/SoldListings';
import MyListings from './pages/MyListings';
import Favorites from './pages/Favorites';
import OrderDetail from './pages/OrderDetail';
import Withdraw from './pages/Withdraw';
import Support from './pages/Support';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import DistanceSales from './pages/DistanceSales';
import RefundPolicy from './pages/RefundPolicy';
import FAQ from './pages/FAQ';
import Deals from './pages/Deals';
import Blog from './pages/Blog';
import Streamers from './pages/Streamers';
import Giveaways from './pages/Giveaways';
import CDKey from './pages/CDKey';
import TopUp from './pages/TopUp';
import GiftCards from './pages/GiftCards';
import IlanEkle from './pages/IlanEkle';
import IlanYukariTasima from './pages/IlanYukariTasima';
import FavoriSistemi from './pages/FavoriSistemi';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
          <Toaster position="top-center" toastOptions={{
            style: {
              background: '#232736',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)'
            }
          }} />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="roblox" element={<Roblox />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="ilan-pazari" element={<IlanPazari />} />
              <Route path="alim-ilanlari" element={<AlimIlanlari />} />
              <Route path="topluluk" element={<Topluluk />} />
              <Route path="magazalar" element={<Magazalar />} />
              <Route path="cekilisler" element={<Giveaways />} />
              <Route path="cd-key" element={<CDKey />} />
              <Route path="top-up" element={<TopUp />} />
              <Route path="hediye-kartlari" element={<GiftCards />} />
              <Route path="ilan-ekle" element={<IlanEkle />} />
              <Route path="favori-sistemi" element={<FavoriSistemi />} />
              <Route path="ilan-yukari-tasima" element={<IlanYukariTasima />} />
              <Route path="gizlilik-politikasi" element={<Privacy />} />
              <Route path="mesafeli-satis-sozlesmesi" element={<DistanceSales />} />
              <Route path="iade-politikasi" element={<RefundPolicy />} />
              <Route path="sss" element={<FAQ />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="sifremi-unuttum" element={<ForgotPassword />} />
              <Route path="hakkimizda" element={<About />} />
              <Route path="kullanici-sozlesmesi" element={<Terms />} />
              <Route path="firsatlar" element={<Deals />} />
              <Route path="blog" element={<Blog />} />
              <Route path="yayincilar" element={<Streamers />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="mesajlarim" element={<Messages />} />
              <Route path="kontrol-merkezi" element={<Dashboard />} />
              <Route path="bildirimler" element={<Notifications />} />
              <Route path="sepet" element={<Cart />} />
              <Route path="siparislerim" element={<Orders />} />
              <Route path="siparis/:id" element={<OrderDetail />} />
              <Route path="sattigim-ilanlar" element={<SoldListings />} />
              <Route path="ilanlarim" element={<MyListings />} />
              <Route path="favorilerim" element={<Favorites />} />
              <Route path="para-cek" element={<Withdraw />} />
              <Route path="destek-sistemi" element={<Support />} />
              {/* Fallback for other routes */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  </AuthProvider>
  );
}
