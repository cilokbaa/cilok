import React from 'react';
import { Link } from 'react-router-dom';
import { Script } from '../types';
import { Calendar, Eye, MousePointer2, ArrowRight } from 'lucide-react';

interface ScriptCardProps {
  script: Script;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({ script }) => {
  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-accent-50 group-hover:text-accent-500 transition-colors">
            <span className="font-bold text-sm">#</span>
        </div>
        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
          {new Date(script.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-accent-600 transition-colors">
        {script.title}
      </h3>
      
      <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
        {script.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
        <div className="flex gap-4 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1">
            <Eye size={14} /> {script.views}
          </span>
          <span className="flex items-center gap-1">
            <MousePointer2 size={14} /> {script.clicks}
          </span>
        </div>
        
        <Link 
          to={`/script/${script.id}`}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
