import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllScripts, deleteScript } from '../../services/scriptService';
import { Script } from '../../types';
import { Edit2, Trash2, Plus } from 'lucide-react';

export const ManageScripts: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([]);

  const loadScripts = async () => {
    const data = await getAllScripts('newest');
    setScripts(data);
  };

  useEffect(() => {
    loadScripts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this script?')) {
      await deleteScript(id);
      loadScripts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Scripts</h1>
            <p className="text-gray-500">Edit or remove existing scripts.</p>
        </div>
        <Link 
            to="/admin/upload" 
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
        >
            <Plus size={16} /> Add New
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scripts.map((script) => (
                <tr key={script.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{script.title}</div>
                    <div className="text-sm text-gray-400 truncate max-w-xs">{script.shortlink}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(script.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex gap-3">
                        <span>{script.views} views</span>
                        <span>{script.clicks} clicks</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Link 
                            to={`/admin/edit/${script.id}`}
                            className="p-2 text-gray-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                        >
                            <Edit2 size={18} />
                        </Link>
                        <button 
                            onClick={() => handleDelete(script.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
