import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Target, BarChart2, Settings, Focus, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AppLayout() {
  const { user, signOut } = useAuth();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
    { icon: Target, label: 'Focus Mode', path: '/app/focus' },
    { icon: ShieldAlert, label: 'App Blocker', path: '/app/blocker' },
    { icon: BarChart2, label: 'Analytics', path: '/app/analytics' },
    { icon: Settings, label: 'Settings', path: '/app/settings' },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Focus className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">Focus.ai</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-orange-500/10 text-orange-500' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img 
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=random`} 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={signOut}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 px-6 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors ${
                isActive 
                  ? 'text-orange-500' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
