import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScriptById, recordView, recordClick } from '../services/scriptService';
import { Script } from '../types';
import { Download, Calendar, Info, Share2, Shield, AlertTriangle } from 'lucide-react';

export const ScriptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const load = async () => {
        try {
          const data = await getScriptById(id);
          if (data) {
            setScript(data);
            recordView(id); // Fire and forget
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [id]);

  const handleGetScript = () => {
    if (script && id) {
      recordClick(id);
      window.open(script.shortlink, '_blank');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!script) return <div className="min-h-screen flex items-center justify-center text-gray-500">Script not found</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-50/50 p-8 md:p-12 border-b border-gray-100 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-bold tracking-wide uppercase mb-6">
                Verified Safe
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                {script.title}
            </h1>
            <div className="flex justify-center gap-6 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-2">
                    <Calendar size={16} /> {new Date(script.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                    <Shield size={16} className="text-accent-500" /> Secure
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-600 mb-10">
                <h3 className="text-gray-900 font-semibold mb-2">Description</h3>
                <p className="leading-relaxed whitespace-pre-line">{script.description}</p>
            </div>

            {script.note && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10 flex gap-4 items-start">
                    <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={20} />
                    <div>
                        <h4 className="font-bold text-amber-800 text-sm mb-1">Developer Note</h4>
                        <p className="text-amber-700 text-sm leading-relaxed">{script.note}</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={handleGetScript}
                    className="group relative inline-flex items-center justify-center gap-3 bg-accent-500 text-white font-semibold text-lg px-12 py-4 rounded-2xl w-full md:w-auto hover:bg-accent-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-accent-200"
                >
                    <Download size={24} className="group-hover:animate-bounce" />
                    <span>Get Script</span>
                </button>
                <p className="text-xs text-gray-400 mt-2">Redirects to trusted source</p>
            </div>
        </div>
      </div>
    </div>
  );
};
