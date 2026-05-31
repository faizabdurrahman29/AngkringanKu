/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBasket, Plus, Minus, Flame, Heart, Sparkles, Filter, X } from 'lucide-react';
import { MenuItem, Category, CartItem } from '../types';
import { SkeletonList } from './SkeletonCard';

interface MenuViewProps {
  menuItems: MenuItem[];
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onNavigateToCart: () => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  menuItems,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onNavigateToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [fakeLoading, setFakeLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories: Category[] = ['Semua', 'Nasi', 'Sate-satean', 'Gorengan', 'Mie', 'Minuman'];

  // Trigger brief fake loading when category or search changes to simulate responsive API fetching
  useEffect(() => {
    setFakeLoading(true);
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // Compute filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  // Helper to find absolute item count in cart
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + (curr.menuItem.price * curr.quantity), 0);
  }, [cartItems]);

  const getItemCartQuantity = (itemId: string) => {
    const found = cartItems.find((c) => c.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="flex flex-col gap-6 pb-24 relative">
      {/* Top Banner Accent */}
      <div className="flex flex-col gap-1 font-display">
        <h2 className="text-2xl font-black text-geom-dark dark:text-stone-100 tracking-tight flex items-center gap-2 uppercase">
          <Sparkles className="w-5 h-5 text-geom-primary fill-geom-primary animate-pulse" /> Jelajahi Menu Nusantara
        </h2>
        <p className="text-sm text-geom-brown-light dark:text-stone-400">
          Setiap menu diracik istimewa demi menjamin kenikmatan angkringan legendaris.
        </p>
      </div>

      {/* Search & Theme Accent Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-geom-brown-light" />
          <input
            type="text"
            placeholder="Cari nasi kucing, sate, minuman segar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#1E150C]/90 border border-geom-border dark:border-stone-800 text-geom-dark dark:text-stone-100 font-bold text-sm focus:outline-hidden focus:ring-1 focus:ring-geom-primary focus:border-geom-primary transition-all shadow-xs"
            id="menu-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-geom-beige/70 dark:hover:bg-stone-800 text-geom-brown-light hover:text-geom-dark transition-colors"
              id="btn-clear-search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="overflow-x-auto no-scrollbar py-1 -mx-4 px-4 flex gap-2.5 items-center scroll-smooth" id="categories-slider">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all uppercase tracking-wider ${
                isActive
                  ? 'bg-geom-dark text-white dark:bg-geom-primary dark:text-white shadow-xs border border-geom-dark dark:border-geom-primary scale-[1.02]'
                  : 'bg-white dark:bg-geom-dark-dark text-geom-dark dark:text-stone-300 border border-geom-border dark:border-stone-800 hover:bg-geom-beige/65'
              }`}
              id={`cat-pill-${cat}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Menus */}
      {fakeLoading ? (
        <SkeletonList count={6} />
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-grid">
          {filteredItems.map((item, idx) => {
            const qty = getItemCartQuantity(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
                className="bg-white dark:bg-geom-dark-dark rounded-2xl border border-geom-border dark:border-stone-850 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group justify-between"
                id={`menu-card-${item.id}`}
              >
                {/* Visual Header */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden bg-[#F5F5DC]/30 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {item.isPopular && (
                      <span className="px-2 py-0.5 rounded-lg bg-geom-primary text-white text-[10px] font-black uppercase shadow-xs flex items-center gap-0.5">
                        <Flame className="w-3 h-3 fill-white animate-bounce" /> POPULER
                      </span>
                    )}
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px] text-geom-primary dark:text-orange-400 font-bold uppercase tracking-widest font-display">
                      {item.category}
                    </div>
                    <h3 
                      className="font-extrabold text-geom-dark dark:text-stone-100 text-base leading-snug cursor-pointer group-hover:text-geom-primary transition-colors uppercase"
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-geom-brown-light dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing and Cart Interactivity */}
                  <div className="flex items-center justify-between mt-1 pt-2.5 border-t border-dashed border-geom-border/50 dark:border-stone-800/60">
                    <span className="font-black text-geom-primary dark:text-orange-400 text-base sm:text-lg font-display">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>

                    {qty > 0 ? (
                      <div className="flex items-center gap-2.5 bg-geom-primary text-white rounded-lg p-1 shadow-xs">
                        <button
                          onClick={() => onRemoveFromCart(item)}
                          className="p-1 rounded-lg hover:bg-white/10 active:scale-90 transition-transform cursor-pointer"
                          id={`btn-menu-dec-${item.id}`}
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                        <span className="text-xs font-black min-w-[12px] text-center px-0.5">{qty}</span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="p-1 rounded-lg hover:bg-white/10 active:scale-95 transition-transform cursor-pointer"
                          id={`btn-menu-inc-${item.id}`}
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-4 py-2 rounded-lg bg-geom-beige hover:bg-geom-primary dark:bg-stone-800 dark:hover:bg-geom-primary text-geom-dark dark:text-stone-200 hover:text-white dark:hover:text-white font-black text-xs border border-geom-border dark:border-stone-800 hover:border-geom-primary transition-all active:scale-[0.97] cursor-pointer uppercase tracking-wider"
                        id={`btn-menu-add-${item.id}`}
                      >
                        Tambah +
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1E150C]/90 rounded-2xl border border-stone-200 dark:border-stone-800/80 gap-3" id="no-item-search-container">
          <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mb-2">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-stone-800 dark:text-stone-200 text-lg">Menu Tidak Ditemukan</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs">
            Kami tidak bisa menemukan buah rasa "{searchQuery}" di angkringan. Silakan coba kata kunci lain.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="px-4 py-2.5 rounded-lg bg-geom-primary hover:bg-geom-hover text-white text-xs font-black transition-all uppercase tracking-wider cursor-pointer"
            id="btn-reset-filters"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Floating Sticky GrabFood-style Cart Summary */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-22 md:bottom-24 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[600px] z-40"
            id="floating-cart-sticky"
          >
            <div className="bg-geom-dark/95 dark:bg-geom-primary/95 hover:bg-geom-dark dark:hover:bg-geom-primary backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-xl border border-geom-border dark:border-geom-primary/30 text-white transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center relative shrink-0 border border-white/10">
                  <ShoppingBasket className="w-5.5 h-5.5 text-white" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-geom-primary border-2 border-geom-dark flex items-center justify-center text-[9px] font-black text-white">
                    {cartCount}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-geom-primary dark:text-stone-100 tracking-widest font-display">Keranjang Pesanan</p>
                  <p className="text-sm font-black">
                    Total: Rp {cartTotal.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <button
                onClick={onNavigateToCart}
                className="px-4 py-2.5 rounded-lg bg-geom-beige text-geom-dark hover:bg-geom-primary hover:text-white font-black text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs uppercase tracking-wider border border-geom-border"
                id="btn-checkout-floating"
              >
                Lanjut Checkout &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Item Detail Modal/Sheet */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-geom-dark/85 backdrop-blur-xs"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-white dark:bg-geom-dark-dark rounded-3xl overflow-hidden shadow-2xl border border-geom-border dark:border-stone-850 z-10 flex flex-col max-h-[90vh]"
              id="item-detail-modal"
            >
              {/* Image Header with float controls */}
              <div className="relative aspect-[4/3] bg-[#F5F5DC]/30">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-geom-dark/70 hover:bg-geom-dark text-white backdrop-blur-sm transition-all cursor-pointer border border-white/10"
                  id="btn-close-detail-modal"
                  aria-label="Tutup detail menu"
                >
                  <X className="w-5 h-5" />
                </button>
                {selectedItem.isPopular && (
                  <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-geom-primary text-white text-xs font-black uppercase shadow-xs flex items-center gap-1 tracking-wider">
                    <Flame className="w-3.5 h-3.5 fill-white animate-bounce" /> Terlaris
                  </div>
                )}
              </div>

              {/* Body details */}
              <div className="p-6 flex flex-col gap-4 overflow-y-auto">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-black text-geom-primary dark:text-orange-400 uppercase tracking-widest font-display">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-2xl font-black text-geom-dark dark:text-stone-100 leading-tight uppercase font-display">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs text-geom-brown-light dark:text-stone-400 leading-relaxed mt-1">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="flex items-center gap-6 p-4 rounded-xl bg-geom-beige/40 dark:bg-stone-900/40 border border-geom-border dark:border-stone-800/60 mt-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-geom-brown-light uppercase font-black tracking-widest">HARGA SATUAN</span>
                    <span className="text-xl font-black text-geom-primary dark:text-orange-400">
                      Rp {selectedItem.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  
                  <div className="h-8 w-px bg-geom-border dark:bg-stone-805" />

                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-[9px] text-geom-brown-light uppercase font-black tracking-widest">KATEGORI KHAS</span>
                    <span className="text-xs font-black text-geom-dark dark:text-stone-200">
                      ANGKRINGAN TRADISIONAL
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <h4 className="text-xs font-black text-geom-dark dark:text-stone-300 uppercase tracking-wider flex items-center gap-1.5 font-display">
                    <Heart className="w-3.5 h-3.5 text-geom-primary fill-geom-primary animate-pulse" /> Jaminan Kualitas Sanitasi
                  </h4>
                  <p className="text-[10px] text-geom-brown-light leading-relaxed">
                    Setiap porsi makanan dikemas secara higienis menggunakan alas daun pisang asli berkualitas tinggi yang dibersihkan secara steril untuk memastikan aroma dan cita rasa tetap alami.
                  </p>
                </div>
              </div>

              {/* Action pricing footer */}
              <div className="p-4 bg-geom-beige/30 dark:bg-stone-900/40 border-t border-geom-border dark:border-stone-850 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-geom-brown-light dark:text-stone-400 font-extrabold uppercase mr-1">KERANJANG:</span>
                  {getItemCartQuantity(selectedItem.id) > 0 ? (
                    <div className="flex items-center gap-3 bg-geom-primary text-white rounded-lg p-1.5 shadow-xs">
                      <button
                        onClick={() => onRemoveFromCart(selectedItem)}
                        className="p-1 rounded-lg hover:bg-white/10 active:scale-90 transition-transform cursor-pointer"
                        id="btn-modal-dec"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <span className="text-xs font-black min-w-[12px] text-center px-0.5">{getItemCartQuantity(selectedItem.id)}</span>
                      <button
                        onClick={() => onAddToCart(selectedItem)}
                        className="p-1 rounded-lg hover:bg-white/10 active:scale-95 transition-transform cursor-pointer"
                        id="btn-modal-inc"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(selectedItem)}
                      className="px-4 py-2 rounded-lg bg-geom-primary hover:bg-geom-hover text-white font-black text-xs shadow-xs transition-colors cursor-pointer uppercase tracking-wider"
                      id="btn-modal-add"
                    >
                      Tambah Masuk +
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 border border-geom-border dark:border-stone-700 text-geom-dark dark:text-stone-300 hover:bg-geom-beige/50 dark:hover:bg-stone-800 rounded-lg text-xs font-black transition-all cursor-pointer uppercase tracking-wide"
                  id="btn-modal-back"
                >
                  Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
