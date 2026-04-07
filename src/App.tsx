/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
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
import Withdraw from './pages/Withdraw';
import Support from './pages/Support';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Terms from './pages/Terms';
import Deals from './pages/Deals';
import Blog from './pages/Blog';
import Streamers from './pages/Streamers';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="sifremi-unuttum" element={<ForgotPassword />} />
              <Route path="hakkimizda" element={<About />} />
              <Route path="kullanici-sozlesmesi" element={<Terms />} />
              <Route path="firsatlar" element={<Deals />} />
              <Route path="blog" element={<Blog />} />
              <Route path="yayincilar" element={<Streamers />} />
              <Route path="profile" element={<Profile />} />
              <Route path="mesajlarim" element={<Messages />} />
              <Route path="kontrol-merkezi" element={<Dashboard />} />
              <Route path="bildirimler" element={<Notifications />} />
              <Route path="sepet" element={<Cart />} />
              <Route path="siparislerim" element={<Orders />} />
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
      </CartProvider>
    </AuthProvider>
  );
}
