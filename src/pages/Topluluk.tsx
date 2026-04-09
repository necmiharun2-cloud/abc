import { MessageSquare, TrendingUp, Users, Plus, Heart, Share2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function Topluluk() {
  const { user, profile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Genel' });
  const [posts, setPosts] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(fetchedPosts);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!activeCommentsPostId) {
      setComments([]);
      return;
    }
    const q = query(collection(db, `posts/${activeCommentsPostId}/comments`), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(fetchedComments);
    });
    return unsubscribe;
  }, [activeCommentsPostId]);

  const handleLike = async (postId: string) => {
    if (!user) {
      toast.error('Beğenmek için giriş yapmalısınız.');
      return;
    }
    const postRef = doc(db, 'posts', postId);
    try {
      await updateDoc(postRef, {
        likes: increment(1)
      });
    } catch (error) {
      toast.error('Bir hata oluştu.');
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user) {
      toast.error('Yorum yapmak için giriş yapmalısınız.');
      return;
    }
    if (!commentText.trim()) return;

    try {
      await addDoc(collection(db, `posts/${postId}/comments`), {
        postId,
        authorId: user.uid,
        authorName: profile?.username || user.displayName || 'Kullanıcı',
        authorAvatar: profile?.avatar || user.photoURL || '',
        text: commentText,
        createdAt: serverTimestamp()
      });
      
      await updateDoc(doc(db, 'posts', postId), {
        commentCount: increment(1)
      });
      
      setCommentText('');
      toast.success('Yorumunuz eklendi!');
    } catch (error) {
      toast.error('Yorum eklenemedi.');
    }
  };

  const handleCreatePost = async (e: any) => {
    e.preventDefault();
    if (!user) {
      toast.error('Konu açmak için giriş yapmalısınız.');
      return;
    }
    if (!newPost.title || !newPost.content) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        authorId: user.uid,
        authorName: profile?.username || user.displayName || 'Kullanıcı',
        authorAvatar: profile?.avatar || user.photoURL || '',
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        likes: 0,
        commentCount: 0,
        createdAt: serverTimestamp()
      });

      setIsModalOpen(false);
      setNewPost({ title: '', content: '', category: 'Genel' });
      toast.success('Konu başarıyla açıldı!');
    } catch (error) {
      toast.error('Konu açılamadı.');
    }
  };

  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const handleJoinGroup = (groupId: number) => {
    if (!user) {
      toast.error('Gruplara katılmak için giriş yapmalısınız.');
      return;
    }
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId));
      toast.success('Gruptan ayrıldınız.');
    } else {
      setJoinedGroups([...joinedGroups, groupId]);
      toast.success('Gruba başarıyla katıldınız!');
    }
  };

  const filteredPosts = filterTag 
    ? posts.filter(p => p.title.toLowerCase().includes(filterTag.toLowerCase().replace('#', '')) || p.content.toLowerCase().includes(filterTag.toLowerCase().replace('#', '')))
    : posts;

  const trending = [
    '#Valorant', '#CS2', '#GTA6', '#Steam', '#LoL'
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
          {filterTag && (
            <div className="flex items-center justify-between bg-[#232736] p-3 rounded-xl border border-[#5b68f6]/30">
              <span className="text-sm text-gray-400">
                <span className="text-[#5b68f6] font-bold">{filterTag}</span> etiketi için sonuçlar
              </span>
              <button 
                onClick={() => setFilterTag(null)}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Filtreyi Temizle
              </button>
            </div>
          )}
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-[#232736] p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {post.authorAvatar ? (
                    <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#2b3142] flex items-center justify-center text-xs text-white font-bold">
                      {(post.authorName || 'K').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-white">{post.authorName}</div>
                    <div className="text-xs text-gray-400">
                      {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : '-'}
                    </div>
                  </div>
                </div>
                <span className="bg-[#2b3142] text-gray-300 text-xs px-2.5 py-1 rounded-full">{post.category}</span>
              </div>
              
              <h2 className="text-lg font-bold text-white mb-2">{post.title}</h2>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.content}</p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 transition-colors text-sm text-gray-400 hover:text-pink-500"
                >
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </button>
                <button 
                  onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-[#5b68f6] transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  {post.commentCount}
                </button>
                <button 
                  onClick={() => toast.success('Paylaşım linki kopyalandı!')}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm ml-auto"
                >
                  <Share2 className="w-4 h-4" />
                  Paylaş
                </button>
              </div>

              {activeCommentsPostId === post.id && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex gap-3">
                    {profile?.avatar || user?.photoURL ? (
                      <img src={profile?.avatar || user?.photoURL || ''} alt="Me" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#2b3142] flex items-center justify-center text-[10px] text-white font-bold">
                        {(profile?.username || user?.displayName || user?.email || 'K').charAt(0).toUpperCase()}
                      </div>
                    )}
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
                  
                  <div className="space-y-3 pl-11">
                    {comments.map(comment => (
                      <div key={comment.id} className="text-sm">
                        <span className="font-bold text-white mr-2">{comment.authorName}</span>
                        <span className="text-gray-400">{comment.text}</span>
                      </div>
                    ))}
                    {comments.length === 0 && (
                      <p className="text-xs text-gray-500 italic">Henüz yorum yapılmamış.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-20 bg-[#232736] rounded-xl border border-white/5">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Henüz hiç konu açılmamış. İlk konuyu sen aç!</p>
            </div>
          )}
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
                onClick={() => setFilterTag(tag)}
                className={`block text-sm transition-colors text-left w-full ${filterTag === tag ? 'text-[#5b68f6] font-bold' : 'text-gray-400 hover:text-[#5b68f6]'}`}
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
                <div className="w-10 h-10 rounded-lg bg-[#2b3142] flex items-center justify-center text-xs text-white font-bold">
                  G{i}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Grup Adı {i}</div>
                  <div className="text-xs text-gray-400">{i * 1200} Üye</div>
                </div>
                <button 
                  onClick={() => handleJoinGroup(i)}
                  className={`ml-auto text-xs px-3 py-1.5 rounded transition-colors font-bold ${joinedGroups.includes(i) ? 'bg-emerald-500/20 text-emerald-500' : 'bg-[#2b3142] hover:bg-[#32394d] text-white'}`}
                >
                  {joinedGroups.includes(i) ? 'Katıldın' : 'Katıl'}
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
