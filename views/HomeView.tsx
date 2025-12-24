
import React from 'react';
import { RESTAURANTS, PRIMARY_RED } from '../constants';

interface Props {
  onSelectRestaurant: (id: string) => void;
}

const HomeView: React.FC<Props> = ({ onSelectRestaurant }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="italic-bold-headline text-2xl" style={{ color: PRIMARY_RED }}>FoodieDash</h1>
          <div className="flex items-center text-xs text-gray-500 font-medium mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Current Location
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
           </svg>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search for dishes or restaurants..." 
            className="w-full p-4 pl-12 bg-white text-gray-900 font-medium rounded-[1.5rem] shadow-sm border border-gray-100 focus:ring-2 focus:ring-red-400 outline-none transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <h3 className="text-xl font-bold mb-4">Popular near you</h3>
        
        <div className="space-y-6 pb-20">
          {RESTAURANTS.map(res => (
            <div 
              key={res.id} 
              onClick={() => onSelectRestaurant(res.id)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="h-48 relative">
                <img src={res.image} alt={res.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                  {res.deliveryTime}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xl font-extrabold italic">{res.name}</h4>
                  <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                    {res.rating} ★
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">{res.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
