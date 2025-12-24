
import React, { useEffect, useState } from 'react';
import { User, LocationData, CartItem, PaymentMode } from '../types';
import { MERCHANT_WHATSAPP, MERCHANT_UPI_ID, PRIMARY_RED } from '../constants';

interface Props {
  user: User;
  address: string;
  location: LocationData;
  cartItems: CartItem[];
  total: number;
  paymentMode: PaymentMode;
  onHome: () => void;
}

const SuccessView: React.FC<Props> = ({ 
  user, address, location, cartItems, total, paymentMode, onHome 
}) => {
  const finalTotal = total + 5;

  const getWhatsAppUrl = () => {
    const itemsList = cartItems.map(item => `• ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('\n');
    const mapsLink = location.lat ? `https://www.google.com/maps?q=${location.lat},${location.lng}` : 'Location not shared via GPS';
    
    const messageText = `🚨 *NAYA ORDER AAYA HAI!* 🚨\n\n` +
      `*CUSTOMER INFO*\n` +
      `👤 Name: ${user.name}\n` +
      `📞 Phone: ${user.phone}\n\n` +
      `*DELIVERY ADDRESS*\n` +
      `🏠 ${address}\n\n` +
      `*GPS LOCATION*\n` +
      `📍 ${mapsLink}\n\n` +
      `*ORDER ITEMS*\n` +
      `${itemsList}\n\n` +
      `*BILL SUMMARY*\n` +
      `💰 Subtotal: ₹${total}\n` +
      `📦 Delivery: FREE\n` +
      `💵 *FINAL TOTAL: ₹${finalTotal}*\n\n` +
      `*PAYMENT MODE*\n` +
      `💳 ${paymentMode === 'UPI' ? 'UPI Online (' + MERCHANT_UPI_ID + ')' : 'Cash on Delivery (COD)'}\n\n` +
      `_P.S. Please confirm this order!_`;

    // Using wa.me is the most reliable way to trigger the WhatsApp app directly
    return `https://wa.me/91${MERCHANT_WHATSAPP}?text=${encodeURIComponent(messageText)}`;
  };

  // Attempt auto-redirect, but the button is the main fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      window.open(getWhatsAppUrl(), '_blank');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white p-8 animate-in zoom-in duration-500 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-inner animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="italic-bold-headline text-5xl mb-2 text-green-600 tracking-tighter uppercase">Order Placed!</h2>
        <p className="text-gray-900 font-bold text-lg mb-8 italic">Final step: Send order to WhatsApp</p>
        
        <div className="bg-gray-50 w-full p-8 rounded-[3rem] mb-10 border border-gray-100 shadow-sm relative">
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payable Amount</span>
           </div>
           <p className="text-6xl font-black italic text-gray-900 tracking-tighter">₹{finalTotal}</p>
        </div>

        <div className="w-full space-y-4">
          <a 
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-6 rounded-[2.5rem] bg-green-600 text-white font-black text-xl shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            COMPLETE ON WHATSAPP
          </a>

          <button 
            onClick={onHome}
            className="w-full py-4 rounded-[2.5rem] border-2 border-gray-100 text-gray-400 font-black uppercase text-xs tracking-widest"
          >
            Go Back Home
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center pb-4 opacity-50">
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          Merchant UPI: {MERCHANT_UPI_ID}
        </p>
      </div>
    </div>
  );
};

export default SuccessView;
