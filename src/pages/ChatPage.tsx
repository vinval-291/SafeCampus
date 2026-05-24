import React, { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  orderBy,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, Chat, Message } from '../types';
import { 
  Send, 
  User as UserIcon, 
  ArrowLeft,
  Search,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Props {
  profile: UserProfile | null;
}

const ChatPage = ({ profile }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const chatIdParam = searchParams.get('id');
  
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatPartners, setChatPartners] = useState<Record<string, UserProfile>>({});
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profile) return;

    const chatsQuery = query(
      collection(db, 'chats'), 
      where('participants', 'array-contains', profile.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(chatsQuery, async (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chat));
      setChats(chatList);
      
      if (chatIdParam) {
        const found = chatList.find(c => c.id === chatIdParam);
        if (found) setActiveChat(found);
      } else if (chatList.length > 0 && !activeChat) {
        // Option to auto-select first chat
      }
      
      setLoading(false);

      // Fetch partner info
      const partnerIds = [...new Set(chatList.map(c => c.participants.find(p => p !== profile.uid)!))];
      partnerIds.forEach(async (id) => {
        if (!chatPartners[id]) {
          const uSnap = await onSnapshot(doc(db, 'users', id), (d) => {
            if (d.exists()) {
              setChatPartners(prev => ({ ...prev, [id]: d.data() as UserProfile }));
            }
          });
        }
      });
    });

    return () => unsubscribe();
  }, [profile, chatIdParam]);

  useEffect(() => {
    if (!activeChat) return;

    const msgsQuery = query(
      collection(db, 'messages'),
      where('chatId', '==', activeChat.id),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(msgsQuery, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsubscribe();
  }, [activeChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !profile) return;

    const text = newMessage;
    setNewMessage('');

    try {
      await addDoc(collection(db, 'messages'), {
        chatId: activeChat.id,
        senderId: profile.uid,
        text,
        createdAt: serverTimestamp()
      });

      await updateDoc(doc(db, 'chats', activeChat.id), {
        lastMessage: text,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!profile) return <div className="p-24 text-center">Please log in</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden h-full flex">
        
        {/* Sidebar: Chat List */}
        <div className={cn(
          "w-full md:w-80 border-r border-slate-100 dark:border-slate-800 flex flex-col transition-all",
          activeChat ? "hidden md:flex" : "flex"
        )}>
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.length > 0 ? chats.map(chat => {
              const partnerId = chat.participants.find(p => p !== profile.uid)!;
              const partner = chatPartners[partnerId];
              return (
                <button 
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={cn(
                    "w-full p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border-b border-slate-50 dark:border-slate-800 shadow-none",
                    activeChat?.id === chat.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600" : ""
                  )}
                >
                  <img 
                    src={partner?.photoURL || `https://ui-avatars.com/api/?name=${partner?.displayName || 'User'}`} 
                    className="w-12 h-12 rounded-full border border-slate-100"
                    alt={partner?.displayName || 'User'}
                  />
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{partner?.displayName || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{chat.lastMessage || 'Start a conversation'}</p>
                  </div>
                </button>
              );
            }) : (
              <div className="p-12 text-center text-slate-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-sm font-medium">No messages yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content: Message Bubble Area */}
        <div className={cn(
          "flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 transition-all",
          !activeChat ? "hidden md:flex" : "flex"
        )}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <button 
                  onClick={() => setActiveChat(null)}
                  className="md:hidden p-2 text-slate-400 hover:text-slate-600"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                {(() => {
                  const partnerId = activeChat.participants.find(p => p !== profile.uid)!;
                  const partner = chatPartners[partnerId];
                  return (
                    <>
                      <img 
                        src={partner?.photoURL || `https://ui-avatars.com/api/?name=${partner?.displayName || 'User'}`} 
                        className="w-10 h-10 rounded-full"
                        alt={partner?.displayName || 'User'}
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{partner?.displayName || 'User'}</h3>
                        <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Active now</p>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Messages Grid */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map(msg => {
                  const isMe = msg.senderId === profile.uid;
                  return (
                    <div key={msg.id} className={cn(
                      "flex",
                      isMe ? "justify-end" : "justify-start"
                    )}>
                      <div className={cn(
                        "max-w-[80%] p-4 rounded-2xl text-sm shadow-sm",
                        isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-100 dark:border-slate-700"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 px-6 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Select a conversation</h3>
              <p className="text-slate-500 max-w-xs">Pick a chat from the sidebar to start messaging with landlords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
