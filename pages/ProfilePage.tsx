
import React, { useState } from 'react';
import { 
  Package, 
  Star, 
  Heart, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ChevronRight, 
  MapPin, 
  Mail, 
  Calendar,
  ExternalLink,
  FileText,
  Truck
} from 'lucide-react';
import { MOCK_USER, PRODUCTS } from '../constants';
import ScoreBadge from '../components/TrustScore/ScoreBadge';

interface ProfilePageProps {
  onNavigate: (page: string, params?: any) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'reviews' | 'saved' | 'settings'>('orders');
  const user = MOCK_USER;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {user.orders.map((order) => (
              <div key={order.id} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-50">
                    <img src={order.productImage} alt={order.productName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900">{order.productName}</h4>
                        <p className="text-xs text-slate-400">Order ID: {order.id} • {order.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                        order.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 
                        'bg-indigo-50 text-indigo-600'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm pt-2">
                      <span className="font-bold text-slate-900">₹{order.price.toLocaleString()}</span>
                      <span className="text-slate-400">Sold by {order.sellerName}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                      <button 
                        onClick={() => onNavigate('track', { orderId: order.id })}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-indigo-500"
                      >
                        <Truck size={14} />
                        Track Order
                      </button>
                      <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-200">
                        <FileText size={14} />
                        View Invoice
                      </button>
                      {order.status === 'Delivered' && (
                        <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50">
                          Review Item
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {user.reviews.length > 0 ? (
              user.reviews.map((review) => (
                <div key={review.id} className="bg-white border border-slate-200 rounded-3xl p-6">
                  <div className="flex gap-4 mb-4 items-center">
                    <img src={review.productImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h5 className="font-bold text-sm">{review.productName}</h5>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto text-xs text-slate-400">{review.date}</div>
                  </div>
                  <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded uppercase tracking-wider">Verified Purchase</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400">You haven't written any reviews yet.</p>
              </div>
            )}
          </div>
        );
      case 'saved':
        const savedProducts = PRODUCTS.filter(p => user.savedProductIds.includes(p.id));
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {savedProducts.map(p => (
              <div 
                key={p.id} 
                onClick={() => onNavigate('product', { productId: p.id })}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{p.name}</h5>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">₹{p.price.toLocaleString()}</span>
                    <ScoreBadge score={p.seller.trustScore} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input type="text" defaultValue={user.name} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue={user.email} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Security</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Password</label>
                  <input type="password" placeholder="Leave blank to keep same" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-600/20">Save Changes</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="p-8 text-center bg-slate-50 border-b border-slate-100">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-2xl border-4 border-white shadow-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
              <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-500 font-medium">
                <Mail size={14} />
                {user.email}
              </div>
              <div className="mt-6">
                <ScoreBadge score={user.trustScore} size="lg" />
              </div>
            </div>
            <div className="p-4 space-y-1">
              {[
                { id: 'orders', label: 'My Orders', icon: <Package size={18} /> },
                { id: 'reviews', label: 'My Reviews', icon: <Star size={18} /> },
                { id: 'saved', label: 'Saved Products', icon: <Heart size={18} /> },
                { id: 'settings', label: 'Account Settings', icon: <Settings size={18} /> }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                    activeTab === item.id ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                  <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-30'} />
                </button>
              ))}
              <div className="h-px bg-slate-100 my-2 mx-4"></div>
              <button 
                onClick={() => onNavigate('home')}
                className="w-full flex items-center gap-3 p-4 rounded-2xl text-rose-600 hover:bg-rose-50 font-bold transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-indigo-200" size={20} />
                <span className="text-sm font-medium">Member since {user.joinedDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-indigo-200" size={20} />
                <span className="text-sm font-medium">Bangalore, India</span>
              </div>
              <div className="pt-4">
                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-black/10">
                  <ExternalLink size={16} />
                  Public Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black text-slate-900 capitalize">
              {activeTab === 'saved' ? 'Saved Products' : activeTab === 'settings' ? 'Account Settings' : `My ${activeTab}`}
            </h3>
            <div className="text-sm text-slate-400 font-medium">
              {activeTab === 'orders' ? `${user.orders.length} orders total` : ''}
            </div>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
