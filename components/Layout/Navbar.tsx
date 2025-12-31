
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ShieldCheck, MapPin } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">TrustLoop</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search verified products..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className={`text-sm font-medium ${currentPage === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>Home</button>
            <button onClick={() => onNavigate('categories')} className={`text-sm font-medium ${currentPage === 'categories' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>Categories</button>
            <button onClick={() => onNavigate('track')} className={`text-sm font-medium ${currentPage === 'track' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>Track Order</button>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full">
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </button>
              <button 
                onClick={() => onNavigate('profile')}
                className={`flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentPage === 'profile' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                <User size={18} />
                Profile
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button className="p-2 text-slate-600">
              <ShoppingCart size={22} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full px-4 py-2 bg-slate-100 rounded-lg text-sm"
          />
          <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="block w-full text-left py-2 text-slate-600 font-medium">Home</button>
          <button onClick={() => { onNavigate('categories'); setIsOpen(false); }} className="block w-full text-left py-2 text-slate-600 font-medium">Categories</button>
          <button onClick={() => { onNavigate('track'); setIsOpen(false); }} className="block w-full text-left py-2 text-slate-600 font-medium">Track Order</button>
          <button onClick={() => { onNavigate('profile'); setIsOpen(false); }} className="block w-full text-left py-2 text-indigo-600 font-bold">My Profile</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
