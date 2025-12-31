
import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfilePage from './pages/ProfilePage';
import { PRODUCTS } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const navigate = (page: string, params?: any) => {
    if (page === 'product' && params?.productId) {
      const prod = PRODUCTS.find(p => p.id === params.productId);
      if (prod) {
        setActiveProduct(prod);
        setCurrentPage('product');
        window.scrollTo(0, 0);
      }
    } else if (page === 'checkout' && params?.productId) {
      const prod = PRODUCTS.find(p => p.id === params.productId);
      if (prod) {
        setActiveProduct(prod);
        setCurrentPage('checkout');
        window.scrollTo(0, 0);
      }
    } else {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'product':
        return activeProduct ? <ProductDetails product={activeProduct} onNavigate={navigate} /> : <Home onNavigate={navigate} />;
      case 'checkout':
        return activeProduct ? <CheckoutPage product={activeProduct} onNavigate={navigate} /> : <Home onNavigate={navigate} />;
      case 'track':
        return <OrderTrackingPage />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'categories':
        return (
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Browse Marketplace</h1>
            <p className="text-slate-500 mb-12">Search through thousands of verified high-trust listings</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => navigate('product', { productId: p.id })}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all cursor-pointer group text-left"
                >
                  <img src={p.image} className="w-full aspect-video object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600">{p.name}</h3>
                    <div className="text-xl font-bold mt-2">₹{p.price.toLocaleString()}</div>
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                      <span>{p.seller.name}</span>
                      <span className="font-bold text-emerald-600">{p.seller.trustScore}% Trust</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onNavigate={navigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="text-xl font-bold text-white">TrustLoop</span>
            </div>
            <p className="text-sm leading-relaxed">
              The world's first AI-powered marketplace built on the fundamental principle of transparency and verified reliability.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => navigate('categories')} className="hover:text-white transition-colors">Electronics</button></li>
              <li><button onClick={() => navigate('categories')} className="hover:text-white transition-colors">Digital Assets</button></li>
              <li><button onClick={() => navigate('categories')} className="hover:text-white transition-colors">Verified Fashion</button></li>
              <li><button onClick={() => navigate('categories')} className="hover:text-white transition-colors">Handmade Goods</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Trust & Safety</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Trust Scoring Logic</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Buyer Protection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seller Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dispute Resolution</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-xs mb-4">Get updates on new verified sellers and exclusive high-trust deals.</p>
            <div className="flex">
              <input type="text" placeholder="Email" className="bg-slate-800 border-none rounded-l-xl px-4 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none w-full" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-xl font-bold text-sm">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-xs">
          <div>© 2024 TrustLoop. All rights reserved. Built with Trust.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
