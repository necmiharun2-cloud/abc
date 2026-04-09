import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { addDoc, collection, doc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

type TabKey = 'withdrawals' | 'support' | 'moderation' | 'kyc' | 'users' | 'disputes' | 'finance' | 'logs';

export default function AdminPanel() {
  const { user, profile, loading } = useAuth();
  const [tab, setTab] = useState<TabKey>('withdrawals');
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [kycQueue, setKycQueue] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [adminLogs, setAdminLogs] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchUser, setSearchUser] = useState('');
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const isStaff = profile?.role === 'admin' || profile?.role === 'moderator';
  const isAdmin = profile?.role === 'admin';

  const loadAll = async () => {
    if (!user || !isStaff) return;
    setLoadingData(true);
    try {
      const [
        wdSnap,
        ticketSnap,
        productSnap,
        kycSnap,
        userSnap,
        disputeSnap,
        txSnap,
        logSnap,
      ] = await Promise.all([
        getDocs(query(collection(db, 'withdrawals'), orderBy('createdAt', 'desc'), limit(100))),
        getDocs(query(collection(db, 'supportTickets'), orderBy('createdAt', 'desc'), limit(100))),
        getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(100))),
        getDocs(query(collection(db, 'kycRequests'), orderBy('createdAt', 'desc'), limit(100))),
        getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(100))),
        getDocs(query(collection(db, 'disputes'), orderBy('createdAt', 'desc'), limit(100))),
        getDocs(query(collection(db, 'transactions'), orderBy('createdAt', 'desc'), limit(200))),
        getDocs(query(collection(db, 'adminLogs'), orderBy('createdAt', 'desc'), limit(200))),
      ]);

      setWithdrawals(wdSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setTickets(ticketSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setProducts(productSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setKycQueue(kycSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setUsers(userSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setDisputes(disputeSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setTransactions(txSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setAdminLogs(logSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      toast.error('Admin verileri yüklenemedi.');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [user, profile?.role]);

  const logAction = async (action: string, entity: string, entityId: string, details?: any) => {
    if (!user) return;
    await addDoc(collection(db, 'adminLogs'), {
      actorId: user.uid,
      actorRole: profile?.role || 'unknown',
      action,
      entity,
      entityId,
      details: details || {},
      createdAt: serverTimestamp(),
    });
  };

  const updateWithdrawalStatus = async (row: any, status: 'Onaylandı' | 'Reddedildi') => {
    if (!isStaff) return;
    const rejectionReason = status === 'Reddedildi' ? window.prompt('Red nedeni girin:') || '' : '';
    try {
      await updateDoc(doc(db, 'withdrawals', row.id), {
        status,
        rejectionReason,
        processedBy: user?.uid || '',
        processedAt: serverTimestamp(),
      });
      await logAction('withdrawal.updateStatus', 'withdrawals', row.id, { status, rejectionReason });
      toast.success('Çekim durumu güncellendi.');
      loadAll();
    } catch {
      toast.error('Çekim işlemi güncellenemedi.');
    }
  };

  const updateTicket = async (ticket: any, status: string) => {
    if (!isStaff) return;
    try {
      await updateDoc(doc(db, 'supportTickets', ticket.id), {
        status,
        assignedTo: user?.uid || '',
        updatedAt: serverTimestamp(),
      });
      await logAction('ticket.update', 'supportTickets', ticket.id, { status });
      toast.success('Destek talebi güncellendi.');
      loadAll();
    } catch {
      toast.error('Destek talebi güncellenemedi.');
    }
  };

  const addTicketReply = async (ticket: any) => {
    const message = (replyText[ticket.id] || '').trim();
    if (!message) return;
    try {
      await addDoc(collection(db, 'supportTicketReplies'), {
        ticketId: ticket.id,
        actorId: user?.uid || '',
        actorRole: profile?.role || 'moderator',
        message,
        createdAt: serverTimestamp(),
      });
      await logAction('ticket.reply', 'supportTickets', ticket.id, { message });
      setReplyText((prev) => ({ ...prev, [ticket.id]: '' }));
      toast.success('Ticket cevabı kaydedildi.');
    } catch {
      toast.error('Cevap kaydedilemedi.');
    }
  };

  const moderateProduct = async (item: any, moderationStatus: string) => {
    if (!isStaff) return;
    const reason = window.prompt('Moderasyon notu / sebep girin:') || '';
    try {
      await updateDoc(doc(db, 'products', item.id), {
        moderationStatus,
        moderationReason: reason,
        status: moderationStatus === 'approved' ? 'active' : moderationStatus === 'suspended' ? 'inactive' : item.status || 'inactive',
        isVitrin: moderationStatus === 'removed_from_showcase' ? false : item.isVitrin || false,
        updatedAt: serverTimestamp(),
      });
      await logAction('product.moderation', 'products', item.id, { moderationStatus, reason });
      toast.success('İlan moderasyonu güncellendi.');
      loadAll();
    } catch {
      toast.error('İlan moderasyonu başarısız.');
    }
  };

  const reviewKyc = async (request: any, status: 'verified' | 'rejected' | 'needs_more_documents') => {
    if (!isStaff) return;
    const note = status !== 'verified' ? window.prompt('İnceleme notu girin:') || '' : '';
    try {
      await updateDoc(doc(db, 'kycRequests', request.id), {
        status,
        reviewedBy: user?.uid || '',
        reviewNote: note,
        reviewedAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'users', request.userId), {
        kycStatus: status === 'needs_more_documents' ? 'pending' : status,
        isVerifiedSeller: status === 'verified',
        storeLevel: status === 'verified' ? 'corporate' : 'standard',
      });
      await logAction('kyc.review', 'kycRequests', request.id, { status, note, userId: request.userId });
      toast.success('KYC başvurusu güncellendi.');
      loadAll();
    } catch {
      toast.error('KYC güncellemesi başarısız.');
    }
  };

  const updateUser = async (u: any, patch: any, action: string) => {
    if (!isStaff) return;
    try {
      await updateDoc(doc(db, 'users', u.id), { ...patch, updatedAt: serverTimestamp() });
      await logAction(action, 'users', u.id, patch);
      toast.success('Kullanıcı kaydı güncellendi.');
      loadAll();
    } catch {
      toast.error('Kullanıcı güncellemesi başarısız.');
    }
  };

  const resolveDispute = async (d: any, decision: 'refund_buyer' | 'release_seller') => {
    if (!isStaff) return;
    const note = window.prompt('Karar notu girin:') || '';
    try {
      await updateDoc(doc(db, 'disputes', d.id), {
        status: 'resolved',
        decision,
        note,
        resolvedBy: user?.uid || '',
        resolvedAt: serverTimestamp(),
      });
      await logAction('dispute.resolve', 'disputes', d.id, { decision, note });
      toast.success('Uyuşmazlık kararı kaydedildi.');
      loadAll();
    } catch {
      toast.error('Uyuşmazlık çözümlenemedi.');
    }
  };

  const addManualAdjustment = async () => {
    const userId = window.prompt('Kullanıcı ID:') || '';
    const amount = Number(window.prompt('Tutar (+/-):') || 0);
    const reason = window.prompt('Açıklama:') || 'Manual adjustment';
    if (!userId || Number.isNaN(amount) || amount === 0) return;
    try {
      await addDoc(collection(db, 'transactions'), {
        userId,
        type: 'manual_adjustment',
        amount,
        fee: 0,
        status: 'completed',
        relatedId: user?.uid || '',
        reason,
        createdAt: serverTimestamp(),
      });
      await logAction('finance.manualAdjustment', 'transactions', userId, { amount, reason });
      toast.success('Manuel finans hareketi kaydedildi.');
      loadAll();
    } catch {
      toast.error('Manuel işlem kaydedilemedi.');
    }
  };

  const filteredUsers = useMemo(
    () => users.filter((u) => (u.username || '').toLowerCase().includes(searchUser.toLowerCase()) || u.id.includes(searchUser)),
    [users, searchUser]
  );

  if (loading) return <div className="text-center py-20 text-white">Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!isStaff) return <Navigate to="/kontrol-merkezi" />;

  return (
    <div className="max-w-[1500px] mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
      <div className="flex flex-wrap gap-2">
        {[
          ['withdrawals', 'Çekimler'],
          ['support', 'Destek'],
          ['moderation', 'İlan Moderasyon'],
          ['kyc', 'KYC'],
          ['users', 'Kullanıcılar'],
          ['disputes', 'Uyuşmazlıklar'],
          ['finance', 'Finans'],
          ['logs', 'Audit Log'],
        ].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k as TabKey)} className={`px-3 py-2 rounded text-sm ${tab === k ? 'bg-[#5b68f6] text-white' : 'bg-[#232736] text-gray-300'}`}>
            {label}
          </button>
        ))}
      </div>

      {loadingData ? (
        <div className="text-gray-300">Yönetim verileri yükleniyor...</div>
      ) : (
        <div className="space-y-3">
          {tab === 'withdrawals' && withdrawals.map((w) => (
            <div key={w.id} className="bg-[#232736] p-4 rounded border border-white/5 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-300">{w.userId} - {(Number(w.amount) || 0).toFixed(2)} ₺ - {w.status}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-emerald-600 rounded text-xs" onClick={() => updateWithdrawalStatus(w, 'Onaylandı')}>Onayla</button>
                <button className="px-3 py-1 bg-red-600 rounded text-xs" onClick={() => updateWithdrawalStatus(w, 'Reddedildi')}>Reddet</button>
              </div>
            </div>
          ))}

          {tab === 'support' && tickets.map((t) => (
            <div key={t.id} className="bg-[#232736] p-4 rounded border border-white/5 space-y-3">
              <div className="text-sm text-gray-300">{t.subject} - {t.status} - {t.userId}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 rounded text-xs" onClick={() => updateTicket(t, 'queue')}>Kuyruğa Al</button>
                <button className="px-3 py-1 bg-amber-600 rounded text-xs" onClick={() => updateTicket(t, 'pending')}>Beklet</button>
                <button className="px-3 py-1 bg-emerald-600 rounded text-xs" onClick={() => updateTicket(t, 'closed')}>Çözüldü</button>
              </div>
              <div className="flex gap-2">
                <input
                  value={replyText[t.id] || ''}
                  onChange={(e) => setReplyText((prev) => ({ ...prev, [t.id]: e.target.value }))}
                  className="flex-1 bg-[#1a1d27] border border-white/10 rounded px-3 py-2 text-sm text-white"
                  placeholder="Cevap yaz..."
                />
                <button className="px-3 py-1 bg-[#5b68f6] rounded text-xs" onClick={() => addTicketReply(t)}>Yanıtla</button>
              </div>
            </div>
          ))}

          {tab === 'moderation' && products.map((p) => (
            <div key={p.id} className="bg-[#232736] p-4 rounded border border-white/5 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-300">{p.title} - {p.status} - {p.moderationStatus || 'pending'}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-emerald-600 rounded text-xs" onClick={() => moderateProduct(p, 'approved')}>Onayla</button>
                <button className="px-3 py-1 bg-amber-600 rounded text-xs" onClick={() => moderateProduct(p, 'suspended')}>Askıya Al</button>
                <button className="px-3 py-1 bg-red-600 rounded text-xs" onClick={() => moderateProduct(p, 'rejected')}>Reddet</button>
                <button className="px-3 py-1 bg-gray-600 rounded text-xs" onClick={() => moderateProduct(p, 'removed_from_showcase')}>Vitrinden Kaldır</button>
              </div>
            </div>
          ))}

          {tab === 'kyc' && kycQueue.map((k) => (
            <div key={k.id} className="bg-[#232736] p-4 rounded border border-white/5 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-300">{k.userId} - {k.fullName} - {k.status}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-emerald-600 rounded text-xs" onClick={() => reviewKyc(k, 'verified')}>Onayla</button>
                <button className="px-3 py-1 bg-red-600 rounded text-xs" onClick={() => reviewKyc(k, 'rejected')}>Reddet</button>
                <button className="px-3 py-1 bg-amber-600 rounded text-xs" onClick={() => reviewKyc(k, 'needs_more_documents')}>Belge İste</button>
              </div>
            </div>
          ))}

          {tab === 'users' && (
            <div className="space-y-3">
              <input value={searchUser} onChange={(e) => setSearchUser(e.target.value)} className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded px-3 py-2 text-sm text-white" placeholder="Kullanıcı ara (id veya ad)" />
              {filteredUsers.map((u) => (
                <div key={u.id} className="bg-[#232736] p-4 rounded border border-white/5 space-y-2">
                  <div className="text-sm text-gray-300">{u.username} - {u.id} - rol: {u.role} - hesap: {u.accountStatus || 'active'}</div>
                  <div className="flex flex-wrap gap-2">
                    <button disabled={!isAdmin} className="px-3 py-1 bg-blue-600 rounded text-xs disabled:opacity-40" onClick={() => updateUser(u, { role: 'moderator' }, 'user.roleToModerator')}>Moderator</button>
                    <button disabled={!isAdmin} className="px-3 py-1 bg-indigo-600 rounded text-xs disabled:opacity-40" onClick={() => updateUser(u, { role: 'admin' }, 'user.roleToAdmin')}>Admin</button>
                    <button disabled={!isAdmin} className="px-3 py-1 bg-gray-600 rounded text-xs disabled:opacity-40" onClick={() => updateUser(u, { role: 'user' }, 'user.roleToUser')}>User</button>
                    <button className="px-3 py-1 bg-amber-600 rounded text-xs" onClick={() => updateUser(u, { accountStatus: 'frozen' }, 'user.freeze')}>Dondur</button>
                    <button className="px-3 py-1 bg-red-600 rounded text-xs" onClick={() => updateUser(u, { accountStatus: 'banned' }, 'user.ban')}>Banla</button>
                    <button className="px-3 py-1 bg-emerald-600 rounded text-xs" onClick={() => updateUser(u, { accountStatus: 'active' }, 'user.unfreeze')}>Aktif Et</button>
                    <button className="px-3 py-1 bg-purple-600 rounded text-xs" onClick={() => updateUser(u, { salesEnabled: !(u.salesEnabled ?? true) }, 'user.toggleSales')}>Satış Yetkisi</button>
                    <button className="px-3 py-1 bg-[#5b68f6] rounded text-xs" onClick={() => updateUser(u, { riskNote: window.prompt('Risk notu:') || '' }, 'user.riskNote')}>Risk Notu</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'disputes' && disputes.map((d) => (
            <div key={d.id} className="bg-[#232736] p-4 rounded border border-white/5 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-300">Order: {d.orderId} - {d.status} - {d.reason}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-red-600 rounded text-xs" onClick={() => resolveDispute(d, 'refund_buyer')}>İade Et</button>
                <button className="px-3 py-1 bg-emerald-600 rounded text-xs" onClick={() => resolveDispute(d, 'release_seller')}>Satıcıya Bırak</button>
              </div>
            </div>
          ))}

          {tab === 'finance' && (
            <div className="space-y-3">
              <button className="px-3 py-2 bg-[#5b68f6] rounded text-sm" onClick={addManualAdjustment}>Manuel Düzeltme Ekle</button>
              {transactions.slice(0, 80).map((t) => (
                <div key={t.id} className="bg-[#232736] p-3 rounded border border-white/5 text-sm text-gray-300">
                  {t.userId} - {t.type} - {(Number(t.amount) || 0).toFixed(2)} ₺ - {t.status}
                </div>
              ))}
            </div>
          )}

          {tab === 'logs' && adminLogs.map((l) => (
            <div key={l.id} className="bg-[#232736] p-3 rounded border border-white/5 text-sm text-gray-300">
              {l.actorId} - {l.action} - {l.entity}/{l.entityId}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
