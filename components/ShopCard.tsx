import React from 'react';
import { Shop } from '../types';
import { MapPin, Star, Tag } from 'lucide-react';

interface ShopCardProps {
  shop: Shop;
  onClick: () => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <div className="bg-white/90 backdrop-blur text-black text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
             <Star size={12} fill="#FACC15" className="text-yellow-400" />
             {shop.rating}
          </div>
          {shop.offers.length > 0 && (
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
              {shop.offers.length} OFFERS
            </div>
          )}
        </div>
        {!shop.isOpen && (
           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
             <span className="text-white font-bold border-2 border-white px-4 py-2 rounded-lg uppercase tracking-widest">Closed</span>
           </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors">{shop.name}</h3>
        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
           <MapPin size={14} /> {shop.location}
        </p>
        
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
           <div className="text-xs text-gray-400">Owner: {shop.ownerName}</div>
           <button className="text-sm font-semibold text-green-600 hover:text-green-700">
             Visit Shop &rarr;
           </button>
        </div>

        {shop.offers.length > 0 && (
          <div className="mt-3 bg-green-50 p-2 rounded-lg flex items-center gap-2 text-xs text-green-800">
            <Tag size={12} />
            <span className="truncate">{shop.offers[0].title} - {shop.offers[0].description}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCard;
