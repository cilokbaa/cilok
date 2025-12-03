import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllScripts } from '../services/scriptService';
import { Script, SortOption } from '../types';
import { ScriptCard } from '../components/ScriptCard';
import { Search, Filter, ChevronDown, Check, X } from 'lucide-react';

export const ScriptList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  
  // Custom Dropdown State
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getAllScripts(sortOption, searchTerm);
      setScripts(data);
      setLoading(false);
    };
    
    const timer = setTimeout(() => {
        fetch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, sortOption]);

  // Handle URL updates
  useEffect(() => {
      if(searchTerm) {
          setSearchParams({ search: searchTerm });
      } else {
          setSearchParams({});
      }
  }, [searchTerm, setSearchParams]);

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (option: SortOption) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  const getSortLabel = (option: SortOption) => {
    switch(option) {
      case 'newest': return 'Newest First';
      case 'popular': return 'Most Popular';
      case 'searched': return 'Most Searched';
      default: return 'Sort By';
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
        <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Browse Scripts</h1>
            <p className="text-gray-500 text-lg">Explore our complete collection of verified scripts.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Modern Search Bar */}
            <div className="relative group flex-grow sm:flex-grow-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Search scripts..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-80 pl-11 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-accent-100 focus:border-accent-500 outline-none transition-all shadow-sm font-medium text-gray-700 placeholder:text-gray-400"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
            </div>
            
            {/* Custom Dropdown */}
            <div className="relative min-w-[200px]" ref={sortRef}>
                <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className={`w-full flex items-center justify-between px-5 py-3.5 bg-white border rounded-2xl transition-all duration-200 shadow-sm ${
                        isSortOpen 
                            ? 'border-accent-500 ring-4 ring-accent-100' 
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                        <Filter size={18} className={`shrink-0 ${isSortOpen ? 'text-accent-500' : 'text-gray-400'}`} />
                        <span className="font-semibold text-gray-700 text-sm truncate">
                            {getSortLabel(sortOption)}
                        </span>
                    </div>
                    <ChevronDown 
                        size={18} 
                        className={`text-gray-400 transition-transform duration-300 shrink-0 ${isSortOpen ? 'rotate-180 text-accent-500' : ''}`} 
                    />
                </button>

                {/* Dropdown Menu */}
                {isSortOpen && (
                    <div className="absolute right-0 top-full mt-2 w-full bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-2 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Sort By
                        </div>
                        {[
                            { id: 'newest', label: 'Newest First' },
                            { id: 'popular', label: 'Most Popular' },
                            { id: 'searched', label: 'Most Searched' }
                        ].map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleSortSelect(opt.id as SortOption)}
                                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                                    sortOption === opt.id 
                                        ? 'bg-accent-50 text-accent-700' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                {opt.label}
                                {sortOption === opt.id && (
                                    <Check size={16} className="text-accent-500" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="h-72 bg-white rounded-3xl shadow-sm border border-gray-100 animate-pulse">
                    <div className="h-full flex flex-col p-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-2xl mb-4"></div>
                        <div className="h-6 bg-gray-100 rounded-lg w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-100 rounded-lg w-full mb-2"></div>
                        <div className="h-4 bg-gray-100 rounded-lg w-1/2 mb-auto"></div>
                        <div className="h-10 bg-gray-100 rounded-xl mt-4"></div>
                    </div>
                </div>
            ))}
        </div>
      ) : scripts.length > 0 ? (
        // Using items-stretch to ensure uniform height across the row
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {scripts.map(script => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No scripts found</h3>
            <p className="text-gray-500 max-w-xs mx-auto">
                We couldn't find any scripts matching "{searchTerm}". Try different keywords.
            </p>
            <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-accent-600 font-semibold hover:text-accent-700 hover:underline underline-offset-4"
            >
                Clear search
            </button>
        </div>
      )}
    </div>
  );
};