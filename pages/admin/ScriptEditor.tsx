import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addScript, getScriptById, updateScript } from '../../services/scriptService';
import { Save, ArrowLeft } from 'lucide-react';

export const ScriptEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortlink: '',
    note: ''
  });

  useEffect(() => {
    if (isEditing) {
      const load = async () => {
        const data = await getScriptById(id);
        if (data) {
          setFormData({
            title: data.title,
            description: data.description,
            shortlink: data.shortlink,
            note: data.note || ''
          });
        }
      };
      load();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateScript(id, formData);
    } else {
      await addScript(formData);
    }
    navigate('/admin/scripts');
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/scripts')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Script' : 'Upload New Script'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            required
            className={inputClass}
            placeholder="e.g. Blox Fruits Auto Farm"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shortlink (Download URL)</label>
          <input
            type="url"
            required
            className={inputClass}
            placeholder="https://linkvertise..."
            value={formData.shortlink}
            onChange={e => setFormData({ ...formData, shortlink: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            required
            rows={5}
            className={inputClass}
            placeholder="Describe the features..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Developer Note (Optional)</label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Key system required"
            value={formData.note}
            onChange={e => setFormData({ ...formData, note: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-accent-500 text-white font-semibold py-4 rounded-xl hover:bg-accent-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-accent-200"
        >
          <Save size={20} />
          {isEditing ? 'Update Script' : 'Publish Script'}
        </button>
      </form>
    </div>
  );
};
