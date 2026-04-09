import CategoryPills from '../components/CategoryPills';
import HeroSection from '../components/HeroSection';
import QuickLinks from '../components/QuickLinks';
import TagsRow from '../components/TagsRow';
import ShowcaseListings from '../components/ShowcaseListings';
import SocialMediaSection from '../components/SocialMediaSection';
import CategoryListings from '../components/CategoryListings';
import NewsTicker from '../components/NewsTicker';

export default function Home() {
  return (
    <div className="space-y-6">
      <CategoryPills />
      <HeroSection />
      <QuickLinks />
      <TagsRow />
      <ShowcaseListings />
      <SocialMediaSection />
      <CategoryListings />
      <div className="pt-6">
        <NewsTicker />
      </div>
    </div>
  );
}
