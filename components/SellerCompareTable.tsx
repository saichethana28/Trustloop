
import React, { useState, useEffect } from 'react';
import { Product, Seller, ProductSeller } from '../types';
import { MOCK_SELLERS, ICONS } from '../constants';
import { TrustBadge } from './TrustBadge';
import { geminiService } from '../services/geminiService';

interface Props {
  product: Product;
}

export const SellerCompareTable: React.FC<Props> = ({ product }) => {
  const [riskInsight, setRiskInsight] = useState<string>('');

  useEffect(() => {
    const fetchInsight = async () => {
      const bestPriceSeller = product.sellers.reduce((prev, curr) => prev.price < curr.price ? prev : curr);
      const metrics = MOCK_SELLERS.find(s => s.id === bestPriceSeller.sellerId);
      const insight = await geminiService.generateRiskIndicator(metrics);
      setRiskInsight(insight);
    };
    fetchInsight();
  }, [product]);

  const getSellerInfo = (id: string) => MOCK_SELLERS.find(s => s.id === id);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center">
          <span className="mr-2 text-sky-500"><ICONS.TrendingUp /></span>
          Seller Comparison
        </h3>
        <div className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
          Trust Scores Updated Real-time
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="p-4 text-sm font-semibold text-slate-600">Seller</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Trust Metrics</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-center">Price</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-center">Delivery</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {product.sellers.map((ps) => {
              const seller = getSellerInfo(ps.sellerId);
              if (!seller) return null;
              
              return (
                <tr key={ps.sellerId} className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={seller.avatar} className="w-10 h-10 rounded-full bg-slate-100" />
                      <div>
                        <div className="font-semibold text-slate-800">{seller.name}</div>
                        <div className="text-xs text-slate-400">Since {seller.joinedDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col space-y-1">
                      <TrustBadge score={seller.trustScore} size="sm" />
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center">
                        <span className="mr-2">Reliability: {seller.deliveryReliability}%</span>
                        <span>Returns: {seller.returnSuccessRate}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="text-lg font-bold text-slate-900">₹{ps.price.toLocaleString('en-IN')}</div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="text-sm text-slate-600 font-medium">
                      {ps.estimatedDeliveryDays === 0 ? 'Instant' : `${ps.estimatedDeliveryDays} Days`}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm">
                      Buy Now
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {riskInsight && (
        <div className="p-4 bg-sky-50 border-t border-sky-100">
          <div className="flex items-start">
            <div className="mt-0.5 mr-2 text-sky-600"><ICONS.Alert /></div>
            <div>
              <div className="text-xs font-bold text-sky-800 uppercase mb-1">AI Risk Prediction</div>
              <p className="text-sm text-sky-700 leading-relaxed">{riskInsight}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
