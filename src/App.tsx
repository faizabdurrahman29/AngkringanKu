/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { CartView } from './components/CartView';
import { HistoryView } from './components/HistoryView';
import { ContactView } from './components/ContactView';
import { Toast } from './components/Toast';
import { MENU_ITEMS } from './data/menu';
import { CartItem, CustomerDetails, MenuItem, Order, ToastMessage } from './types';
import { Home, Utensils, ShoppingBasket, History, PhoneCall, Moon, Sun, Flame, MessageCircleHeart } from 'lucide-react';

export default function App() {
  // Navigation state: 'home' | 'menu' | 'cart' | 'history' | 'contact'
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'cart' | 'history' | 'contact'>('home');

  // Core state from localStorage fallback
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('angkringanku_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('angkringanku_past_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('angkringanku_dark_mode');
      if (saved) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize dynamic local persistence
  useEffect(() => {
    localStorage.setItem('angkringanku_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('angkringanku_past_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('angkringanku_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toast triggers
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(-4);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { menuItem: item, quantity: 1 }];
      }
    });
    addToast(`${item.name} berhasil ditambahkan ke keranjang!`, 'success');
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        if (updated[existingIdx].quantity > 1) {
          updated[existingIdx].quantity -= 1;
          addToast(`Jumlah ${item.name} dikurangi.`, 'info');
          return updated;
        } else {
          updated.splice(existingIdx, 1);
          addToast(`${item.name} dihapus dari keranjang.`, 'info');
          return updated;
        }
      }
      return prev;
    });
  };

  const handleDeleteFromCart = (item: MenuItem) => {
    setCartItems((prev) => prev.filter((i) => i.menuItem.id !== item.id));
    addToast(`${item.name} dihapus dari keranjang.`, 'info');
  };

  const handleCheckoutSuccess = (details: CustomerDetails) => {
    const invoiceId = `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`;
    
    // Calculate total cost (including free packaging promotion above Rp 30K)
    const subtotal = cartItems.reduce((acc, curr) => acc + (curr.menuItem.price * curr.quantity), 0);
    const shipping = subtotal > 30000 ? 0 : 5000;
    const finalBill = subtotal + shipping;

    const newOrder: Order = {
      id: invoiceId,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cartItems],
      customerDetails: details,
      totalPrice: finalBill,
      status: 'Diterima'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    addToast('Nota pemesanan Anda berhasil dibuat & dikirim ke WhatsApp!', 'success');
    setActiveTab('history');
  };

  const handleReorder = (pastOrder: Order) => {
    // Populate active cart with past items
    setCartItems(pastOrder.items);
    addToast('Daftar menu pesanan sebelumnya kembali dimuat ke keranjang Anda!', 'success');
    setActiveTab('cart');
  };

  const handleClearHistory = () => {
    setOrders([]);
    addToast('Seluruh riwayat transaksi pesanan berhasil dihapus.', 'info');
  };

  const popularItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.isPopular);
  }, []);

  const totalCartIconCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-geom-bg dark:bg-geom-bg-dark text-geom-dark dark:text-stone-100 flex flex-col font-sans" id="applet-viewport">
      {/* Upper Navigation Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-geom-dark-dark border-b border-geom-border/60 dark:border-stone-800/80 shadow-xs px-4" id="app-header-main">
        <div className="max-w-6xl mx-auto h-20 flex items-center justify-between">
          
          {/* Logo Brand Brandings */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
            id="brand-logo-trigger"
          >
            <div className="w-10 h-10 rounded-xl bg-geom-primary flex items-center justify-center text-white shadow-md shadow-geom-primary/20 group-hover:scale-105 transition-transform">
              <Flame className="w-5.5 h-5.5 fill-white" />
            </div>
            
            <div className="flex flex-col font-display">
              <span className="text-xl font-black tracking-tight text-geom-dark dark:text-white uppercase">
                ANGKRINGAN<span className="text-geom-primary">KU</span>
              </span>
              <span className="text-[9px] uppercase font-bold text-geom-brown-light dark:text-stone-400 tracking-widest leading-none">
                Warung Rakyat Modern
              </span>
            </div>
          </div>

          {/* Large Screen Top Page Navigators */}
          <nav className="hidden md:flex items-center gap-1.5" id="dekstop-header-navigation">
            {[
              { id: 'home', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
              { id: 'menu', label: 'Menu', icon: <Utensils className="w-4 h-4" /> },
              { id: 'cart', label: 'Keranjang', icon: <ShoppingBasket className="w-4 h-4" />, badge: totalCartIconCount },
              { id: 'history', label: 'Riwayat', icon: <History className="w-4 h-4" /> },
              { id: 'contact', label: 'Hubungi', icon: <PhoneCall className="w-4 h-4" /> }
            ].map((tab) => {
              const matched = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    matched
                      ? 'bg-geom-dark text-white dark:bg-geom-primary dark:text-white font-black'
                      : 'text-geom-brown-light dark:text-stone-300 hover:bg-geom-beige/60 dark:hover:bg-stone-800/40 hover:text-geom-dark'
                  }`}
                  id={`top-tab-${tab.id}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-geom-primary text-white text-[10px] font-extrabold leading-none">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utility buttons */}
          <div className="flex items-center gap-3">
            {/* Theme switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-geom-beige/70 dark:bg-[#1E150C] hover:bg-geom-border/50 dark:hover:bg-stone-800 rounded-xl transition-all cursor-pointer text-geom-dark dark:text-stone-300"
              id="btn-theme-toggle"
              aria-label="Togel mode gelap terma"
            >
              {darkMode ? <Sun className="w-4 h-4 stroke-[3]" /> : <Moon className="w-4 h-4 stroke-[3]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 mt-4">
        {activeTab === 'home' && (
          <HomeView
            popularItems={popularItems}
            onNavigateToMenu={() => setActiveTab('menu')}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'menu' && (
          <MenuView
            menuItems={MENU_ITEMS}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onNavigateToCart={() => setActiveTab('cart')}
          />
        )}

        {activeTab === 'cart' && (
          <CartView
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onDeleteFromCart={handleDeleteFromCart}
            onCheckout={handleCheckoutSuccess}
            onNavigateToMenu={() => setActiveTab('menu')}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            orders={orders}
            onReorder={handleReorder}
            onClearHistory={handleClearHistory}
            onNavigateToMenu={() => setActiveTab('menu')}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView onShowToast={addToast} />
        )}
      </main>

      {/* Footer copyright */}
      <footer className="bg-geom-dark text-white/70 py-8 px-4 border-t border-geom-border dark:border-stone-90% pb-28 md:pb-10 text-center text-xs" id="app-footer">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-3">
          <div className="flex items-center gap-1.5 text-geom-primary font-black uppercase text-sm font-display tracking-wider">
            <MessageCircleHeart className="w-4 h-4 fill-geom-primary text-[#FFFDF0] animate-pulse" /> Angkringanku, Selera Kita Semua.
          </div>
          <div className="flex flex-col md:items-end text-white/50 uppercase tracking-widest text-[10px] gap-1.5">
            <p>
              Yogyakarta, Indonesia. Seluruh hak cipta dilindungi &copy; 2026.
            </p>
            <div className="flex gap-4 justify-center md:justify-end mt-1">
              <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Sticky Mobile Navigation Tabs (Standard for mobile GoFood/GrabFood layout) */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-[#1E150C]/95 backdrop-blur-md border-t border-geom-border/50 dark:border-stone-850 shadow-xl py-2 px-3 md:hidden flex justify-around items-center z-40 rounded-t-2xl" id="mobile-bottom-navigation">
        {[
          { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
          { id: 'menu', label: 'Menu', icon: <Utensils className="w-5 h-5" /> },
          { id: 'cart', label: 'Keranjang', icon: <ShoppingBasket className="w-5 h-5" />, badge: totalCartIconCount },
          { id: 'history', label: 'Riwayat', icon: <History className="w-5 h-5" /> },
          { id: 'contact', label: 'Kontak', icon: <PhoneCall className="w-5 h-5" /> }
        ].map((tab) => {
          const matched = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer relative ${
                matched
                  ? 'text-geom-primary dark:text-geom-primary font-black scale-105 transition-transform'
                  : 'text-geom-brown-light dark:text-stone-400'
              }`}
              id={`mobile-tab-${tab.id}`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-geom-primary border border-white text-white text-[8px] font-black flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Active Toast components renderer */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
