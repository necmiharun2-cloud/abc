/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Navbar from './components/Navbar';
import CategoryPills from './components/CategoryPills';
import HeroSection from './components/HeroSection';
import QuickLinks from './components/QuickLinks';
import TagsRow from './components/TagsRow';
import ShowcaseListings from './components/ShowcaseListings';
import SocialMediaSection from './components/SocialMediaSection';
import CategoryListings from './components/CategoryListings';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#2b3142] text-white font-sans pb-20">
      <TopBanner />
      <Header />
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <CategoryPills />
        <HeroSection />
        <QuickLinks />
        <TagsRow />
        <ShowcaseListings />
        <SocialMediaSection />
        <CategoryListings />
      </main>

      <Footer />
    </div>
  );
}
