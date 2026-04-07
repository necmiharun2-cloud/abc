/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
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

export default function App() {
  return (
    <AuthProvider>
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
            <Route path="profile" element={<Profile />} />
            {/* Fallback for other routes */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
