
import React from 'react';
import { ViewType, UserProfile } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  user: UserProfile | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, user }) => {
  const menuItems = [
    { id: ViewType.DASHBOARD, label: 'HUD', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { id: ViewType.SCANNER, label: 'SCAN', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { id: ViewType.SPIRIT_CHAT, label: 'CHAT', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: ViewType.HELP, label: 'AJUDA', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: ViewType.SPIRITUAL_DEFENSE, label: 'DEFESA', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  return (
    <>
      <aside className="hidden md:flex w-64 glass border-r border-emerald-900/30 flex-col z-50">
        <div className="p-8">
          <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] mono">Spirit IA BR</p>
        </div>
        <nav className="flex-1 mt-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-6 py-4 transition-all ${
                activeView === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border-r-2 border-emerald-500' 
                  : 'text-slate-600 hover:text-emerald-400 hover:bg-white/5'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span className="ml-4 font-bold tracking-widest text-[10px] uppercase mono">{item.label}</span>
            </button>
          ))}
          <button
              onClick={() => onViewChange(ViewType.SPIRITS_DB)}
              className={`w-full flex items-center px-6 py-4 transition-all ${
                activeView === ViewType.SPIRITS_DB 
                  ? 'bg-emerald-500/10 text-emerald-400 border-r-2 border-emerald-500' 
                  : 'text-slate-600 hover:text-emerald-400 hover:bg-white/5'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="ml-4 font-bold tracking-widest text-[10px] uppercase mono">DATABASE</span>
            </button>
        </nav>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-emerald-500/20 px-2 py-3 flex justify-around items-center z-[100] safe-area-bottom">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeView === item.id ? 'text-emerald-400' : 'text-slate-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="text-[8px] font-black mono uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
