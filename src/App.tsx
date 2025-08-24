import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AuthPage } from './components/AuthPage';
import { LandingPage } from './components/LandingPage';
import { useChat } from './hooks/useChat';
import { useAuth } from './hooks/useAuth';
import { ArrowUp } from 'lucide-react';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  
  // Handle login success - properly navigate after authentication
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // After successful login, navigate to /app
      navigate('/app');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/app/*" 
        element={
          isAuthenticated ? (
            <ChatApplication />
          ) : (
            <Navigate to="/auth" replace />
          )
        } 
      />
      <Route 
        path="/auth" 
        element={
          isAuthenticated ? (
            <Navigate to="/app" replace />
          ) : (
            <AuthPage onLogin={handleLogin} />
          )
        } 
      />
      {/* Add a catch-all redirect to the landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function ChatApplication() {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const {
    conversations,
    currentConversation,
    currentConversationId,
    isLoading,
    sendMessage,
    newConversation,
    selectConversation,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
      if (scrollContainer && scrollContainer.scrollTop > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-green-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 h-full flex">
        <Sidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewConversation={newConversation}
          onSelectConversation={selectConversation}
          user={user}
          onLogout={logout}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
            {!currentConversation ? (
              <WelcomeScreen onSendMessage={sendMessage} />
            ) : (
              <div className="max-w-4xl mx-auto w-full">
                {currentConversation.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 p-4 justify-end">
                    <div className="max-w-[70%]">
                      <div className="p-4 rounded-2xl rounded-br-md bg-white/10 backdrop-blur-sm border border-white/20">
                        <div className="flex items-center gap-2 text-white/60">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animation-delay-200"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animation-delay-400"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          
          {/* Scroll to top button */}
          {showScrollTop && (
            <button 
              onClick={() => {
                const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
                if (scrollContainer) {
                  scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="fixed bottom-24 right-8 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default App;