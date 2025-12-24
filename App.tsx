
import React, { useState, useEffect, useCallback } from 'react';
import { ViewType, User, LocationData, CartItem, PaymentMode } from './types';
import LoginView from './views/LoginView';
import LocationPromptView from './views/LocationPromptView';
import HomeView from './views/HomeView';
import RestaurantDetailView from './views/RestaurantDetailView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import SuccessView from './views/SuccessView';
import { MENU_ITEMS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('LOGIN');
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<LocationData>({ lat: null, lng: null, status: 'manual' });
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [address, setAddress] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('COD');

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  // Fixed: Cast Object.entries to ensure qty is recognized as a number
  const cartItems: CartItem[] = (Object.entries(cart) as [string, number][]).map(([id, qty]) => {
    const item = MENU_ITEMS.find(m => m.id === id)!;
    return { ...item, quantity: qty };
  });

  const totalAmount = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  // Simple "Router"
  const renderView = () => {
    switch (currentView) {
      case 'LOGIN':
        return <LoginView onLogin={(u) => { setUser(u); setCurrentView('LOCATION_PROMPT'); }} />;
      case 'LOCATION_PROMPT':
        return (
          <LocationPromptView 
            onSuccess={(lat, lng) => { 
              setLocation({ lat, lng, status: 'connected' }); 
              setCurrentView('HOME'); 
            }} 
            onSkip={() => {
              setLocation(prev => ({ ...prev, status: 'manual' }));
              setCurrentView('HOME');
            }}
          />
        );
      case 'HOME':
        return <HomeView onSelectRestaurant={() => setCurrentView('RESTAURANT_DETAIL')} />;
      case 'RESTAURANT_DETAIL':
        return (
          <RestaurantDetailView 
            cart={cart} 
            onBack={() => setCurrentView('HOME')} 
            onAdd={addToCart} 
            onRemove={removeFromCart} 
            onGoToCart={() => setCurrentView('CART')}
          />
        );
      case 'CART':
        return (
          <CartView 
            cartItems={cartItems} 
            total={totalAmount} 
            onBack={() => setCurrentView('RESTAURANT_DETAIL')} 
            onCheckout={() => setCurrentView('CHECKOUT')} 
          />
        );
      case 'CHECKOUT':
        return (
          <CheckoutView 
            location={location}
            address={address}
            setAddress={setAddress}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            onBack={() => setCurrentView('CART')}
            onPlaceOrder={() => setCurrentView('SUCCESS')}
            total={totalAmount}
          />
        );
      case 'SUCCESS':
        return (
          <SuccessView 
            user={user!}
            address={address}
            location={location}
            cartItems={cartItems}
            total={totalAmount}
            paymentMode={paymentMode}
            onHome={() => {
              setCart({});
              setAddress('');
              setCurrentView('HOME');
            }}
          />
        );
      default:
        return <LoginView onLogin={(u) => { setUser(u); setCurrentView('LOCATION_PROMPT'); }} />;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[450px] bg-white shadow-2xl relative flex flex-col min-h-screen overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
