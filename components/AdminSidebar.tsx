import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, LogOut, ShieldCheck } from 'lucide-react';
import { auth } from '../lib/firebase';

export const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/admin/login');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive 
        ? 'bg-accent-500 text-white shadow-lg shadow-accent-200' 
        : 'text-gray-500 hover:bg-white hover:text-gray-900'
    }`;

  return (
    <aside className="w-64 bg-gray-50/50 border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col hidden md:flex backdrop-blur-xl">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-8">
            <div className="bg-gray-900 text-white p-1.5 rounded-lg shadow-sm">
                <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
          <span className="font-bold text-xl tracking-tight">Admin</span>
        </div>

        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={navItemClass}>
            <LayoutDashboard size={20} />
            Overview
          </NavLink>
          <NavLink to="/admin/scripts" className={navItemClass}>
            <List size={20} />
            All Scripts
          </NavLink>
          <NavLink to="/admin/upload" className={navItemClass}>
            <PlusCircle size={20} />
            Upload New
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto p-8">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
