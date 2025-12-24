
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, MOCK_SELLERS, MOCK_USER, MOCK_ADDRESSES, ICONS } from './constants';
import { Product, ProductType, UserRole, User, Order, OrderStatus, PaymentMethod, Address } from './types';
import { TrustBadge } from './components/TrustBadge';
import { SellerCompareTable } from './components/SellerCompareTable';
import { OrderTracker } from './components/OrderTracker';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';

const App: React.FC = () => {
  const [view, setView] = useState<'browse' | 'product' | 'dashboard' | 'checkout' | 'order-confirmation'>('browse');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string>('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [currentUser] = useState<User>(MOCK_USER);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All', 
    'Electronics', 
    'Education', 
    'Furniture', 
    'Fashion & Accessories', 
    'Home & Kitchen', 
    'Health & Wellness', 
    'Smart Home & IoT',
    'Local & Handmade Products'
  ];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, activeCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
  };

  const startCheckout = (productId: string, sellerId: string) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedSellerId(sellerId);
      setView('checkout');
    }
  };

  const handlePlaceOrder = (paymentMethod: PaymentMethod, address?: Address) => {
    if (!selectedProduct) return;
    
    const productSeller = selectedProduct.sellers.find(ps => ps.sellerId === selectedSellerId)!;
    const seller = MOCK_SELLERS.find(s => s.id === selectedSellerId)!;
    const deliveryFee = selectedProduct.type === ProductType.PHYSICAL ? 49 : 0;

    const newOrder: Order = {
      id: `TL-${Math.floor(Math.random() * 90000) + 10000}`,
      userId: currentUser.id,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      sellerId: selectedSellerId,
      sellerName: seller.name,
      price: productSeller.price + deliveryFee,
      status: OrderStatus.PLACED,
      type: selectedProduct.type,
      date: new Date().toLocaleDateString('en-IN'),
      paymentMethod,
      address,
      trackingTimeline: [
        { status: OrderStatus.PLACED, timestamp: new Date().toLocaleString('en-IN') }
      ]
    };

    setLastOrder(newOrder);
    setView('order-confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => { setView('browse'); setSelectedProduct(null); }}
            >
              <div className="w-10 h-10 rounded-xl trust-gradient flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <ICONS.Shield />
              </div>
              <span className="ml-3 text-2xl font-black tracking-tight text-slate-800">
                Trust<span className="text-sky-500">Loop</span>
              </span>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <ICONS.Search />
                </div>
                <input
                  type="text"
                  placeholder="Search verified products & sellers..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full bg-slate-100 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all sm:text-sm shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setView('dashboard')}
                className={`text-sm font-bold transition-colors ${view === 'dashboard' ? 'text-sky-600' : 'text-slate-600 hover:text-sky-600'}`}
              >
                My Orders
              </button>
              <div className="flex items-center space-x-2 text-slate-800 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shadow-sm border border-sky-200">
                  <ICONS.User />
                </div>
                <span className="hidden sm:inline font-bold text-sm">{currentUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Personalized Greeting */}
        {view === 'browse' && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900">Hi, {currentUser.name} 👋</h2>
            <p className="text-slate-500 text-sm">Welcome back! Discover products from verified sellers you can trust.</p>
          </div>
        )}

        {view === 'browse' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat 
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const bestSellerId = product.sellers.reduce((prev, curr) => prev.price < curr.price ? prev : curr).sellerId;
                const bestSeller = MOCK_SELLERS.find(s => s.id === bestSellerId);

                return (
                  <div 
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={product.image} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        alt={product.name} 
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
                          product.type === ProductType.PHYSICAL ? 'bg-amber-400 text-white' : 'bg-emerald-400 text-white'
                        }`}>
                          {product.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-black text-slate-800 line-clamp-1">{product.name}</h3>
                        <div className="text-sky-600 font-black text-lg">₹{product.basePrice.toLocaleString('en-IN')}</div>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
                        {product.description}
                      </p>
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        {bestSeller && (
                          <div className="flex items-center">
                            <img src={bestSeller.avatar} className="w-8 h-8 rounded-full border border-slate-100 shadow-sm mr-2" />
                            <div>
                               <div className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Top Seller</div>
                               <div className="text-xs font-bold text-slate-700">{bestSeller.name}</div>
                            </div>
                          </div>
                        )}
                        <TrustBadge score={bestSeller?.trustScore || 0} size="sm" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'product' && selectedProduct && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button 
              onClick={() => setView('browse')}
              className="mb-6 flex items-center text-slate-500 hover:text-sky-600 transition-colors font-bold text-sm"
            >
              <span className="mr-2">&larr;</span> Back to Marketplace
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Product Gallery & Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                  <img src={selectedProduct.image} className="w-full object-cover aspect-square" />
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h1 className="text-3xl font-black text-slate-900 mb-3">{selectedProduct.name}</h1>
                  <p className="text-slate-600 leading-relaxed mb-6 text-sm">{selectedProduct.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {selectedProduct.category}
                    </div>
                    <div className="px-4 py-1.5 bg-sky-50 text-sky-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {selectedProduct.type}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Engine */}
              <div className="lg:col-span-7 space-y-8">
                {/* Overridden comparison component logic to handle 'Buy Now' */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <h3 className="font-black text-slate-800 flex items-center">
                      <span className="mr-2 text-sky-500"><ICONS.TrendingUp /></span>
                      Seller Comparison
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Seller</th>
                          <th className="p-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                          <th className="p-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProduct.sellers.map(ps => {
                          const seller = MOCK_SELLERS.find(s => s.id === ps.sellerId)!;
                          return (
                            <tr key={ps.sellerId} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center space-x-3">
                                  <img src={seller.avatar} className="w-10 h-10 rounded-full border border-slate-100" />
                                  <div>
                                    <div className="font-bold text-slate-900 text-sm">{seller.name}</div>
                                    <div className="scale-75 origin-left"><TrustBadge score={seller.trustScore} size="sm" /></div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <div className="text-lg font-black text-slate-900">₹{ps.price.toLocaleString('en-IN')}</div>
                                <div className="text-[10px] text-slate-400 font-bold">{ps.estimatedDeliveryDays === 0 ? 'Instant Access' : `Delivered in ${ps.estimatedDeliveryDays} days`}</div>
                              </td>
                              <td className="p-4 text-right">
                                <button 
                                  onClick={() => startCheckout(selectedProduct.id, ps.sellerId)}
                                  className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-xl text-sm font-black shadow-lg shadow-sky-100 transition-all hover:scale-105 active:scale-95"
                                >
                                  Buy Now
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center">
                    <span className="mr-2 text-amber-500"><ICONS.Check /></span> Verified Reviews
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="font-bold text-slate-800 mr-2 text-sm">Prithvi S.</div>
                          <div className="text-[9px] text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded-full flex items-center border border-emerald-100">
                            <ICONS.Check /> <span className="ml-1 uppercase">Verified</span>
                          </div>
                        </div>
                        <div className="flex text-amber-400 text-xs">★★★★★</div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Purchased from the top seller. The trust metrics were bang on! Fast delivery and genuine product. Highly recommended for premium buys.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'checkout' && selectedProduct && (
          <CheckoutPage 
            product={selectedProduct} 
            selectedSellerId={selectedSellerId}
            onPlaceOrder={handlePlaceOrder}
            onCancel={() => setView('product')}
          />
        )}

        {view === 'order-confirmation' && lastOrder && (
          <OrderConfirmationPage 
            order={lastOrder}
            onTrackOrder={() => setView('dashboard')}
            onContinueShopping={() => { setView('browse'); setSelectedProduct(null); }}
          />
        )}

        {view === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Purchase History & Tracking</h2>
                <button 
                  onClick={() => setView('browse')}
                  className="bg-sky-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-sky-700 transition-all"
                >
                  Shop More
                </button>
             </div>

             <div className="space-y-6">
                {(lastOrder ? [lastOrder] : []).concat([{
                   id: 'TL-41203',
                   productName: 'Realme Narzo 60X 5G',
                   price: 12999,
                   status: OrderStatus.SHIPPED,
                   type: ProductType.PHYSICAL,
                   sellerName: 'TechGiant Solutions',
                   date: '12/10/2024'
                } as any]).map((order, idx) => (
                  <div key={order.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                      <div className="flex items-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 mr-4">
                          <ICONS.Package />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Order #{order.id}</div>
                          <div className="font-black text-slate-800">{order.productName}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Price Paid</div>
                        <div className="font-black text-sky-600 text-lg">₹{order.price.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                    
                    <OrderTracker status={order.status} type={order.type} />

                    <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center text-xs text-slate-500 font-bold">
                        <div className="text-sky-500 mr-2"><ICONS.Alert /></div>
                        {order.status === OrderStatus.COMPLETED ? 'Delivered successfully' : 'Arriving in 3-5 business days'}
                      </div>
                      <div className="flex space-x-3">
                        <button className="text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors">
                          Cancel Order
                        </button>
                        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl trust-gradient flex items-center justify-center text-white">
                  <ICONS.Shield />
                </div>
                <span className="ml-3 text-2xl font-black tracking-tight text-white">
                  Trust<span className="text-sky-400">Loop</span>
                </span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-500 font-medium">
                The most reliable digital marketplace for modern India. Empowering confidence through 100% verified sellers and escrow-based protection.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Trust & Safety</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Seller Shield Program</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Trust Score Logic</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Dispute Resolution</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Account</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><a href="#" className="hover:text-sky-400 transition-colors">My Profile</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Order History</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-xs font-bold text-center text-slate-600">
            &copy; 2024 TrustLoop. Built for StackHack 3.0. Made with ❤️ in India.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
