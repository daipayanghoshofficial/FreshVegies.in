import React, { useState } from 'react';
import { APP_NAME, MOCK_SHOPS, MOCK_USER } from './constants';
import { Shop, ViewState, Product, CartItem, User } from './types';
import ShopDetail from './components/ShopDetail';
import ShopCard from './components/ShopCard';
import CartDrawer from './components/CartDrawer';
import AccountModal from './components/AccountModal';
import { ShoppingBasket, Search, MapPin, Menu, ChefHat, UserCircle } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Cart Functions
  const addToCart = (product: Product, shopName: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, shopName }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + ((item.discountPrice || item.price) * item.quantity), 0);
    const earnedPoints = Math.floor(total / 10); // 1 point for every 10 rupees

    // Update Mock User
    setUser(prev => ({
      ...prev,
      rewardPoints: prev.rewardPoints + earnedPoints,
      monthlySpend: prev.monthlySpend + total
    }));

    setCart([]);
    setIsCartOpen(false);
    alert(`Order Placed! You earned ${earnedPoints} reward points.`);
  };

  const handleShopClick = (shop: Shop) => {
    setSelectedShop(shop);
    setView('SHOP_DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('HOME');
    setSelectedShop(null);
  };

  const filteredShops = MOCK_SHOPS.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <AccountModal 
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        user={user}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600 cursor-pointer" onClick={handleBack}>
            <ShoppingBasket size={28} />
            <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">{APP_NAME}</span>
          </div>
          
          {/* Search only visible on Home or simplified version */}
          {view === 'HOME' && (
             <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
               <input 
                 type="text"
                 placeholder="Search by area or shop name..."
                 className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-green-500 outline-none text-sm"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             </div>
          )}

          <div className="flex items-center gap-2 sm:gap-4">
             <button className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 font-medium">
               <MapPin size={16} />
               <span>Mumbai, IN</span>
             </button>

             <button 
               onClick={() => setIsAccountOpen(true)}
               className="p-2 text-gray-600 hover:bg-gray-100 rounded-full flex items-center gap-2"
             >
               <UserCircle size={24} />
               <div className="hidden lg:flex flex-col items-start leading-none">
                  <span className="text-xs font-bold text-gray-900">{user.name}</span>
                  <span className="text-[10px] text-green-600 font-bold">{user.rewardPoints} pts</span>
               </div>
             </button>

             <button 
               onClick={() => setIsCartOpen(true)}
               className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative"
             >
               <ShoppingBasket size={24} />
               {cart.length > 0 && (
                 <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                   {cart.length}
                 </span>
               )}
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Handler */}
      {view === 'SHOP_DETAIL' && selectedShop ? (
        <ShopDetail 
          shop={selectedShop} 
          onBack={handleBack} 
          onAddToCart={addToCart}
        />
      ) : (
        <>
          {/* Hero Section */}
          <div className="bg-green-600 text-white py-12 sm:py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
                Fresh Vegetables, <br className="hidden sm:block"/>Direct from Local Partners
              </h1>
              <p className="text-green-100 text-lg max-w-2xl mx-auto mb-8">
                Find the freshest stock at shops near you. Check live prices, exclusive offers, and get AI-powered recipe ideas.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => document.getElementById('shops-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-green-700 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-50 transition-all transform hover:-translate-y-1"
                >
                  Find Shops Nearby
                </button>
                <button 
                   onClick={() => window.alert('Please select a shop first to use the AI assistant for ingredients!')}
                   className="bg-green-700 text-white border border-green-500 px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-all flex items-center justify-center gap-2"
                >
                  <ChefHat size={20} />
                  Chef's Assistant
                </button>
              </div>
            </div>
          </div>

          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" id="shops-grid">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Partner Shops</h2>
              <span className="text-sm text-gray-500">{filteredShops.length} shops found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredShops.map(shop => (
                <ShopCard 
                  key={shop.id} 
                  shop={shop} 
                  onClick={() => handleShopClick(shop)} 
                />
              ))}
              
              {filteredShops.length === 0 && (
                <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                   <div className="text-gray-400 mb-4">
                     <Search size={48} className="mx-auto" />
                   </div>
                   <h3 className="text-lg font-medium text-gray-900">No shops found</h3>
                   <p className="text-gray-500">Try adjusting your search terms.</p>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 border-t border-gray-700 mt-auto">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 text-white mb-4">
                <ShoppingBasket size={24} />
                <span className="text-xl font-bold">{APP_NAME}</span>
              </div>
              <p className="text-sm text-gray-400 max-w-sm">
                Connecting you with the best local vegetable vendors. Freshness guaranteed, straight from the market to your plate.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400">Home</a></li>
                <li><a href="#" className="hover:text-green-400">About Us</a></li>
                <li><a href="#" className="hover:text-green-400">Partner with us</a></li>
                <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
               <h4 className="text-white font-bold mb-4">Contact</h4>
               <ul className="space-y-2 text-sm">
                 <li>support@freshvegies.in</li>
                 <li>+91 123 456 7890</li>
                 <li>Mumbai, Maharashtra</li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-sm text-center">
            &copy; {new Date().getFullYear()} FreshVegies.in. All rights reserved.
         </div>
      </footer>
    </div>
  );
};

export default App;