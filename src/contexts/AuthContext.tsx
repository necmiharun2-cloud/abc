import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  avatar?: string;
  balance: number;
  role: 'admin' | 'moderator' | 'user';
  bio?: string;
  accountStatus?: 'active' | 'frozen' | 'banned';
  salesEnabled?: boolean;
  riskNote?: string;
  createdAt: string;
  listingCount: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  storeLevel?: 'standard' | 'pro' | 'corporate';
  isVerifiedSeller?: boolean;
  kycStatus?: 'none' | 'pending' | 'verified' | 'rejected';
  kycReferenceId?: string;
  notifications?: {
    orders: boolean;
    messages: boolean;
    system: boolean;
    marketing: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true });
const BOOTSTRAP_ADMIN_EMAILS = ['necmiharun3@gmail.com'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: () => void;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }

      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const normalizedEmail = (firebaseUser.email || '').toLowerCase().trim();
        const shouldBootstrapAdmin = BOOTSTRAP_ADMIN_EMAILS.includes(normalizedEmail);
        
        // Listen to profile changes
        unsubscribeProfile = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            const existingProfile = docSnap.data() as UserProfile;
            if (shouldBootstrapAdmin && existingProfile.role !== 'admin') {
              try {
                await updateDoc(userDocRef, { role: 'admin' });
              } catch (error) {
                console.error('Admin bootstrap update failed:', error);
              }
            }
            setProfile(existingProfile);
          } else {
            // Create profile if it doesn't exist
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              avatar: firebaseUser.photoURL || '',
              balance: 0,
              role: shouldBootstrapAdmin ? 'admin' : 'user',
              bio: '',
              accountStatus: 'active',
              salesEnabled: true,
              riskNote: '',
              createdAt: new Date().toISOString(), // Keeping string for now as it's easier for simple display, but using Timestamp is better. Actually, I'll use ISO string to match the interface.
              listingCount: 0,
              soldCount: 0,
              rating: 0,
              reviewCount: 0,
              storeLevel: 'standard',
              isVerifiedSeller: false,
              kycStatus: 'none',
              kycReferenceId: '',
              notifications: {
                orders: true,
                messages: true,
                system: true,
                marketing: false,
              },
            };
            setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error fetching profile:", error);
          setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
