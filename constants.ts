
import { MenuItem } from './types';

export const MERCHANT_WHATSAPP = "9259853515";
export const MERCHANT_UPI_ID = "7983073238@ptyes";
export const PRIMARY_RED = "#EF4444";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Burger',
    price: 99,
    description: 'Juicy vegetable patty with fresh lettuce and cream cheese.',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Pizza',
    price: 249,
    description: 'Freshly baked farmhouse pizza with overloaded cheese.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Patties',
    price: 45,
    description: 'Crispy golden layers with spicy potato filling.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce7c?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Cake',
    price: 450,
    description: 'Rich Belgian chocolate truffle cake (500g).',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Pastry',
    price: 60,
    description: 'Creamy red velvet pastry with white chocolate chips.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=300&fit=crop'
  }
];

export const RESTAURANTS = [
  {
    id: 'res-1',
    name: 'Delicious Food',
    rating: 4.8,
    deliveryTime: '20-25 min',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    cuisine: 'Fast Food, Italian, Desserts'
  }
];
