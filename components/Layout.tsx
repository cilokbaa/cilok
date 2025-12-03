import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin && location.pathname !== '/admin/login') {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans selection:bg-green-100 selection:text-green-800">
      {/* Navbar with Enhanced Glassmorphism */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/60 supports-[backdrop-filter]:bg-white/60 border-b border-gray-200/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* REPLACE THE URL BELOW WITH YOUR LOGO IMAGE LINK */}
              <img 
                src="https://aipicres.com/remove-bg/20251203/7873d7f9-a005-4ae1-8379-effdbce5c2fe.png" 
                alt="Logo" 
                className="h-10 w-10 rounded-xl object-cover shadow-sm group-hover:shadow-green-200 group-hover:scale-105 transition-all duration-300"
              />
              <span className="font-bold text-xl tracking-tight text-gray-900">ScriptBinary</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors">Home</Link>
              <Link to="/scripts" className="text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors">All Scripts</Link>
              <Link to="https://youtube.com/@scriptbinary" className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">Youtube</Link>
            </div>

            {/* Mobile Menu Button with Morph Animation */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group relative w-10 h-10 focus:outline-none rounded-xl hover:bg-black/5 transition-colors flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col justify-between w-5 h-4 transform transition-all duration-300 origin-center overflow-hidden">
                  <span 
                    className={`bg-gray-900 h-[2px] w-full rounded-full transform transition-all duration-300 origin-left delay-[50ms] ${
                      isMenuOpen ? 'translate-x-[3px] -translate-y-[1px] rotate-45 w-2/3 group-hover:w-full' : 'translate-y-0 rotate-0 w-full'
                    }`} 
                  />
                  <span 
                    className={`bg-gray-900 h-[2px] w-full rounded-full transform transition-all duration-300 ${
                      isMenuOpen ? 'translate-x-3 opacity-0' : 'translate-x-0 opacity-100'
                    }`} 
                  />
                  <span 
                    className={`bg-gray-900 h-[2px] w-full rounded-full transform transition-all duration-300 origin-left delay-[50ms] ${
                      isMenuOpen ? 'translate-x-[3px] translate-y-[1px] -rotate-45 w-2/3 group-hover:w-full' : 'translate-y-0 rotate-0 w-full'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div className={`md:hidden absolute w-full bg-white/90 backdrop-blur-2xl border-b border-gray-100 shadow-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl text-base font-semibold text-gray-800 hover:text-accent-600 hover:bg-gray-50/80 transition-all"
              >
                Home
              </Link>
              <Link 
                to="/scripts" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl text-base font-semibold text-gray-800 hover:text-accent-600 hover:bg-gray-50/80 transition-all"
              >
                All Scripts
              </Link>
              <Link 
                to="https://youtube.com/@scriptbinary" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl text-base font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-50/80 transition-all"
              >
                Youtube
              </Link>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="bg-gray-900 text-white p-1 rounded shadow-sm">
                  <ShieldCheck size={16} strokeWidth={2.5} />
                </div>
              <p className="text-sm text-gray-500">© 2025 ScriptBinary. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <Link to="/disclaimer" className="text-sm text-gray-500 hover:text-accent-600 transition-colors">Disclaimer</Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-accent-600 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-accent-600 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
