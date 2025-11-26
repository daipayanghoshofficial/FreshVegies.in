import React from 'react';
import { User } from '../types';
import { X, Trophy, Wallet, TrendingUp, Gift } from 'lucide-react';

interface AccountModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  const progressPercentage = Math.min((user.monthlySpend / user.spendThreshold) * 100, 100);
  const remainingSpend = Math.max(user.spendThreshold - user.monthlySpend, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/30 backdrop-blur-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-indigo-200">{user.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 text-indigo-200 mb-1 text-xs uppercase tracking-wider font-semibold">
                <Trophy size={14} /> Rewards
              </div>
              <div className="text-2xl font-bold">{user.rewardPoints} <span className="text-sm font-normal text-indigo-200">pts</span></div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 text-indigo-200 mb-1 text-xs uppercase tracking-wider font-semibold">
                <Wallet size={14} /> Month Spend
              </div>
              <div className="text-2xl font-bold">₹{user.monthlySpend}</div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="text-indigo-600" size={20} />
                Monthly Goal
              </h3>
              <span className="text-xs font-medium text-gray-500">
                ₹{user.monthlySpend} / ₹{user.spendThreshold}
              </span>
            </div>
            
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            <p className="text-sm text-gray-600 bg-indigo-50 p-3 rounded-lg border border-indigo-100 flex items-start gap-3">
              <Gift className="text-indigo-600 shrink-0 mt-0.5" size={18} />
              {remainingSpend > 0 ? (
                <span>
                  Spend <span className="font-bold text-indigo-700">₹{remainingSpend}</span> more this month to unlock a 
                  <span className="font-bold text-purple-700"> Flat 20% OFF</span> Special Coupon!
                </span>
              ) : (
                <span className="text-green-700 font-bold">
                  Congratulations! You've unlocked the Special Coupon. Check your offers!
                </span>
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Account Settings</h4>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
              Order History
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
              Manage Addresses
            </button>
            <button className="w-full text-left p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;