import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Zap } from 'lucide-react';
import { getLatestScripts } from '../services/scriptService';
import { Script } from '../types';
import { ScriptCard } from '../components/ScriptCard';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [latestScripts, setLatestScripts] = useState<Script[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const scripts = await getLatestScripts(6);
        setLatestScripts(scripts);
      } catch (error) {
        console.error("Failed to load scripts", error);
      }
    };
    fetchScripts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/scripts?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent-200/20 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-8 animate-fade-in-up">
            <Sparkles size={16} className="text-accent-500" />
            <span className="text-sm font-medium text-gray-600">Powered by your need</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Find the best <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-accent-600">
              Roblox Scripts
            </span>
          </h1>
          
          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Secure, verified, and high-quality scripts for your gameplay. 
            Monitored daily for safety and performance.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl">
                <Search className="absolute left-4 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for scripts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none focus:ring-0 text-gray-900 placeholder-gray-400 bg-transparent text-lg"
                />
                <button 
                  type="submit"
                  className="absolute right-2 bg-black text-white p-2.5 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Zap size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Latest Uploads */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Latest Scripts</h2>
              <p className="text-gray-500">The latest verified scripts added to the collection.</p>
            </div>
            <button 
              onClick={() => navigate('/scripts')}
              className="text-sm font-semibold text-accent-600 hover:text-accent-700 hover:bg-accent-50 px-4 py-2 rounded-lg transition-colors"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestScripts.length > 0 ? (
              latestScripts.map(script => (
                <ScriptCard key={script.id} script={script} />
              ))
            ) : (
               [1, 2, 3].map((n) => (
                  <div key={n} className="h-64 bg-gray-50 rounded-3xl animate-pulse"></div>
               ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
