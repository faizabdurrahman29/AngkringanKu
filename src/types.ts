/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Semua' | 'Nasi' | 'Sate-satean' | 'Gorengan' | 'Mie' | 'Minuman';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  isAvailable?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export type PaymentMethod = 'Tunai' | 'Transfer Bank' | 'QRIS';

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customerDetails: CustomerDetails;
  totalPrice: number;
  status: 'Diterima' | 'Sedang Diproses' | 'Selesai';
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
