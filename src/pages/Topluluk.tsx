import { MessageSquare, TrendingUp, Users, Plus, Heart, Share2, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function Topluluk() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Genel' });
  
  const [posts, setPosts] = useState([
    { id: 1, author: 'GamerX', avatar: 'https://picsum.photos/seed/u1/40/40', time: '2 saat önce', title: 'Valorant yeni ajan hakkında ne düşünüyorsunuz?', content: 'Sizce yeni gelen ajan metayı nasıl etkileyecek? Yetenekleri çok güçlü duruyor...', likes: 24, comments: 12, category: 'Valorant', isLiked: false, showComments: false },
    { id: 2, author: 'ProPlayer', avatar: 'https://picsum.photos/seed/u2/40/40', time: '5 saat önce', title: 'CS2 FPS Drop sorunu çözümü', content: 'Son güncellemeden sonra FPS drop yaşayanlar için bulduğum birkaç çözüm yöntemini paylaşıyorum...', likes: 156, comments: 45, category: 'CS2', isLiked: false, showComments: false },
    { id: 3, author: 'NoobMaster', avatar: 'https://picsum.photos/seed/u3/40/40', time: '1 gün önce', title: 'En iyi F/P oyuncu faresi önerisi?', content: 'Maksimum 1000 TL bütçem var, FPS oyunları için fare arıyorum. Önerilerinizi bekliyorum.', likes: 8, comments: 32, category: 'Donanım', isLiked: false, showComments: false },
  ]);

  const [commentText, setCommentText] = useState('');

  const handleComingSoon = (feature: string) => {
    toast.success(`${feature} özelliği yakında eklenecek!`);
  };

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const toggleComments = (id: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return { ...post, showComments: !post.showComments };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: number) => {
    if (!user) {
      toast.error('Yorum yapmak için giriş yapmalısınız.');
      return;
    }
    if (!commentText.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    }));
    setCommentText('');
    toast.success('Yorumunuz eklendi!');
  };

  const handleCreatePost = (e: any) => {
    e.preventDefault();
    if (!user) {
      toast.error('Konu açmak için giriş yapmalısınız.');
      return;
    }
    if (!newPost.title || !newPost.content) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    const post = {
      id: posts.length + 1,
      author: user.displayName || user.email?.split('@')[0] || 'Kullanıcı',
      avatar: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
      time: 'Şimdi',
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setPosts([post, ...posts]);
    setIsModalOpen(false);
    setNewPost({ title: '', content: '', category: 'Genel' });
    toast.success('Konu başarıyla açıldı!');
  };

  const trending = [
    '#ValorantChampions', '#CS2Update', '#GTA6Fragman', '#Steamİndirimleri', '#LoLWorlds'
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Feed */}
      <div className="flex-1 space-y-6 min-w-0">
        <div className="flex items-center justify-between bg-[#232736] p-4 rounded-xl border border-white/5">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#5b68f6]" />
            Topluluk Akışı
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Konu Aç
          </button>
        </div>

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-[#232736] p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="text-sm font-bold text-white">{post.author}</div>
                    <div className="text-xs text-gray-400">{post.time}</div>
                  </div>
                </div>
                <span className="bg-[#2b3142] text-gray-300 text-xs px-2.5 py-1 rounded-full">{post.category}</span>
              </div>
              
              <h2 className="text-lg font-bold text-white mb-2">{post.title}</h2>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.content}</p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors text-sm ${post.isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  {post.likes}
                </button>
                <button 
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-[#5b68f6] transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  {post.comments}
                </button>
                <button 
                  onClick={() => handleComingSoon('Paylaş')}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm ml-auto"
                >
                  <Share2 className="w-4 h-4" />
                  Paylaş
                </button>
              </div>

              {post.showComments && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex gap-3">
                    <img src={user?.photoURL || `https://picsum.photos/seed/${user?.uid}/32/32`} alt="Me" className="w-8 h-8 rounded-full" />
                    <div className="flex-1 flex gap-2">
                      <input 
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Yorumunuzu yazın..."
                        className="flex-1 bg-[#1a1d27] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#5b68f6]"
                      />
                      <button 
                        onClick={() => handleAddComment(post.id)}
                        className="bg-[#5b68f6] hover:bg-[#4a55d6] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Gönder
                      </button>
                    </div>
                  </div>
                  
                  {/* Mock Comments */}
                  <div className="space-y-3 pl-11">
                    <div className="text-sm">
                      <span className="font-bold text-white mr-2">Kullanıcı_123</span>
                      <span className="text-gray-400">Harika bir paylaşım olmuş, teşekkürler!</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-white mr-2">Gamer_Pro</span>
                      <span className="text-gray-400">Bence de yetenekleri çok dengeli.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="bg-[#232736] rounded-xl border border-white/5 p-5">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Yükselen Başlıklar
          </h3>
          <div className="space-y-3">
            {trending.map((tag, i) => (
              <button 
                key={i} 
                onClick={() => handleComingSoon(tag)}
                className="block text-sm text-gray-400 hover:text-[#5b68f6] transition-colors text-left w-full"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#232736] rounded-xl border border-white/5 p-5">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            Popüler Gruplar
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/g${i}/40/40`} className="w-10 h-10 rounded-lg" alt="Group" />
                <div>
                  <div className="text-sm font-bold text-white">Grup Adı {i}</div>
                  <div className="text-xs text-gray-400">{i * 1200} Üye</div>
                </div>
                <button 
                  onClick={() => handleComingSoon('Gruba Katıl')}
                  className="ml-auto bg-[#2b3142] hover:bg-[#32394d] text-white text-xs px-3 py-1.5 rounded transition-colors"
                >
                  Katıl
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#232736] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Yeni Konu Aç</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Başlık</label>
                <input 
                  type="text" 
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                  placeholder="Konu başlığını giriniz..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Kategori</label>
                <select 
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors"
                >
                  <option value="Genel">Genel</option>
                  <option value="Valorant">Valorant</option>
                  <option value="CS2">CS2</option>
                  <option value="Donanım">Donanım</option>
                  <option value="Oyun Haberleri">Oyun Haberleri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">İçerik</label>
                <textarea 
                  rows={5}
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full bg-[#1a1d27] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5b68f6] transition-colors resize-none"
                  placeholder="Konu içeriğini detaylıca yazınız..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#5b68f6] hover:bg-[#4a55d6] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-500/20"
              >
                Konuyu Yayınla
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
