
import React from 'react';
import { Package, Truck, CheckCircle, Home, MapPin, Search } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  const steps = [
    { label: 'Order Confirmed', time: 'Today, 10:30 AM', completed: true, icon: <Package size={20} /> },
    { label: 'Packed & Ready', time: 'Today, 02:15 PM', completed: true, icon: <Package size={20} /> },
    { label: 'Shipped', time: 'In Progress', completed: false, icon: <Truck size={20} />, active: true },
    { label: 'Out for Delivery', time: 'Expected Tomorrow', completed: false, icon: <Truck size={20} /> },
    { label: 'Delivered', time: 'Expected Tomorrow', completed: false, icon: <Home size={20} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Track Order</h1>
          <p className="text-slate-500 mt-1">Order ID: #TL-8829-10</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-bold">
          <Truck size={20} />
          Arriving in 2 Days
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-8 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8">
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="relative pb-10 last:pb-0">
                  {i < steps.length - 1 && (
                    <div className={`absolute top-10 left-6 w-0.5 h-full -translate-x-1/2 ${step.completed ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                  )}
                  <div className="flex gap-6 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${step.completed ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : step.active ? 'bg-indigo-50 text-indigo-600 border-2 border-indigo-200' : 'bg-slate-50 text-slate-400 border-2 border-slate-100'}`}>
                      {step.completed ? <CheckCircle size={24} /> : step.icon}
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg ${step.completed ? 'text-slate-900' : step.active ? 'text-indigo-600' : 'text-slate-400'}`}>
                        {step.label}
                      </h4>
                      <p className={`text-sm ${step.completed ? 'text-slate-500' : 'text-slate-400'}`}>{step.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <MapPin className="text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold">Live Tracking</h4>
                <p className="text-sm text-indigo-300">Package is currently in transit</p>
              </div>
            </div>
            <div className="h-48 bg-slate-800 rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/5">
              <div className="text-center opacity-50">
                <Search size={32} className="mx-auto mb-2" />
                <p className="text-sm font-medium tracking-widest uppercase">Map View Unavailable</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-bold text-indigo-300">
                <span>HUB: MOCK_BOM_04</span>
                <span>LOC: 12.9716, 77.5946</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6">
            <h5 className="font-bold text-slate-900 mb-4">Item Details</h5>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://picsum.photos/seed/item1/100/100" className="w-12 h-12 rounded-xl object-cover" />
              <div className="text-sm font-bold">Quantum X-Pro Laptop</div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between text-sm">
              <span className="text-slate-500">Total Price</span>
              <span className="font-bold">₹1,45,099</span>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-6 text-indigo-900">
            <h5 className="font-bold mb-2">Need Help?</h5>
            <p className="text-xs text-indigo-700 leading-relaxed mb-4">Our Trust Concierge is available 24/7 for any questions about your delivery.</p>
            <button className="w-full py-3 bg-white text-indigo-600 border border-indigo-100 rounded-xl font-bold text-sm shadow-sm">
              Chat with Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
