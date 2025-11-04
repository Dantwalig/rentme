'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, ChevronLeft, ArrowLeft } from 'lucide-react';

interface FloatingChatProps {
  ownerName?: string;
  ownerPhone?: string;
  propertyTitle?: string;
  propertyId?: number;
}

interface Message {
  text: string;
  sender: 'user' | 'owner';
  timestamp: Date;
  status?: 'sent' | 'delivered';
}

interface Conversation {
  id: number;
  ownerName: string;
  ownerPhone: string;
  propertyTitle: string;
  propertyId: number;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

// Mock conversation history for demo
const initialConversations: Conversation[] = [
  {
    id: 1,
    ownerName: 'Jean Claude Mugabo',
    ownerPhone: '+250 788 123 456',
    propertyTitle: 'Whole House in Kimironko',
    propertyId: 1,
    lastMessage: 'Yes, you can visit tomorrow at 2 PM',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 1,
    messages: [
      {
        text: 'Hello, I\'m interested in the house in Kimironko',
        sender: 'user',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        status: 'delivered'
      },
      {
        text: 'Hello! Thank you for your interest. The house is still available.',
        sender: 'owner',
        timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
        status: 'delivered'
      },
      {
        text: 'Can I schedule a viewing?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        status: 'delivered'
      },
      {
        text: 'Yes, you can visit tomorrow at 2 PM',
        sender: 'owner',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'delivered'
      }
    ]
  },
  {
    id: 2,
    ownerName: 'Marie Uwase',
    ownerPhone: '+250 788 234 567',
    propertyTitle: 'Room in Gikondo',
    propertyId: 2,
    lastMessage: 'The room will be available from November 15th',
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 0,
    messages: [
      {
        text: 'Hi, is the room still available?',
        sender: 'user',
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000),
        status: 'delivered'
      },
      {
        text: 'Yes, it is! Would you like more details?',
        sender: 'owner',
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
        status: 'delivered'
      },
      {
        text: 'When can I move in?',
        sender: 'user',
        timestamp: new Date(Date.now() - 24.5 * 60 * 60 * 1000),
        status: 'delivered'
      },
      {
        text: 'The room will be available from November 15th',
        sender: 'owner',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'delivered'
      }
    ]
  },
  {
    id: 3,
    ownerName: 'Patrick Nkunda',
    ownerPhone: '+250 788 345 678',
    propertyTitle: 'Whole House in Nyarugenge',
    propertyId: 3,
    lastMessage: 'Thank you for your message!',
    lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    unreadCount: 2,
    messages: [
      {
        text: 'Is parking included in the rent?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'delivered'
      },
      {
        text: 'Thank you for your message!',
        sender: 'owner',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'delivered'
      }
    ]
  }
];

