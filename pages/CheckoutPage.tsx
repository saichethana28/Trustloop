
import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, CheckCircle, Wallet, Smartphone, Building2 } from 'lucide-react';
import { Product } from '../types';

interface CheckoutPageProps {
  product: Product;
  onNavigate: (page: string, params?: any) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ product, onNavigate }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');

  const nextStep = () => setStep(s => s + 1);

  if (step === 4) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Order Confirmed!</h1>
        <p className="text-slate-500 mb-8">
          Thank you for your purchase. Your order ID is <span className="font-bold text-slate-900">#TL-8829-10</span>. 
          A confirmation and invoice have been sent to your email.
        </p>
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left mb-10">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold">Estimated Delivery</div>
            <div className="text-indigo-600 font-bold">{new Date(Date.now() + 86400000 * product.estimatedDeliveryDays).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">Seller</div>
            <div className="text-sm font-medium">{product.seller.name}</div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => onNavigate('track', { orderId: 'TL-8829-10' })}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg"
          >
            Track My Order
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className="w-full py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
        <div className={`absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500`} style={{ width: `${(step - 1) * 50}%` }}></div>
        
        {[1, 2, 3].map((s) => (
          <div key={s} className="relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
              {step > s ? <CheckCircle size={18} /> : s}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-slate-900">Order Summary</h2>
              <div className="flex gap-6 p-6 bg-white border border-slate-200 rounded-3xl">
                <img src={product.image} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <div className="text-sm text-slate-500 mb-2">Seller: {product.seller.name}</div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">Qty: 1</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Platform Trust Fee</span>
                  <span className="font-medium">₹99</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <span className="text-lg font-bold">Total Payable</span>
                  <span className="text-2xl font-black text-slate-900">₹{(product.price + 99).toLocaleString()}</span>
                </div>
              </div>
              <button onClick={nextStep} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg">
                Continue to Shipping
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-slate-900">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-6 border-2 border-indigo-600 bg-indigo-50/50 rounded-3xl relative">
                  <div className="absolute top-6 right-6 text-indigo-600"><CheckCircle size={20} /></div>
                  <div className="font-bold mb-1">Home Address</div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    Rahul Sharma<br />
                    123, Tech Heights, Electronic City<br />
                    Bangalore, KA 560100<br />
                    Ph: +91 98XXX-XXXXX
                  </div>
                </div>
                <button className="p-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-400 transition-all text-center">
                  + Add New Address
                </button>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl flex items-center gap-4">
                <Truck className="text-indigo-600" />
                <div className="text-sm">
                  Estimated delivery by <span className="font-bold">{new Date(Date.now() + 86400000 * product.estimatedDeliveryDays).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</span>
                </div>
              </div>
              <button onClick={nextStep} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg">
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-slate-900">Payment Options</h2>
              <div className="space-y-4">
                {[
                  { id: 'upi', name: 'UPI (GPay, PhonePe, Paytm)', icon: <Smartphone /> },
                  { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard /> },
                  { id: 'net', name: 'Net Banking', icon: <Building2 /> },
                  { id: 'wallet', name: 'Wallets', icon: <Wallet /> },
                ].map((m) => (
                  <label key={m.id} className={`flex items-center gap-4 p-5 rounded-3xl border-2 cursor-pointer transition-all ${paymentMethod === m.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      className="w-5 h-5 accent-indigo-600"
                      onChange={() => setPaymentMethod(m.id)}
                    />
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                      {m.icon}
                    </div>
                    <span className="font-bold text-slate-900">{m.name}</span>
                  </label>
                ))}
              </div>
              <button 
                onClick={nextStep} 
                disabled={!paymentMethod}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${paymentMethod ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                Complete Payment
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sticky top-24">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" />
              Trust Summary
            </h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Seller Score</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-bold rounded-full">{product.seller.trustScore}% Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Return Protection</span>
                <span className="text-sm font-medium">15 Days Guaranteed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Escrow Security</span>
                <span className="text-sm font-medium">Active</span>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-400 leading-relaxed italic">
                "Our AI trust system identifies that {product.seller.name} has maintained a 98% return success rate over the last 12 months."
              </div>
              
              <div className="pt-6 border-t border-slate-100">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-900 font-bold">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">₹{(product.price + 99).toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-slate-400 text-right uppercase tracking-wider">Inclusive of all taxes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
