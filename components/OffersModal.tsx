import React from 'react';
import { ShopOffer } from '../types';
import { X, Tag, Copy } from 'lucide-react';

interface OffersModalProps {
  offers: ShopOffer[];
  isOpen: boolean;
  onClose: () => void;
  shopName: string;
}

const OffersModal: React.FC<OffersModalProps> = ({ offers, isOpen, onClose, shopName }) => {
  if (!isOpen || offers.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden transform transition-all scale-100">
        
        {/* Decorative Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
            <Tag size={32} />
          </div>
          <h2 className="text-2xl font-bold">Exclusive Deals!</h2>
          <p className="text-green-100 text-sm mt-1">at {shopName}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {offers.map((offer) => (
            <div key={offer.id} className="border border-green-100 rounded-xl p-4 bg-green-50 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">{offer.title}</h3>
                <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                  {offer.discountPercentage}% OFF
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
              
              <div className="flex items-center gap-2 bg-white border border-dashed border-green-300 rounded-lg p-2">
                <div className="flex-1 text-center font-mono font-bold text-green-700 tracking-wider">
                  {offer.code}
                </div>
                <button 
                  className="text-gray-400 hover:text-green-600 transition-colors"
                  title="Copy Code"
                  onClick={() => navigator.clipboard.writeText(offer.code)}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-gray-50 text-center">
          <button 
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-800 font-medium"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffersModal;
