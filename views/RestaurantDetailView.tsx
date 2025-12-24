
import React from 'react';
import { MENU_ITEMS, RESTAURANTS, PRIMARY_RED } from '../constants';

interface Props {
  cart: { [key: string]: number };
  onBack: () => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onGoToCart: () => void;
}

const RestaurantDetailView: React.FC<Props> = ({ cart, onBack, onAdd, onRemove, onGoToCart }) => {
  const restaurant = RESTAURANTS[0];
  // Fixed: Cast Object.values to number[] to avoid unknown type issues during reduce
  const totalItems = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col h-full relative bg-white">
      {/* Parallax Header Mockup */}
      <div className="h-64 relative">
        <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} />
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="bg-white rounded-t-[2.5rem] -mt-10 p-6 relative z-10 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="italic-bold-headline text-3xl">{restaurant.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{restaurant.cuisine}</p>
          </div>
          <div className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-lg flex items-center">
            {restaurant.rating} ★
          </div>
        </div>

        <div className="flex gap-4 mb-8 text-sm text-gray-600 font-semibold border-b border-gray-100 pb-4">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Pure Veg
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {restaurant.deliveryTime}
          </div>
        </div>

        <h3 className="font-bold text-lg mb-6">Menu Items</h3>
        
        <div className="space-y-10 pb-32">
          {MENU_ITEMS.map(item => (
            <div key={item.id} className="flex gap-4">
              <div className="flex-1">
                <div className="mb-1">
                   <span className="inline-block p-1 border border-green-600 rounded text-[10px] text-green-600 font-bold">●</span>
                </div>
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p className="font-bold text-gray-800 text-sm mb-2">₹{item.price}</p>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="w-32 h-32 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-[1.5rem]" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  {cart[item.id] ? (
                    <div className="flex items-center bg-white border border-red-100 shadow-md rounded-xl overflow-hidden min-w-[80px]">
                      <button onClick={() => onRemove(item.id)} className="px-3 py-1 text-red-500 font-black">-</button>
                      <span className="px-2 font-bold text-sm">{cart[item.id]}</span>
                      <button onClick={() => onAdd(item.id)} className="px-3 py-1 text-red-500 font-black">+</button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => onAdd(item.id)}
                      className="bg-white border border-red-100 shadow-md px-6 py-1 rounded-xl text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
                    >
                      ADD
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-6 z-50">
          <button 
            onClick={onGoToCart}
            className="w-full bg-red-500 text-white rounded-[1.5rem] p-4 shadow-2xl flex items-center justify-between font-bold animate-in slide-in-from-bottom duration-300"
            style={{ backgroundColor: PRIMARY_RED }}
          >
            <div className="flex items-center">
              <span className="bg-white/20 px-2 py-1 rounded text-xs mr-3">{totalItems} ITEMS</span>
              <span>View Cart</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailView;
