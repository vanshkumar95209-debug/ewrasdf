
export interface User {
  name: string;
  phone: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type ViewType = 
  | 'LOGIN' 
  | 'LOCATION_PROMPT' 
  | 'HOME' 
  | 'RESTAURANT_DETAIL' 
  | 'CART' 
  | 'CHECKOUT' 
  | 'SUCCESS';

export interface LocationData {
  lat: number | null;
  lng: number | null;
  status: 'connected' | 'manual';
}

export type PaymentMode = 'UPI' | 'COD';
