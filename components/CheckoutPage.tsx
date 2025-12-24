
import React, { useState } from 'react';
import { Product, ProductType, Seller, PaymentMethod, Address, OrderStatus } from '../types';
import { MOCK_SELLERS, MOCK_ADDRESSES, ICONS } from '../constants';
import { TrustBadge } from './TrustBadge';

interface Props {
  product: Product;
  selectedSellerId: string;
  onPlaceOrder: (paymentMethod: PaymentMethod, address?: Address) => void;
  onCancel: () => void;
}

export const CheckoutPage: React.FC<Props> = ({ product, selectedSellerId, onPlaceOrder, onCancel }) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PaymentMethod.UPI);
  const [selectedAddress, setSelectedAddress] = useState<Address>(MOCK_ADDRESSES[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const seller = MOCK_SELLERS.find(s => s.id === selectedSellerId)!;
  const productSeller = product.sellers.find(ps => ps.sellerId === selectedSellerId)!;
  
  const deliveryFee = product.type === ProductType.PHYSICAL ? 49 : 0;
  const total = productSeller.price + deliveryFee;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onPlaceOrder(selectedPayment, product.type === ProductType.PHYSICAL ? selectedAddress : undefined);
    }, 2000);
  };

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold text-slate-800">Processing Payment...</h2>
        <p className="text-slate-500 mt-2 text-center max-w-xs">
          Please do not refresh or close the page while we confirm your order with {seller.name}.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex items-center mb-8">
        <button onClick={onCancel} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
          <span className="text-slate-500">&larr;</span>
        </button>
        <h1 className="text-2xl font-black text-slate-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Product Summary */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h3>
            <div className="flex space-x-4">
              <img src={product.image} className="w-24 h-24 object-cover rounded-xl border border-slate-100" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-900">{product.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${product.type === ProductType.PHYSICAL ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {product.type}
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-slate-500 mr-2">Seller:</span>
                  <span className="text-xs font-bold text-slate-700 underline">{seller.name}</span>
                  <div className="ml-3 scale-75 origin-left">
                    <TrustBadge score={seller.trustScore} size="sm" />
                  </div>
                </div>
                <div className="mt-4 text-lg font-black text-sky-600">₹{productSeller.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </section>

          {/* Shipping Address (Conditional) */}
          {product.type === ProductType.PHYSICAL ? (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">Delivery Address</h3>
                <button className="text-sky-600 text-xs font-bold hover:underline">+ Add New</button>
              </div>
              <div className="space-y-4">
                {MOCK_ADDRESSES.map(addr => (
                  <label key={addr.id} className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${selectedAddress.id === addr.id ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input 
                      type="radio" 
                      name="address" 
                      className="mt-1 mr-3 accent-sky-600"
                      checked={selectedAddress.id === addr.id}
                      onChange={() => setSelectedAddress(addr)}
                    />
                    <div>
                      <div className="font-bold text-slate-800 flex items-center">
                        {addr.name}
                        {addr.isDefault && <span className="ml-2 text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">Default</span>}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">{addr.street}, {addr.city} - {addr.pincode}</div>
                      <div className="text-sm text-slate-500 mt-1 flex items-center">
                        <span className="mr-1 scale-75 opacity-50"><ICONS.Phone /></span>
                        {addr.phone}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center text-xs text-slate-600">
                <span className="text-sky-500 mr-2"><ICONS.Check /></span>
                Estimated delivery in <span className="font-bold mx-1">{productSeller.estimatedDeliveryDays} days</span>
              </div>
            </section>
          ) : (
            <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center text-emerald-800">
                <ICONS.Check />
                <span className="ml-3 font-bold">Instant Digital Access</span>
              </div>
              <p className="mt-2 text-sm text-emerald-700 leading-relaxed">
                This is a digital product. You will receive an access link and instructions in your dashboard and email immediately after payment. No shipping address required.
              </p>
            </section>
          )}

          {/* Payment Methods */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <PaymentOption 
                method={PaymentMethod.UPI}
                label="UPI (Google Pay, PhonePe, Paytm)"
                icon={<div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-500">UPI</div>}
                selected={selectedPayment === PaymentMethod.UPI}
                onSelect={() => setSelectedPayment(PaymentMethod.UPI)}
                badge="Popular"
              />
              <PaymentOption 
                method={PaymentMethod.CARD}
                label="Credit / Debit Cards"
                icon={<ICONS.CreditCard />}
                selected={selectedPayment === PaymentMethod.CARD}
                onSelect={() => setSelectedPayment(PaymentMethod.CARD)}
              />
              <PaymentOption 
                method={PaymentMethod.NET_BANKING}
                label="Net Banking"
                icon={<ICONS.Home />}
                selected={selectedPayment === PaymentMethod.NET_BANKING}
                onSelect={() => setSelectedPayment(PaymentMethod.NET_BANKING)}
              />
              {product.type === ProductType.PHYSICAL && (
                <PaymentOption 
                  method={PaymentMethod.COD}
                  label="Cash on Delivery"
                  icon={<ICONS.Package />}
                  selected={selectedPayment === PaymentMethod.COD}
                  onSelect={() => setSelectedPayment(PaymentMethod.COD)}
                  disabled={seller.trustScore < 85}
                  badge={seller.trustScore < 85 ? "Unavailable" : ""}
                />
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Pricing & Pay */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg sticky top-24">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Price Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-600">
                <span>Product Price</span>
                <span className="font-medium text-slate-800">₹{productSeller.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className={deliveryFee === 0 ? "text-emerald-600 font-bold" : "font-medium text-slate-800"}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="h-px bg-slate-100 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total Payable</span>
                <span className="text-2xl font-black text-sky-600">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button 
                onClick={handlePay}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-sky-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Pay Now
              </button>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 leading-tight">
                  By clicking "Pay Now", you agree to TrustLoop's <a href="#" className="underline">Refund & Cancellation Policy</a>. 
                  Digital goods are generally non-refundable unless specified.
                </p>
              </div>
            </div>

            {/* Safety Indicator */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl flex items-start">
              <div className="mt-1 text-emerald-600 mr-3 scale-110"><ICONS.Shield /></div>
              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">TrustLoop Secure</div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Your payment is protected. Funds are held in escrow and released to {seller.name} only after you confirm the item is correct.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PaymentOptionProps {
  method: PaymentMethod;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  badge?: string;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ label, icon, selected, onSelect, disabled, badge }) => (
  <label className={`flex items-center p-4 border rounded-xl transition-all ${disabled ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer'} ${selected ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500' : 'border-slate-100 hover:border-slate-300'}`}>
    <input 
      type="radio" 
      disabled={disabled}
      checked={selected}
      onChange={onSelect}
      className="mr-4 accent-sky-600"
    />
    <div className="text-slate-500 mr-3">{icon}</div>
    <div className="flex-1 font-bold text-slate-800 text-sm">{label}</div>
    {badge && <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${badge === 'Popular' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>{badge}</span>}
  </label>
);
