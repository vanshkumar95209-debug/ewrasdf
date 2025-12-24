
import React from 'react';
import { LocationData, PaymentMode } from '../types';
import { PRIMARY_RED } from '../constants';

interface Props {
  location: LocationData;
  address: string;
  setAddress: (val: string) => void;
  paymentMode: PaymentMode;
  setPaymentMode: (val: PaymentMode) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  total: number;
}

const CheckoutView: React.FC<Props> = ({ 
  location, address, setAddress, paymentMode, setPaymentMode, onBack, onPlaceOrder, total 
}) => {
  const isFormValid = address.length > 10;

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-6 flex items-center shadow-sm">
        <button onClick={onBack} className="mr-4 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="font-bold text-xl">Checkout</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Delivery Address</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
              location.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              GPS {location.status === 'connected' ? 'Connected' : 'Manual'}
            </span>
          </div>
          <textarea 
            className="w-full p-6 bg-white text-gray-900 font-medium rounded-[2rem] shadow-sm border border-gray-100 focus:ring-2 focus:ring-red-400 outline-none resize-none h-32 text-sm leading-relaxed transition-all"
            placeholder="Enter full address, landmark, floor etc."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {location.status === 'connected' && (
             <p className="text-[10px] text-gray-400 mt-2 ml-2 italic">
               📍 Coordinates tracked: {location.lat?.toFixed(4)}, {location.lng?.toFixed(4)}
             </p>
          )}
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Payment Method</h3>
          <div className="space-y-3">
            <div 
              onClick={() => setPaymentMode('UPI')}
              className={`p-5 rounded-[2rem] bg-white border-2 flex items-center cursor-pointer transition-all ${
                paymentMode === 'UPI' ? 'border-red-500 shadow-lg' : 'border-transparent opacity-80'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                paymentMode === 'UPI' ? 'border-red-500' : 'border-gray-200'
              }`}>
                {paymentMode === 'UPI' && <div className="w-3 h-3 rounded-full bg-red-500"></div>}
              </div>
              <div>
                <p className="font-bold text-sm">UPI Online</p>
                <p className="text-[10px] text-gray-400">Pay via Google Pay, PhonePe, Paytm</p>
              </div>
            </div>

            <div 
              onClick={() => setPaymentMode('COD')}
              className={`p-5 rounded-[2rem] bg-white border-2 flex items-center cursor-pointer transition-all ${
                paymentMode === 'COD' ? 'border-red-500 shadow-lg' : 'border-transparent opacity-80'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                paymentMode === 'COD' ? 'border-red-500' : 'border-gray-200'
              }`}>
                {paymentMode === 'COD' && <div className="w-3 h-3 rounded-full bg-red-500"></div>}
              </div>
              <div>
                <p className="font-bold text-sm">Cash on Delivery</p>
                <p className="text-[10px] text-gray-400">Pay when your food arrives</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
        <button 
          disabled={!isFormValid}
          onClick={onPlaceOrder}
          className="w-full py-4 rounded-[2.5rem] text-white font-black text-lg shadow-xl disabled:opacity-50 disabled:grayscale transition-all"
          style={{ backgroundColor: PRIMARY_RED }}
        >
          Confirm & Pay ₹{total + 5}
        </button>
      </div>
    </div>
  );
};

export default CheckoutView;
