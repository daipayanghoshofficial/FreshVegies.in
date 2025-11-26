import React, { useState, useEffect } from 'react';
import { Shop, Category, Product } from '../types';
import { ArrowLeft, Phone, MapPin, Star, ChefHat, Search, MessageCircle } from 'lucide-react';
import ProductCard from './ProductCard';
import OffersModal from './OffersModal';
import { getRecipeSuggestion } from '../services/geminiService';

interface ShopDetailProps {
  shop: Shop;
  onBack: () => void;
  onAddToCart: (product: Product, shopName: string) => void;
}

const ShopDetail: React.FC<ShopDetailProps> = ({ shop, onBack, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [showOffers, setShowOffers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // AI State
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuery, setAiQuery] = useState('');

  // Show offers on mount if available
  useEffect(() => {
    if (shop.offers.length > 0) {
      const timer = setTimeout(() => setShowOffers(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [shop.id, shop.offers.length]);

  const filteredProducts = shop.products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', ...Object.values(Category)];

  const handleAskAI = async () => {
    setIsAiLoading(true);
    setAiResponse(null);
    const response = await getRecipeSuggestion(shop.products, aiQuery);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <OffersModal 
        isOpen={showOffers} 
        onClose={() => setShowOffers(false)} 
        offers={shop.offers}
        shopName={shop.name}
      />

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-4 bg-gradient-to-r from-orange-400 to-red-500 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ChefHat size={24} />
                <h3 className="font-bold text-lg">AI Chef's Assistant</h3>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-white/80 hover:text-white">
                Close
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
               {!aiResponse ? (
                 <div className="space-y-4">
                   <p className="text-gray-600">
                     I can see all the fresh veggies at <span className="font-bold">{shop.name}</span>. 
                     Ask me what to cook!
                   </p>
                   <div className="flex flex-wrap gap-2">
                     <button 
                       onClick={() => setAiQuery("Suggest a quick 15 min recipe")}
                       className="text-xs bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-100"
                     >
                       Quick 15 min recipe
                     </button>
                     <button 
                       onClick={() => setAiQuery("What's a good healthy salad?")}
                       className="text-xs bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full hover:bg-green-100"
                     >
                       Healthy salad
                     </button>
                     <button 
                       onClick={() => setAiQuery("Suggest a traditional Indian curry")}
                       className="text-xs bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-1 rounded-full hover:bg-yellow-100"
                     >
                       Indian Curry
                     </button>
                   </div>
                   <textarea
                     value={aiQuery}
                     onChange={(e) => setAiQuery(e.target.value)}
                     placeholder="e.g., I have potatoes and spinach, what can I make?"
                     className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none h-24"
                   />
                   <button 
                    onClick={handleAskAI}
                    disabled={isAiLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                   >
                     {isAiLoading ? (
                       <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                     ) : (
                       <>
                         <ChefHat size={18} /> Get Suggestion
                       </>
                     )}
                   </button>
                 </div>
               ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="prose prose-sm text-gray-700">
                     <p className="whitespace-pre-line leading-relaxed">{aiResponse}</p>
                   </div>
                   <button 
                     onClick={() => setAiResponse(null)}
                     className="mt-6 text-orange-600 text-sm font-medium hover:underline"
                   >
                     Ask another question
                   </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative h-64 bg-gray-900">
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute top-4 left-4">
          <button 
            onClick={onBack}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-2 rounded-full text-white transition-all"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold mb-1">{shop.name}</h1>
              <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                <MapPin size={16} /> {shop.location}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-green-500 px-2 py-1 rounded-md text-xs font-bold">
                  <Star size={12} fill="currentColor" /> {shop.rating}
                </div>
                <span className={`text-xs px-2 py-1 rounded-md border ${shop.isOpen ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'}`}>
                  {shop.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <a 
                href={`tel:${shop.phone}`}
                className="bg-white text-green-700 p-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
              >
                <Phone size={24} />
              </a>
              <button 
                onClick={() => window.open(`https://wa.me/?text=Hi ${shop.name}, I want to order vegetables.`, '_blank')}
                className="bg-green-600 text-white p-3 rounded-full hover:bg-green-500 transition-colors shadow-lg"
              >
                <MessageCircle size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
             <div className="relative w-full sm:w-96">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Search veggies, fruits..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             
             <button 
               onClick={() => setShowAiModal(true)}
               className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
             >
               <ChefHat size={18} />
               Ask AI Chef
             </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as Category | 'All')}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={(p) => onAddToCart(p, shop.name)}
              />
            ))
          ) : (
             <div className="col-span-full py-20 text-center text-gray-500">
               <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                 <Search size={40} className="text-gray-400" />
               </div>
               <p className="text-lg">No products found for "{searchTerm || selectedCategory}"</p>
               <button 
                 onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                 className="mt-2 text-green-600 font-medium hover:underline"
               >
                 Clear filters
               </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;