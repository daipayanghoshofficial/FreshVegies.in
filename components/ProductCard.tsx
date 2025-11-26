import React from 'react';
import { Product } from '../types';
import { Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group h-full flex flex-col">
      <div className="relative h-40 overflow-hidden shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isFresh && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            FRESH STOCK
          </div>
        )}
        {product.discountPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            SALE
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-semibold">{product.category}</div>
        <h3 className="font-semibold text-gray-800 mb-1 truncate" title={product.name}>{product.name}</h3>
        
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-900">₹{product.discountPrice || product.price}</span>
              <span className="text-xs text-gray-500">/ {product.unit}</span>
            </div>
            {product.discountPrice && (
              <div className="text-xs text-gray-400 line-through">₹{product.price}</div>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              added ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white'
            }`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;