
import React from 'react';
import { CartItem } from '../types';
import { PRIMARY_RED } from '../constants';

interface Props {
  cartItems: CartItem[];
  total: number;
  onBack: () => void;
  onCheckout: () => void;
}

const CartView: React.FC<Props> = ({ cartItems, total, onBack, onCheckout }) => {
  const platformFee = 5;
  const deliveryFee = 0;
  const grandTotal = total + platformFee + deliveryFee;

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-white p-6 flex items-center shadow-sm sticky top-0 z-20 border-b border-gray-100">
        <button onClick={onBack} className="mr-4 text-gray-900 bg-gray-100 p-2.5 rounded-full active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h2 className="italic-bold-headline text-2xl">My Basket</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cartItems.length} Dishes Added</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {/* Items Section */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Review Items</h3>
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[1.2rem] overflow-hidden shadow-sm flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-gray-900 leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-400 font-bold mt-0.5 italic">₹{item.price} x {item.quantity}</p>
                    </div>
                    <span className="font-black text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Bill Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-500">Item Total</span>
              <span className="text-gray-900 font-bold">₹{total}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="text-green-600 font-black uppercase text-xs">FREE</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-500">Platform Fee</span>
              <span className="text-gray-900 font-bold">₹{platformFee}</span>
            </div>
            
            <div className="pt-6 mt-2 border-t border-dashed border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-black italic text-gray-900">To Pay</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Grand Total</p>
                </div>
                <span className="text-4xl font-black italic text-gray-900">₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-[2rem] flex items-start gap-4">
           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
           </div>
           <p className="text-[10px] font-bold text-blue-700 leading-relaxed uppercase">
             Orders are final once sent to WhatsApp. <br/> Please check your items before proceeding.
           </p>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] p-6 bg-white shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)] rounded-t-[3rem] border-t border-gray-100 z-30">
        <button 
          onClick={onCheckout}
          className="w-full py-5 rounded-[2.5rem] text-white font-black text-xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
          style={{ backgroundColor: PRIMARY_RED }}
        >
          <span>Choose Address</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartView;
