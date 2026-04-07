/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Roblox from './pages/Roblox';
import Product from './pages/Product';
import IlanPazari from './pages/IlanPazari';
import AlimIlanlari from './pages/AlimIlanlari';
import Topluluk from './pages/Topluluk';
import Magazalar from './pages/Magazalar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="roblox" element={<Roblox />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="ilan-pazari" element={<IlanPazari />} />
          <Route path="alim-ilanlari" element={<AlimIlanlari />} />
          <Route path="topluluk" element={<Topluluk />} />
          <Route path="magazalar" element={<Magazalar />} />
          {/* Fallback for other routes */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
