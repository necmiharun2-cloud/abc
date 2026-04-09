import { useAuth } from '../contexts/AuthContext';
import { Navigate, useParams, Link } from 'react-router-dom';
import ProfileWarningModal from '../components/ProfileWarningModal';
import { Package, Star, Trophy, Users, UserPlus, Edit3, X, Camera, ShieldCheck, Award } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, loading } = useAuth();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('ilanlar');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    avatar: ''
  });
  const [viewedUser, setViewedUser] = useState<any>(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [fetchingListings, setFetchingListings] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setFetchingUser(true);
      if (id) {
        try {
          const docRef = doc(db, 'users', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setViewedUser({ id: docSnap.id, ...docSnap.data() });
          } else {
            toast.error('Kullanıcı bulunamadı.');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      } else if (user) {
        setViewedUser({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          // Add other profile fields if needed
        });
        setProfileData({
          displayName: user.displayName || '',
          bio: '',
          avatar: user.photoURL || ''
        });
      }
      setFetchingUser(false);
    };
    fetchUser();
  }, [id, user]);

  useEffect(() => {
    const fetchListings = async () => {
      if (!viewedUser || activeTab !== 'ilanlar') return;
      setFetchingListings(true);
      try {
        const q = query(
          collection(db, 'products'),
          where('sellerId', '==', viewedUser.id),
          where('status', '==', 'active')
        );
        const querySnapshot = await getDocs(q);
        const fetchedListings = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) }));
        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setFetchingListings(false);
      }
    };
    fetchListings();
  }, [viewedUser, activeTab]);

  useEffect(() => {
    const fetchSocialData = async () => {
      if (!viewedUser) return;
      try {
        const reviewsQuery = query(collection(db, 'reviews'), where('targetUserId', '==', viewedUser.id), limit(20));
        const followersQuery = query(collection(db, 'followers'), where('targetUserId', '==', viewedUser.id), limit(20));
        const [reviewsSnap, followersSnap] = await Promise.all([getDocs(reviewsQuery), getDocs(followersQuery)]);
        setReviews(reviewsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setFollowers(followersSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        setReviews([]);
        setFollowers([]);
      }
    };
    fetchSocialData();
  }, [viewedUser]);

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;
    setUploadingAvatar(true);
    try {
      const avatarRef = ref(storage, `avatars/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(avatarRef, file);
      const avatarUrl = await getDownloadURL(avatarRef);
      setProfileData((prev) => ({ ...prev, avatar: avatarUrl }));
      toast.success('Profil görseli yüklendi.');
    } catch {
      toast.error('Görsel yüklenemedi.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        username: profileData.displayName.trim(),
        bio: profileData.bio.trim(),
        avatar: profileData.avatar || '',
      });
      setViewedUser((prev: any) => ({
        ...prev,
        username: profileData.displayName.trim(),
        bio: profileData.bio.trim(),
        avatar: profileData.avatar || prev?.avatar || '',
      }));
      toast.success('Profil bilgileriniz başarıyla güncellendi!');
      setIsEditModalOpen(false);
    } catch {
      toast.error('Profil güncellenemedi.');
    }
  };

  if (loading || fetchingUser) {
    return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  }

  if (!user && !id) {
    return <Navigate to="/login" />;
  }

  if (!viewedUser) {
    return <div className="text-center py-20 text-white">Kullanıcı bulunamadı.</div>;
  }

  const isOwnProfile = !id || id === user?.uid;
  const ratingValue = Number(viewedUser.rating || 0);
  const reviewCount = reviews.length || Number(viewedUser.reviewCount || 0);
  const followerCount = followers.length || Number(viewedUser.followerCount || 0);

  return (
    <div className="max-w-[1400px] mx-auto">
      {isOwnProfile && <ProfileWarningModal />}
      
      {/* Cover Photo Area */}
      <div className="h-[300px] w-full bg-[#1a1d27] relative overflow-hidden rounded-t-xl border-x border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1d27] via-[#232736] to-[#1a1d27]" />
        <div className="absolute top-4 right-4 text-xs text-gray-400 bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
          Üyelik Tarihi : {viewedUser.createdAt?.toDate ? viewedUser.createdAt.toDate().toLocaleDateString('tr-TR') : 'Bilinmiyor'}
        </div>
      </div>

      {/* Profile Info Bar */}
      <div className="bg-[#232736] border border-white/5 rounded-b-xl px-8 pb-6 relative flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
        {/* Avatar & Basic Info */}
        <div className="flex gap-6 -mt-16 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-xl bg-[#1a1d27] border-4 border-[#232736] overflow-hidden flex items-center justify-center">
              {viewedUser.avatar ? (
                <img src={viewedUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-white">
                  {(viewedUser.username || viewedUser.displayName || viewedUser.email?.[0] || 'U').toString().charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#232736]"></div>
          </div>
          
          <div className="pt-20">
            <div className="text-sm text-gray-400 mb-1">Kullanıcı</div>
            <h1 className="text-2xl font-bold text-white mb-2">{viewedUser.username || viewedUser.displayName || viewedUser.email?.split('@')[0] || 'Kullanıcı'}</h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a1d27] border-2 border-yellow-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{viewedUser.storeLevel === 'corporate' ? 'C' : viewedUser.storeLevel === 'pro' ? 'P' : 'S'}</span>
              </div>
              {viewedUser.isVerifiedSeller && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
              {(viewedUser.storeLevel === 'pro' || viewedUser.storeLevel === 'corporate') && <Award className="w-5 h-5 text-[#5b68f6]" />}
            </div>
            <div className="text-xs text-gray-400 mt-2 uppercase">Mağaza Seviyesi: {viewedUser.storeLevel || 'standard'}</div>
            {isOwnProfile ? (
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="mt-4 bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Profilini Düzenle
              </button>
            ) : (
              <button 
                onClick={() => handleComingSoon('Takip Et')}
                className="mt-4 bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Takip Et
              </button>
            )}
          </div>
        </div>

        {/* Stats & Rating */}
        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <span className="text-xl font-bold text-white">{ratingValue.toFixed(1)}</span>
            <span className="text-gray-400">/ 10</span>
          </div>
          <div className="text-sm text-gray-400">{reviewCount} Değerlendirme</div>
          <div className="w-full md:w-48 bg-emerald-500/20 text-emerald-400 text-center py-2 rounded-lg text-sm font-medium border border-emerald-500/30">
            {viewedUser.soldCount || 0} Başarılı İşlem
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-[#232736] p-2 rounded-xl border border-white/5">
        <button 
          onClick={() => setActiveTab('ilanlar')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'ilanlar' ? 'bg-[#1a1d27] text-white border-b-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Package className="w-4 h-4" />
          İlanlar
          <span className="bg-[#5b68f6]/20 text-[#5b68f6] px-2 py-0.5 rounded-full text-xs">{listings.length}</span>
        </button>
        <button 
          onClick={() => setActiveTab('degerlendirmeler')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'degerlendirmeler' ? 'bg-[#1a1d27] text-white border-b-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Star className="w-4 h-4" />
          Değerlendirmeler
          <span className="bg-white/10 text-gray-400 px-2 py-0.5 rounded-full text-xs">{reviewCount}</span>
        </button>
        <button 
          onClick={() => setActiveTab('basarimlar')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'basarimlar' ? 'bg-[#1a1d27] text-white border-b-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Trophy className="w-4 h-4" />
          Başarımlar
        </button>
        <button 
          onClick={() => setActiveTab('takipciler')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'takipciler' ? 'bg-[#1a1d27] text-white border-b-2 border-[#5b68f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Users className="w-4 h-4" />
          Takipçiler
          <span className="bg-white/10 text-gray-400 px-2 py-0.5 rounded-full text-xs">{followerCount}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-[#232736] rounded-xl border border-white/5 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        {activeTab === 'ilanlar' && (
          <div className="w-full">
            {fetchingListings ? (
              <div className="text-center py-10 text-gray-400">İlanlar yükleniyor...</div>
            ) : listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
                {listings.map((listing) => (
                  <Link key={listing.id} to={`/product/${listing.id}`} className="bg-[#1a1d27] rounded-xl border border-white/5 overflow-hidden hover:border-white/20 transition-colors group flex flex-col">
                    <div className="relative h-40">
                      {listing.image ? (
                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#2b3142] flex items-center justify-center text-gray-400 text-xs">
                          Görsel Yok
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">
                        {listing.category}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-[#5b68f6] transition-colors">{listing.title}</h3>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-emerald-400 font-bold text-lg">{listing.price.toFixed(2)} ₺</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-[#1a1d27] rounded-full flex items-center justify-center mb-6 relative">
                  <Package className="w-12 h-12 text-blue-400" />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#232736]">
                    <SearchIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Aktif ilan bulunamadı.</h2>
                <p className="text-gray-400">Kullanıcıya ait hiçbir aktif ilan bulunamadı.</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'degerlendirmeler' && (
          <div className="w-full max-w-2xl space-y-4">
            {reviews.length === 0 ? (
              <div className="p-8 rounded-xl border border-white/5 bg-[#1a1d27] text-center text-gray-300">
                Değerlendirme bulunmuyor.
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-[#1a1d27] p-6 rounded-xl border border-white/5 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-bold text-sm">{review.authorName || 'Kullanıcı'}</div>
                    <div className="text-yellow-500 text-sm font-bold">{Number(review.rating || 0).toFixed(1)} / 5</div>
                  </div>
                  <p className="text-gray-300 text-sm">{review.comment || 'Yorum yok.'}</p>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === 'basarimlar' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'İlk Satış', icon: Trophy, color: 'text-yellow-500' },
              { name: 'Güvenilir Satıcı', icon: ShieldCheckIcon, color: 'text-emerald-500' },
              { name: 'Hızlı Teslimat', icon: ZapIcon, color: 'text-blue-500' },
              { name: 'Popüler', icon: Users, color: 'text-purple-500' },
            ].map((b, i) => (
              <div key={i} className="bg-[#1a1d27] p-6 rounded-xl border border-white/5 flex flex-col items-center gap-3">
                <b.icon className={`w-12 h-12 ${b.color}`} />
                <span className="text-white font-bold text-sm">{b.name}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'takipciler' && (
          <div className="w-full max-w-2xl space-y-3">
            {followers.length === 0 ? (
              <div className="p-8 rounded-xl border border-white/5 bg-[#1a1d27] text-center text-gray-300">
                Takipçi bulunmuyor.
              </div>
            ) : (
              followers.map((follower) => (
                <div key={follower.id} className="bg-[#1a1d27] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{follower.followerName || 'Kullanıcı'}</span>
                  <span className="text-xs text-gray-400">{follower.createdAt?.toDate ? follower.createdAt.toDate().toLocaleDateString('tr-TR') : 'Yeni'}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#232736] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-white">Profili Düzenle</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group cursor-pointer">
                  {viewedUser.avatar ? (
                    <img src={viewedUser.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl object-cover border-2 border-white/10 group-hover:opacity-50 transition-opacity" />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl border-2 border-white/10 bg-[#1a1d27] flex items-center justify-center">
                      <UserPlus className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAvatarUpload(file);
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400">{uploadingAvatar ? 'Yükleniyor...' : 'Fotoğrafı değiştirmek için tıklayın'}</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Görünen Ad</label>
                <input 
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                  className="w-full bg-[#2b3142] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Hakkımda</label>
                <textarea 
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full bg-[#2b3142] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors resize-none"
                  placeholder="Kendinizden bahsedin..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#5b68f6] hover:bg-[#4a55d6] text-white font-bold py-3 rounded-lg transition-colors"
              >
                Değişiklikleri Kaydet
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper icons
function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ShieldCheckIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function ZapIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  )
}
