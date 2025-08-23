import React, { useRef, useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AuthPage } from './components/AuthPage';
import { LandingPage } from './components/LandingPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useChat } from './hooks/useChat';
import { useAuth, User } from './hooks/useAuth';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isInitialized, login, logout, user } = useAuth();
  
  // Handle login success - properly navigate after authentication
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Navigate to the intended destination or default to /app
      const from = location.state?.from?.pathname || '/app';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      // Error handling is already done in the AuthPage component
      throw error;
    }
  };

  // Handle logout - centralized logout logic
  const handleLogout = useCallback(() => {
    logout();
    navigate('/auth', { replace: true });
  }, [logout, navigate]);

  // Show loading screen while initializing auth state
  if (!isInitialized) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Protected app routes */}
      <Route 
        path="/app/*" 
        element={
          <ProtectedRoute 
            isAuthenticated={isAuthenticated} 
            isInitialized={isInitialized}
          >
            <ChatApplication user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      
      {/* Auth route - redirect to app if already authenticated */}
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
      
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

interface ChatApplicationProps {
  readonly user: User | null;
  readonly onLogout: () => void;
}

function ChatApplication({ user, onLogout }: ChatApplicationProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const {
    conversations,
    currentConversation,
    currentConversationId,
    isLoading,
    isInitialized: chatInitialized,
    sendMessage,
    newConversation,
    selectConversation,
    clearAllData,
  } = useChat(user?.email);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  // Handle logout - clear current session but preserve user's chat history
  const handleLogout = useCallback(() => {
    clearAllData(); // This only clears current session, not localStorage
    onLogout();
  }, [clearAllData, onLogout]);

  // Show loading screen while chat is initializing
  if (!chatInitialized) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading conversations...</p>
        </div>
      </div>
    );
  }

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
          onLogout={handleLogout}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
            {!currentConversation ? (
              <WelcomeScreen onSendMessage={sendMessage} />
            ) : (
              <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
                {currentConversation.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 p-4 justify-end w-full">
                    <div className="flex flex-col items-end max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]">
                      <div className="p-4 rounded-2xl rounded-br-md bg-gray-900/90 backdrop-blur-sm border border-white/10">
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
