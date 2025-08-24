import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Search, FileText, CheckCircle, User, Bot, ArrowUp } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="text-blue-500" size={28} />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 text-transparent bg-clip-text">
            LegalVision
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</a>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <button 
            onClick={() => navigate('/auth')} 
            className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-all"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/auth')} 
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Get Started
          </button>
        </div>
        
        <button className="md:hidden text-white/80 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 text-transparent bg-clip-text">
                AI Civic Copilot
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-white/90">
                Smart Law & Policy Assistant
              </h2>
              <p className="text-lg text-white/70 md:pr-12">
                Get accurate legal guidance, rights protection, and official resources in one place. Navigate complex legal situations with AI assistance.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/auth')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Try Now <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => navigate('#how-it-works')} 
                className="px-6 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-800/90 backdrop-blur-sm border border-white/10 p-6 rounded-3xl shadow-2xl overflow-hidden">
              <div className="mb-6 flex items-start space-x-4 p-4 bg-gray-700/30 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-white/80">My landlord increased rent by 10% this month without proper notice. Is this legal in California?</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border backdrop-blur-sm border-green-400/30 bg-green-400/10">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white mb-2 text-sm">
                        Answer
                      </h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        NO - This violates California Civil Code Section 1947.12, which limits annual rent increases to 5% + CPI (not exceeding 10%).
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl border backdrop-blur-sm border-blue-400/30 bg-blue-400/10">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <ArrowRight size={20} className="text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white mb-2 text-sm">
                        Next Steps
                      </h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        File complaint with local rent control board within 30 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section removed */}
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Get the legal guidance you need in just a few simple steps</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
            <div className="relative p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-white/10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <FileText size={24} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload</h3>
              <p className="text-white/70 text-sm">Share your legal documents or describe your situation</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
            <div className="relative p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-white/10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Search size={24} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Research</h3>
              <p className="text-white/70 text-sm">Our AI analyzes relevant laws and precedents</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
            <div className="relative p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-white/10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Guidance</h3>
              <p className="text-white/70 text-sm">Receive clear explanations and next steps</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
            <div className="relative p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-white/10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Take Action</h3>
              <p className="text-white/70 text-sm">Download official documents and follow recommendations</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Everything you need to navigate complex legal situations</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Legal Analysis</h3>
            <p className="text-white/70">Get instant analysis of legal documents and situations with our advanced AI technology.</p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Up-to-Date Legal Information</h3>
            <p className="text-white/70">Access the most current laws and regulations, updated in real-time as legislation changes.</p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Document Generation</h3>
            <p className="text-white/70">Create legally sound documents tailored to your specific situation and jurisdiction.</p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Natural Language Interface</h3>
            <p className="text-white/70">Ask questions in plain English and get clear, jargon-free explanations and advice.</p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Data Privacy & Security</h3>
            <p className="text-white/70">Your sensitive legal information is protected with enterprise-grade encryption and security.</p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Cloud Storage</h3>
            <p className="text-white/70">Access your legal documents and history from any device, securely stored in the cloud.</p>
          </div>
        </div>
      </section>
      
      {/* Animated Showcase Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See LegalVision in Action</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Explore how our AI simplifies complex legal matters</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Animated Showcase */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-3xl blur-lg"></div>
            <div className="relative h-[500px] rounded-3xl bg-gray-800/80 backdrop-blur-sm border border-white/10 p-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-900 to-transparent z-10 rounded-t-3xl flex items-center px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mx-auto bg-gray-800/50 rounded-full px-4 py-1 text-xs text-white/70">
                  LegalVision AI Assistant
                </div>
              </div>
              
              <div className="absolute top-12 left-0 right-0 bottom-0 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 pt-4 px-4">
                {/* Animated typing effect */}
                <div className="flex gap-3 p-4 justify-start mb-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="max-w-[80%]">
                    <div className="p-4 rounded-2xl rounded-bl-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <p className="typing-animation">My landlord wants to increase my rent by 15% with only 10 days notice. Is this legal in California?</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 p-4 justify-end mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '2.5s' }}>
                  <div className="max-w-[80%]">
                    <div className="p-4 rounded-2xl rounded-br-md bg-gray-900/90 backdrop-blur-sm text-white border border-white/10">
                      <p>Based on California rental laws, I can provide you with the following analysis:</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                </div>
                
                <div className="flex gap-3 p-4 justify-end mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '3.5s' }}>
                  <div className="max-w-[80%]">
                    <div className="p-4 rounded-2xl rounded-br-md bg-gray-900/90 backdrop-blur-sm text-white border border-white/10">
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border backdrop-blur-sm border-red-400/30 bg-red-400/10 hover:scale-[1.02] transition-all duration-200">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <CheckCircle size={20} className="text-red-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white mb-2 text-sm">
                                ✅ Legal Assessment
                              </h4>
                              <p className="text-white/80 text-sm leading-relaxed">
                                This is NOT legal. Under California law (Civil Code Section 1947.12), rent increases are capped at 5% + CPI (not exceeding 10% total) annually, and require 30 days written notice for increases under 10%.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-xl border backdrop-blur-sm border-blue-400/30 bg-blue-400/10 hover:scale-[1.02] transition-all duration-200">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <ArrowRight size={20} className="text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white mb-2 text-sm">
                                📋 Next Steps
                              </h4>
                              <p className="text-white/80 text-sm leading-relaxed">
                                Respond to your landlord in writing citing Civil Code Section 1947.12. If they persist, file a complaint with your local rent board.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                </div>
                
                <div className="flex gap-3 p-4 justify-end opacity-0 animate-fade-in" style={{ animationDelay: '5s' }}>
                  <div className="max-w-[80%]">
                    <div className="p-4 rounded-2xl rounded-br-md bg-gray-900/90 backdrop-blur-sm text-white border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <FileText size={20} className="text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">Would you like me to generate a formal response letter to your landlord?</p>
                        </div>
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-lg">
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Feature Highlights */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-50"></div>
              <div className="relative p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  Real-time Legal Analysis
                </h3>
                <p className="text-white/70">LegalVision analyzes your situation in real-time, providing accurate legal information specific to your jurisdiction and circumstances.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-green-500/20 rounded-xl blur opacity-50"></div>
              <div className="relative p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Automated Document Generation
                </h3>
                <p className="text-white/70">Generate legal documents, formal responses, and compliant forms with just one click, personalized to your specific situation.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur opacity-50"></div>
              <div className="relative p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  Step-by-Step Action Plans
                </h3>
                <p className="text-white/70">Receive clear, actionable guidance with prioritized steps to address your legal situation effectively and efficiently.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future Roadmap Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Future Roadmap</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Our vision for LegalVision's evolution and upcoming features</p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full"></div>
          
          {/* Timeline items */}
          <div className="grid grid-cols-1 md:grid-cols-9 gap-8 relative">
            {/* Item 1 */}
            <div className="col-span-4 pb-16 md:text-right">
              <div className="relative md:mr-12">
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 hidden md:block">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-gray-900 z-10"></div>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold mb-3">Q4 2025</span>
                  <h3 className="text-xl font-semibold mb-2">Multilingual Support</h3>
                  <p className="text-white/70">Expanding our service with support for multiple languages, making legal guidance accessible to non-English speakers.</p>
                </div>
              </div>
            </div>
            
            {/* Spacer */}
            <div className="col-span-1 relative">
              <div className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <div className="w-6 h-6 rounded-full bg-blue-500 border-4 border-gray-900 z-10"></div>
              </div>
            </div>
            
            {/* Empty column for layout */}
            <div className="col-span-4"></div>
            
            {/* Item 2 */}
            <div className="col-span-4"></div>
            
            {/* Spacer */}
            <div className="col-span-1 relative">
              <div className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <div className="w-6 h-6 rounded-full bg-purple-500 border-4 border-gray-900 z-10"></div>
              </div>
            </div>
            
            <div className="col-span-4 pb-16">
              <div className="relative md:ml-12">
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden md:block">
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-4 border-gray-900 z-10"></div>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold mb-3">Q1 2026</span>
                  <h3 className="text-xl font-semibold mb-2">AI Legal Assistant Mobile App</h3>
                  <p className="text-white/70">A dedicated mobile application with offline capabilities and push notifications for case updates and legal changes.</p>
                </div>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="col-span-4 pb-16 md:text-right">
              <div className="relative md:mr-12">
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 hidden md:block">
                    <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-gray-900 z-10"></div>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold mb-3">Q2 2026</span>
                  <h3 className="text-xl font-semibold mb-2">Live Legal Professional Connect</h3>
                  <p className="text-white/70">Integration with a network of legal professionals for cases requiring human expertise, with seamless handoff from AI.</p>
                </div>
              </div>
            </div>
            
            {/* Spacer */}
            <div className="col-span-1 relative">
              <div className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-gray-900 z-10"></div>
              </div>
            </div>
            
            {/* Empty column for layout */}
            <div className="col-span-4"></div>
            
            {/* Item 4 */}
            <div className="col-span-4"></div>
            
            {/* Spacer */}
            <div className="col-span-1 relative">
              <div className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <div className="w-6 h-6 rounded-full bg-orange-500 border-4 border-gray-900 z-10"></div>
              </div>
            </div>
            
            <div className="col-span-4">
              <div className="relative md:ml-12">
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden md:block">
                    <div className="w-8 h-8 rounded-full bg-orange-500 border-4 border-gray-900 z-10"></div>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold mb-3">Q4 2026</span>
                  <h3 className="text-xl font-semibold mb-2">Interactive Legal Document Builder</h3>
                  <p className="text-white/70">Advanced document creation with interactive form building, collaborative editing, and e-signature integration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section removed */}

      {/* CTA Section removed */}
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-white/60 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#case-studies" className="text-white/60 hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-white/60 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#careers" className="text-white/60 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#blog" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#cookies" className="text-white/60 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#compliance" className="text-white/60 hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-blue-600 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-blue-600 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-blue-600 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
              <p className="text-white/60 text-sm">Subscribe to our newsletter for updates and insights.</p>
              <div className="mt-3 flex">
                <input type="email" placeholder="Your email" className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-blue-500" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg text-sm hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="text-blue-500" size={24} />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 text-transparent bg-clip-text">
                LegalVision
              </span>
            </div>
            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} LegalVision. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => navigate('/auth')} 
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Chat with LegalVision AI"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        <div className="absolute right-0 bottom-16 bg-white text-gray-800 py-2 px-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with LegalVision AI
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-8 left-8 z-50">
          <button 
            onClick={scrollToTop} 
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
          <div className="absolute left-0 bottom-14 bg-white text-gray-800 py-1 px-3 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none text-xs whitespace-nowrap">
            Back to top
          </div>
        </div>
      )}
    </div>
  );
};