export default function FloatingChat({ ownerName, ownerPhone, propertyTitle, propertyId }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const [view, setView] = useState<'list' | 'chat'>('list');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  useEffect(() => {
    if (propertyId && ownerName && ownerPhone && propertyTitle) {
      const existingConv = conversations.find(c => c.propertyId === propertyId);
      if (!existingConv) {
        const newConversation: Conversation = {
          id: Date.now(),
          ownerName: ownerName,
          ownerPhone: ownerPhone,
          propertyTitle: propertyTitle,
          propertyId: propertyId,
          lastMessage: '',
          lastMessageTime: new Date(),
          unreadCount: 0,
          messages: []
        };
        setConversations([newConversation, ...conversations]);
        setSelectedConversation(newConversation);
        setView('chat');
      } else {
        setSelectedConversation(existingConv);
      }
    }
  }, [propertyId, ownerName, ownerPhone, propertyTitle]);

  const openChat = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setView('chat');
    setConversations(conversations.map(c => 
      c.id === conversation.id ? { ...c, unreadCount: 0 } : c
    ));
  };

  const backToList = () => {
    setView('list');
    setSelectedConversation(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setView('list');
      setSelectedConversation(null);
    }, 300);
  };

  const sendMessage = () => {
    if (message.trim() && selectedConversation) {
      const newMessage: Message = {
        text: message,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent'
      };

      const updatedConversations = conversations.map(c => {
        if (c.id === selectedConversation.id) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: message,
            lastMessageTime: new Date()
          };
        }
        return c;
      });

      setConversations(updatedConversations);
      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage]
      });
      setMessage('');

      setTimeout(() => {
        setConversations(prev => prev.map(c => {
          if (c.id === selectedConversation.id) {
            return {
              ...c,
              messages: c.messages.map(m => 
                m === newMessage ? { ...m, status: 'delivered' as const } : m
              )
            };
          }
          return c;
        }));

        setSelectedConversation(prev => prev ? {
          ...prev,
          messages: prev.messages.map(m => 
            m === newMessage ? { ...m, status: 'delivered' as const } : m
          )
        } : null);
      }, 1000);

      setTimeout(() => {
        const ownerResponse: Message = {
          text: "Thank you for your message! I'll get back to you soon.",
          sender: 'owner',
          timestamp: new Date(),
          status: 'delivered'
        };

        setConversations(prev => prev.map(c => {
          if (c.id === selectedConversation.id) {
            return {
              ...c,
              messages: [...c.messages, ownerResponse],
              lastMessage: ownerResponse.text,
              lastMessageTime: new Date(),
              unreadCount: view === 'chat' ? 0 : c.unreadCount + 1
            };
          }
          return c;
        }));

        if (selectedConversation) {
          setSelectedConversation(prev => prev ? {
            ...prev,
            messages: [...prev.messages, ownerResponse]
          } : null);
        }
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeModal}
        />
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center z-50 hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-7 h-7" />
          {totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {totalUnread}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 120px)', maxHeight: '600px' }}>
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              {view === 'list' ? (
                <button 
                  onClick={closeModal} 
                  className="hover:bg-blue-500 p-1 rounded-full transition-colors"
                  aria-label="Close messages"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={backToList} 
                  className="hover:bg-blue-500 p-1 rounded-full transition-colors"
                  aria-label="Back to conversations"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold truncate">
                  {view === 'list' ? 'Messages' : selectedConversation?.ownerName}
                </h3>
                {view === 'chat' && selectedConversation?.ownerPhone && (
                  <p className="text-xs text-blue-100 truncate">{selectedConversation.ownerPhone}</p>
                )}
              </div>
            </div>
            <button
              onClick={closeModal}
              className="text-white hover:bg-blue-500 p-2 rounded-full transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {view === 'list' && (
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="text-center text-gray-500 py-12 px-4">
                  <MessageCircle className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No conversations yet</p>
                  <p className="text-xs text-gray-400 mt-1">Start chatting with property owners</p>
                </div>
              ) : (
                <div className="divide-y">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => openChat(conv)}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">{conv.ownerName}</h4>
                              <p className="text-xs text-gray-500 truncate">{conv.propertyTitle}</p>
                            </div>
                            <span className="text-xs text-gray-400 shrink-0">{formatTime(conv.lastMessageTime)}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-1">
                            <p className="text-sm text-gray-600 truncate flex-1">{conv.lastMessage || 'Start conversation'}</p>
                            {conv.unreadCount > 0 && (
                              <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center shrink-0">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {view === 'chat' && selectedConversation && (
            <>
              <div className="bg-gray-50 p-3 border-b shrink-0">
                <p className="text-xs text-gray-600 truncate">{selectedConversation.propertyTitle}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {selectedConversation.messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <MessageCircle className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Start a conversation</p>
                    <p className="text-xs text-gray-400 mt-1">Send a message to the property owner</p>
                  </div>
                ) : (
                  <>
                    {selectedConversation.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white text-gray-900 rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm wrap-break-word">{msg.text}</p>
                          <div className="flex items-center justify-between mt-1 gap-2">
                            <span className={`text-xs ${
                              msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                            }`}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {msg.sender === 'user' && (
                              <span className={`text-xs ${
                                msg.status === 'sent' ? 'text-blue-200' : 'text-blue-100'
                              }`}>
                                {msg.status === 'sent' ? '✓' : '✓✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                <div className="flex items-end gap-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    style={{ minHeight: '44px', maxHeight: '100px' }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="w-11 h-11 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center shrink-0 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}