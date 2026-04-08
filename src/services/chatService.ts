import { collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export interface ChatMessage {
  id?: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: any;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt?: any;
  participantNames?: { [key: string]: string };
  participantAvatars?: { [key: string]: string };
}

export const chatService = {
  async createChat(participants: string[], participantData: { [key: string]: { name: string, avatar: string } }) {
    const chatId = participants.sort().join('_');
    const chatRef = doc(db, 'chats', chatId);
    
    const participantNames: { [key: string]: string } = {};
    const participantAvatars: { [key: string]: string } = {};
    
    participants.forEach(uid => {
      participantNames[uid] = participantData[uid].name;
      participantAvatars[uid] = participantData[uid].avatar;
    });

    await setDoc(chatRef, {
      participants,
      participantNames,
      participantAvatars,
      createdAt: serverTimestamp()
    }, { merge: true });

    return chatId;
  },

  getChats(userId: string, callback: (chats: Chat[]) => void) {
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', userId));
    return onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chat));
      callback(chats);
    });
  },

  getMessages(chatId: string, callback: (messages: ChatMessage[]) => void) {
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
      callback(messages);
    });
  },

  async sendMessage(chatId: string, senderId: string, text: string) {
    const messageData = {
      chatId,
      senderId,
      text,
      createdAt: serverTimestamp()
    };
    
    await addDoc(collection(db, `chats/${chatId}/messages`), messageData);
    
    // Update last message in chat doc
    await setDoc(doc(db, 'chats', chatId), {
      lastMessage: text,
      lastMessageAt: serverTimestamp()
    }, { merge: true });
  }
};
