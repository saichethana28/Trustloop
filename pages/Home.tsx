
import React from 'react';
import { ShieldCheck, Truck, CheckCircle, ArrowRight, Star, TrendingUp, Users } from 'lucide-react';
import { CATEGORIES, PRODUCTS, getIcon } from '../constants';
import ScoreBadge from '../components/TrustScore/ScoreBadge';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center md:text-left md:flex items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-semibold">
              <ShieldCheck size={16} />
              Verified Market Leaders
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Buy with Confidence. <br />
              <span className="text-indigo-400">Powered by Trust.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              The only marketplace where every seller is vetted, every review is verified, and your purchase is always protected by our AI trust scoring system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onNavigate('categories')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                Start Exploring
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all backdrop-blur-sm">
                How it Works
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block flex-1">
            <div className="relative bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden">
                      <img src="https://picsum.photos/seed/seller/100/100" alt="Seller" />
                    </div>
                    <div>
                      <h4 className="font-bold">OmniTech Solutions</h4>
                      <p className="text-xs text-slate-400">Electronics & Computing</p>
                    </div>
                  </div>
                  <ScoreBadge score={94} size="md" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Delivery Reliability</span>
                    <span className="text-emerald-400">96%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[96%]"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-2xl border border-slate-600">
                    <div className="text-2xl font-bold">15k+</div>
                    <div className="text-xs text-slate-400">Total Sales</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-2xl border border-slate-600">
                    <div className="text-2xl font-bold">0.2%</div>
                    <div className="text-xs text-slate-400">Dispute Rate</div>
                  </div>
                </div>

                <button className="w-full py-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-sm font-bold">
                  View Full Transparency Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Verified Sellers', value: '1,240+', icon: <Users className="text-indigo-600" /> },
            { label: 'Avg Delivery Time', value: '2.4 Days', icon: <Truck className="text-indigo-600" /> },
            { label: 'Review Accuracy', value: '99.8%', icon: <Star className="text-indigo-600" /> },
            { label: 'Protected Orders', value: '2.5M+', icon: <CheckCircle className="text-indigo-600" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 pt-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Categories</h2>
            <p className="text-slate-500 mt-2">Browse our high-trust vetted categories</p>
          </div>
          <button 
            onClick={() => onNavigate('categories')}
            className="text-indigo-600 font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            See All <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {CATEGORIES.slice(0, 10).map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => onNavigate('category', { categoryId: cat.id })}
              className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                {getIcon(cat.icon)}
              </div>
              <h3 className="font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-10">
            <TrendingUp className="text-indigo-600" />
            <h2 className="text-3xl font-bold text-slate-900">Trending Verified Products</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div 
                key={product.id} 
                onClick={() => onNavigate('product', { productId: product.id })}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4">
                    <ScoreBadge score={product.seller.trustScore} size="sm" />
                  </div>
                  {product.deliveryType === 'Digital' && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider text-slate-900">
                      Digital
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{product.description}</p>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <div className="text-sm text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</div>
                      <div className="text-2xl font-bold text-slate-900">₹{product.price.toLocaleString()}</div>
                    </div>
                    <div className="text-xs text-slate-400 text-right">
                      Sold by <br />
                      <span className="font-bold text-slate-900">{product.seller.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Callout */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-extrabold leading-tight">Tired of fake reviews and unreliable sellers?</h2>
            <p className="text-xl text-indigo-100">
              Join TrustLoop today. Our AI-driven marketplace ensures you only buy from sellers who have a proven track record of honesty and speed.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold shadow-lg shadow-black/10">Become a Buyer</button>
              <button className="px-8 py-4 bg-indigo-500 text-white rounded-2xl font-bold border border-indigo-400">Sell on TrustLoop</button>
            </div>
          </div>
          
          <div className="hidden md:grid grid-cols-2 gap-4 flex-1">
            {[
              { title: 'Identity Verified', desc: 'Every seller undergoes deep KYC checks.' },
              { title: 'AI Review Shield', desc: 'We filter out 99% of inorganic reviews.' },
              { title: 'Fast Resolution', desc: 'Disputes are solved within 24 hours.' },
              { title: 'Secure Escrow', desc: 'Seller gets paid only after you verify.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                <CheckCircle className="text-white mb-2" size={20} />
                <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                <p className="text-xs text-indigo-100">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
