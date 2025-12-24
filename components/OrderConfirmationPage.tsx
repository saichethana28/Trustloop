
import React from 'react';
import { Order, OrderStatus, ProductType } from '../types';
import { ICONS } from '../constants';
import { OrderTracker } from './OrderTracker';

interface Props {
  order: Order;
  onTrackOrder: () => void;
  onContinueShopping: () => void;
}

export const OrderConfirmationPage: React.FC<Props> = ({ order, onTrackOrder, onContinueShopping }) => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center animate-in fade-in zoom-in duration-700">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 scale-125">
        <ICONS.Check />
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-2">Order Confirmed!</h1>
      <p className="text-slate-500 mb-8">Hi Sai Chethana, your order <span className="font-bold text-slate-800">#{order.id}</span> has been successfully placed.</p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-left mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Order Details</div>
            <div className="font-bold text-slate-800">{order.productName}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Paid</div>
            <div className="font-black text-sky-600 text-xl">₹{order.price.toLocaleString('en-IN')}</div>
          </div>
        </div>
        
        <div className="p-6">
          {order.type === ProductType.PHYSICAL ? (
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-4">Estimated Delivery Stages</h4>
              <OrderTracker status={OrderStatus.PLACED} type={ProductType.PHYSICAL} />
              <div className="mt-8 flex items-start bg-sky-50 p-4 rounded-xl border border-sky-100">
                <div className="text-sky-600 mr-3"><ICONS.Package /></div>
                <div>
                  <div className="text-xs font-bold text-sky-800 uppercase mb-1">Shipping Update</div>
                  <p className="text-sm text-sky-700">
                    Your package will be delivered to <span className="font-bold">{order.address?.street}, {order.address?.city}</span>.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h4 className="text-sm font-bold text-emerald-800 mb-2 flex items-center">
                <span className="mr-2"><ICONS.Shield /></span> How to Access
              </h4>
              <p className="text-sm text-emerald-700 leading-relaxed mb-4">
                The access links for <span className="font-bold">{order.productName}</span> have been sent to <span className="font-bold">{order.userId === 'u1' ? 'sai.chethana@trustloop.io' : 'your email'}</span>.
              </p>
              <button className="flex items-center text-sm font-bold text-emerald-800 hover:underline">
                <span className="mr-2"><ICONS.Download /></span> Download Course Guide (PDF)
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onTrackOrder}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center"
        >
          <span className="mr-2"><ICONS.Package /></span> Track Order
        </button>
        <button 
          onClick={onContinueShopping}
          className="border border-slate-200 bg-white text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
