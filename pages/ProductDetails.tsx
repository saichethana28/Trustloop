
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Info,
  ChevronLeft,
  Share2,
  Heart,
  Star
} from 'lucide-react';
import { Product, Seller } from '../types';
import ScoreBadge from '../components/TrustScore/ScoreBadge';
import { analyzeSellerRisk, compareSellersAI } from '../services/geminiService';

interface ProductDetailsProps {
  product: Product;
  onNavigate: (page: string, params?: any) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onNavigate }) => {
  const [riskAssessment, setRiskAssessment] = useState<string>("Analyzing trust metrics...");
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    analyzeSellerRisk(product.seller).then(setRiskAssessment);
  }, [product.seller]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-indigo-600">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('category', { categoryId: product.category })} className="hover:text-indigo-600 capitalize">{product.category}</button>
        <span>/</span>
        <span className="text-slate-900 font-medium truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Images */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 bg-white">
            <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-indigo-600' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* AI Trust Callout */}
          <div className="mt-12 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-indigo-400" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Trust Assessment</h3>
                <p className="text-indigo-100 leading-relaxed italic">
                  "{riskAssessment}"
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-indigo-300">
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Verified Reviews</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Identity Confirmed</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} /> 0 Active Disputes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{product.category}</span>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"><Heart size={20} /></button>
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"><Share2 size={20} /></button>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <span className="text-slate-900 font-bold ml-1">4.9</span>
              </div>
              <span className="text-slate-400">|</span>
              <button className="text-indigo-600 font-medium hover:underline">128 Verified Reviews</button>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
              <span className="text-xl text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="px-2 py-1 bg-rose-50 text-rose-600 text-xs font-bold rounded">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>
          </div>

          {/* Trust Metrics Detailed */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                  <img src="https://picsum.photos/seed/seller2/100/100" alt="Seller" />
                </div>
                <div>
                  <div className="font-bold">{product.seller.name}</div>
                  <div className="text-xs text-slate-400">Sold {product.seller.totalSales.toLocaleString()}+ items</div>
                </div>
              </div>
              <ScoreBadge score={product.seller.trustScore} size="md" />
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Delivery Reliability', val: product.seller.metrics.deliveryReliability, color: 'bg-emerald-500' },
                { label: 'Review Authenticity', val: product.seller.metrics.reviewAuthenticity, color: 'bg-indigo-500' },
                { label: 'Product Match Accuracy', val: product.seller.metrics.productMatchAccuracy, color: 'bg-blue-500' }
              ].map((m, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-500">{m.label}</span>
                    <span className="text-slate-900">{m.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color}`} style={{ width: `${m.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                <Truck className="text-indigo-600" size={20} />
                <div>
                  <div className="text-xs text-slate-500">Delivery</div>
                  <div className="text-sm font-bold">{product.estimatedDeliveryDays} Days</div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                <RotateCcw className="text-indigo-600" size={20} />
                <div>
                  <div className="text-xs text-slate-500">Returns</div>
                  <div className="text-sm font-bold">15 Days</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('checkout', { productId: product.id })}
              className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/10 transition-all"
            >
              Buy with Confidence
            </button>
            <p className="text-center text-xs text-slate-400">
              Secured by TrustLoop Escrow. Seller is paid only after you verify the product.
            </p>
          </div>

          {/* Description */}
          <div className="pt-8 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Product Details</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>
            <ul className="space-y-3">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
