/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, MapPin, User, Phone, FileText, CreditCard, Trash2, Plus, Minus, ArrowLeft, Bike } from 'lucide-react';
import { CartItem, CustomerDetails, MenuItem, PaymentMethod } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onDeleteFromCart: (item: MenuItem) => void;
  onCheckout: (details: CustomerDetails) => void;
  onNavigateToMenu: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onDeleteFromCart,
  onCheckout,
  onNavigateToMenu,
}) => {
  // Checkout Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Tunai');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculation Values
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + (curr.menuItem.price * curr.quantity), 0);
  }, [cartItems]);

  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    // FREE SHIPPING if subtotal > 30.000
    return subtotal > 30000 ? 0 : 5000;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + shippingCost;
  }, [subtotal, shippingCost]);

  // Handle form fields and validates
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!phone.trim()) {
      newErrors.phone = 'Nomor WhatsApp wajib diisi';
    } else if (!/^[0-9+() -]{9,15}$/.test(phone.trim())) {
      newErrors.phone = 'Format nomor WhatsApp tidak valid';
    }
    if (!address.trim()) newErrors.address = 'Alamat pengiriman lengkap wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const details: CustomerDetails = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      paymentMethod,
    };

    // Format & launch WhatsApp link
    sendOrderToWhatsApp(details);

    // Call checkout trigger
    onCheckout(details);
  };

  const sendOrderToWhatsApp = (details: CustomerDetails) => {
    const restaurantWhatsApp = '6281234567890'; // Mock owner WhatsApp
    
    const header = `*📋 NOTA PESANAN ONLINE - ANGKRINGANKU*`;
    const separator = `=================================`;
    const customerInfo = `*Nama Pelanggan:* ${details.name}\n*No. WhatsApp:* ${details.phone}\n*Alamat Kirim:* ${details.address}\n${details.notes ? `*Catatan Khusus:* ${details.notes}\n` : ''}`;
    
    let itemsText = `*Daftar Pesanan:*\n`;
    cartItems.forEach((item, index) => {
      const itemSubtotal = item.menuItem.price * item.quantity;
      itemsText += `${index + 1}. _${item.menuItem.name}_ (x${item.quantity}) - Rp ${itemSubtotal.toLocaleString('id-ID')}\n`;
    });

    const deliveryText = shippingCost === 0 ? 'GRATIS (Promo >Rp30rb)' : `Rp ${shippingCost.toLocaleString('id-ID')}`;
    const pricingDetail = `\n*Subtotal:* Rp ${subtotal.toLocaleString('id-ID')}\n*Ongkir:* ${deliveryText}\n*Total Pembayaran:* *Rp ${total.toLocaleString('id-ID')}*`;
    
    const paymentDetail = `\n*Metode Pembayaran:* ${details.paymentMethod}`;
    const paymentInstruction = details.paymentMethod === 'Transfer Bank' 
      ? `\n_(Mohon transfer ke Syariah Mandiri 777-112-321 a/n Angkringanku, lalu kirimkan bukti transfer ini)_`
      : details.paymentMethod === 'QRIS'
      ? `\n_(Silakan lampirkan screenshot pembayaran QRIS setelah mengirim nota ini)_`
      : `\n_(Silakan siapkan uang pas saat pesanan tiba di rumah)_`;

    const footer = `\n\n_Mohon segera diproses ya kak, terima kasih banyak!_ 🙏🔥`;

    const fullMessage = `${header}\n${separator}\n${customerInfo}${separator}\n${itemsText}${separator}${pricingDetail}${paymentDetail}${paymentInstruction}${footer}`;
    
    const encodedMessage = encodeURIComponent(fullMessage);
    const waUrl = `https://wa.me/${restaurantWhatsApp}?text=${encodedMessage}`;
    
    // Open in new tab safely
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 py-20 bg-white dark:bg-geom-dark-dark border border-geom-border shadow-xs text-center gap-4 rounded-3xl" id="empty-cart-container">
        <div className="w-20 h-20 rounded-lg bg-geom-beige dark:bg-stone-800 text-geom-primary flex items-center justify-center mb-1 border border-geom-border animate-pulse">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-black text-geom-dark dark:text-stone-100 text-xl tracking-tight uppercase font-display">KERANJANG BELANJA KOSONG</h3>
          <p className="text-xs text-geom-brown-light dark:text-stone-400 max-w-sm mt-1.5 leading-relaxed">
            Anda belum menambahkan menu lezat apapun. Temukan nasi kucing gurih dan sate lezat di menu kami sekarang!
          </p>
        </div>
        <button
          onClick={onNavigateToMenu}
          className="px-6 py-3 rounded-lg bg-geom-primary hover:bg-geom-hover text-white font-black text-sm transition-all cursor-pointer uppercase tracking-wider"
          id="btn-empty-cart-shop"
        >
          Mulai Cari Makanan &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-12" id="cart-workspace">
      {/* List of Cart Items */}
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex items-center gap-2 font-display">
          <button
            onClick={onNavigateToMenu}
            className="p-2 rounded-lg bg-geom-beige dark:bg-stone-850 hover:bg-geom-primary hover:text-white text-geom-dark dark:text-stone-300 transition-colors cursor-pointer shrink-0 border border-geom-border dark:border-stone-800"
            id="btn-cart-back-to-menu"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <h3 className="font-black text-geom-dark dark:text-stone-100 text-xl tracking-tight uppercase">KERANJANG MENU</h3>
            <p className="text-xs text-geom-brown-light dark:text-stone-400">Berikut menu pilihan Anda siap saji</p>
          </div>
        </div>

        <div className="flex flex-col gap-4" id="cart-items-list-container">
          {cartItems.map((item) => (
            <div
              key={item.menuItem.id}
              className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-geom-dark-dark border border-geom-border dark:border-stone-850 shadow-xs hover:shadow-sm transition-all"
              id={`cart-item-row-${item.menuItem.id}`}
            >
              <img
                src={item.menuItem.image}
                alt={item.menuItem.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 bg-[#F5F5DC]/20 border border-geom-border"
                referrerPolicy="no-referrer"
              />
              
              <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-extrabold text-geom-dark dark:text-stone-100 text-sm sm:text-base leading-tight truncate uppercase font-display">
                      {item.menuItem.name}
                    </h4>
                    <p className="text-[10px] text-geom-primary dark:text-orange-400 font-bold uppercase tracking-widest mt-0.5 font-display">
                      {item.menuItem.category}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => onDeleteFromCart(item.menuItem)}
                    className="p-1.5 rounded-lg text-geom-brown-light hover:text-rose-600 hover:bg-geom-beige/40 dark:hover:bg-stone-900 transition-all cursor-pointer shrink-0 border border-transparent hover:border-geom-border"
                    id={`btn-cart-delete-${item.menuItem.id}`}
                    aria-label="Hapus produk"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="font-black text-geom-primary dark:text-orange-400 text-sm sm:text-base font-display">
                    Rp {(item.menuItem.price * item.quantity).toLocaleString('id-ID')}
                  </span>

                  <div className="flex items-center gap-2.5 bg-geom-beige/40 dark:bg-stone-800 text-geom-dark dark:text-stone-200 border border-geom-border dark:border-stone-805 rounded-lg p-1 shadow-xs">
                    <button
                      onClick={() => onRemoveFromCart(item.menuItem)}
                      className="p-1 rounded-md hover:bg-geom-primary hover:text-white dark:hover:bg-geom-primary active:scale-90 transition-transform cursor-pointer"
                      id={`btn-cart-dec-${item.menuItem.id}`}
                    >
                      <Minus className="w-3 h-3 stroke-[2.5]" />
                    </button>
                    <span className="text-xs font-black min-w-[12px] text-center px-0.5">{item.quantity}</span>
                    <button
                      onClick={() => onAddToCart(item.menuItem)}
                      className="p-1 rounded-md hover:bg-geom-primary hover:text-white dark:hover:bg-geom-primary active:scale-95 transition-transform cursor-pointer"
                      id={`btn-cart-inc-${item.menuItem.id}`}
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Promotion info banner */}
        <div className="p-4 rounded-2xl bg-geom-beige/30 dark:bg-geom-dark-dark/40 border border-geom-border flex items-start gap-3">
          <Bike className="w-5 h-5 text-geom-primary shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5 font-display">
            <h4 className="text-xs font-black text-geom-dark dark:text-stone-200 uppercase tracking-wider">PROMO GRATIS ONGKIR</h4>
            <p className="text-[11px] text-geom-brown-light dark:text-stone-400 leading-relaxed font-sans normal-case">
              Dapatkan Gratis Ongkos Kirim langsung ke rumah untuk pemesanan di atas <strong className="text-geom-primary dark:text-orange-400 font-extrabold">Rp 30.000</strong>. Nikmati angkringan bersama sekeluarga lebih hemat!
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Forms & Bills Summary */}
      <form onSubmit={handleSubmit} className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6" id="checkout-sidebar-container">
        {/* Customer Forms card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-geom-dark-dark border border-geom-border shadow-xs flex flex-col gap-4">
          <h3 className="font-black text-geom-dark dark:text-stone-100 text-base border-b border-geom-border dark:border-stone-800 pb-2.5 uppercase tracking-wide font-display">
            Informasi Pengiriman
          </h3>

          <div className="flex flex-col gap-3.5">
            {/* Input name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black text-geom-brown-light dark:text-stone-400 flex items-center gap-1.5 uppercase tracking-wider font-display">
                <User className="w-3.5 h-3.5 text-geom-primary" /> Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="cth: Bambang Utomo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`py-2.5 px-3.5 rounded-lg border bg-geom-beige/25 dark:bg-stone-900/40 text-geom-dark dark:text-stone-100 placeholder-stone-400 text-xs focus:ring-1 focus:ring-geom-primary focus:outline-hidden transition-all ${
                  errors.name ? 'border-rose-500 focus:ring-rose-400' : 'border-geom-border dark:border-stone-800'
                }`}
                id="input-customer-name"
              />
              {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
            </div>

            {/* Input Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black text-geom-brown-light dark:text-stone-400 flex items-center gap-1.5 uppercase tracking-wider font-display">
                <Phone className="w-3.5 h-3.5 text-geom-primary" /> Nomor WhatsApp
              </label>
              <input
                type="tel"
                placeholder="cth: 081234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`py-2.5 px-3.5 rounded-lg border bg-geom-beige/25 dark:bg-stone-900/40 text-geom-dark dark:text-stone-100 placeholder-stone-400 text-xs focus:ring-1 focus:ring-geom-primary focus:outline-hidden transition-all ${
                  errors.phone ? 'border-rose-500 focus:ring-rose-400' : 'border-geom-border dark:border-stone-800'
                }`}
                id="input-customer-phone"
              />
              {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
            </div>

            {/* Input Address */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black text-geom-brown-light dark:text-stone-400 flex items-center gap-1.5 uppercase tracking-wider font-display">
                <MapPin className="w-3.5 h-3.5 text-geom-primary" /> Alamat Lengkap
              </label>
              <textarea
                placeholder="cth: Perumahan Indah Permai Blok B2 No.11, Sleman, Yogyakarta"
                value={address}
                rows={3}
                onChange={(e) => setAddress(e.target.value)}
                className={`py-2.5 px-3.5 rounded-lg border bg-geom-beige/25 dark:bg-stone-900/40 text-geom-dark dark:text-stone-100 placeholder-stone-400 text-xs focus:ring-1 focus:ring-geom-primary focus:outline-hidden transition-all resize-none ${
                  errors.address ? 'border-rose-500 focus:ring-rose-400' : 'border-geom-border dark:border-stone-800'
                }`}
                id="input-customer-address"
              />
              {errors.address && <p className="text-[10px] text-rose-500 mt-0.5">{errors.address}</p>}
            </div>

            {/* Input Notes */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black text-geom-brown-light dark:text-stone-400 flex items-center gap-1.5 uppercase tracking-wider font-display">
                <FileText className="w-3.5 h-3.5 text-geom-primary" /> Catatan Pesanan (Opsional)
              </label>
              <input
                type="text"
                placeholder="cth: Sate usus dibakar agak kering ya kak"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="py-2.5 px-3.5 rounded-lg border border-geom-border dark:border-stone-800/80 bg-geom-beige/25 dark:bg-stone-900/40 text-geom-dark dark:text-stone-100 placeholder-stone-400 text-xs focus:ring-1 focus:ring-geom-primary focus:outline-hidden transition-all"
                id="input-order-notes"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-geom-dark-dark border border-geom-border shadow-xs flex flex-col gap-4">
          <h3 className="font-black text-geom-dark dark:text-stone-100 text-base border-b border-geom-border dark:border-stone-800 pb-2.5 uppercase tracking-wide font-display">
            Metode Pembayaran
          </h3>

          <div className="grid grid-cols-3 gap-2" id="payment-methods-grid">
            {(['Tunai', 'Transfer Bank', 'QRIS'] as PaymentMethod[]).map((type) => {
              const matches = paymentMethod === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPaymentMethod(type)}
                  className={`p-2.5 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all text-center cursor-pointer ${
                    matches
                      ? 'border-geom-primary bg-geom-primary/10 text-geom-primary font-black scale-[1.02]'
                      : 'border-geom-border dark:border-stone-800 bg-white dark:bg-geom-dark-dark/40 text-geom-dark dark:text-stone-300 text-xs hover:bg-geom-beige/35'
                  }`}
                  id={`btn-payment-${type}`}
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] uppercase font-bold tracking-wide whitespace-nowrap">{type}</span>
                </button>
              );
            })}
          </div>

          {/* Conditional payment instructions display */}
          {paymentMethod === 'Transfer Bank' && (
            <div className="p-3.5 rounded-lg bg-geom-beige/30 dark:bg-stone-905 border border-geom-border text-[11px] text-geom-dark dark:text-stone-300 leading-relaxed font-display">
              <strong className="text-geom-primary font-black uppercase tracking-wider">Transfer Bank:</strong>
              <p className="mt-1 font-bold text-geom-dark dark:text-stone-100">Bank Syariah Mandiri (BSI)</p>
              <p className="font-mono mt-0.5 text-xs text-geom-primary font-black">777-112-321</p>
              <p className="mt-0.5 text-geom-brown-light dark:text-stone-400 font-sans normal-case">a/n Angkringanku Indonesia</p>
            </div>
          )}

          {paymentMethod === 'QRIS' && (
            <div className="p-4 rounded-lg bg-geom-beige/30 dark:bg-stone-905 border border-geom-border text-center flex flex-col items-center gap-2">
              <span className="text-[9px] uppercase font-black text-geom-brown-light tracking-widest font-display">PINDAI QRIS DI BAWAH</span>
              {/* Native styled fake QRIS code */}
              <div className="w-32 h-32 bg-white rounded-lg p-1.5 border border-geom-border flex items-center justify-center relative">
                <img
                  src="https://picsum.photos/seed/qriscode/150/150"
                  alt="QRIS Barcode"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-1 bg-rose-600 text-white font-extrabold text-[8px] py-0.5 uppercase tracking-wide rounded">QRIS GPN</div>
              </div>
              <p className="text-[9px] text-geom-brown-light leading-normal">
                Dapat dipindai dari GoPay, OVO, ShopeePay, DANA, LinkAja, atau Mobile Banking apa saja.
              </p>
            </div>
          )}
        </div>

        {/* Bill calculation box card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-geom-dark-dark border border-geom-border shadow-xs flex flex-col gap-4">
          <h3 className="font-black text-geom-dark dark:text-stone-100 text-base border-b border-geom-border dark:border-stone-800 pb-2.5 uppercase tracking-wide font-display">
            Rincian Pembayaran
          </h3>

          <div className="flex flex-col gap-2.5 text-xs font-display">
            <div className="flex justify-between items-center">
              <span className="text-geom-brown-light dark:text-stone-400 uppercase font-black tracking-wide text-[10px]">Subtotal Makanan</span>
              <span className="font-black text-geom-dark dark:text-stone-100">
                Rp {subtotal.toLocaleString('id-ID')}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-geom-brown-light dark:text-stone-400 uppercase font-black tracking-wide text-[10px]">Biaya Pengantaran</span>
              <span className={`font-black ${shippingCost === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-geom-dark dark:text-stone-100'}`}>
                {shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
              </span>
            </div>

            <div className="h-px bg-geom-border dark:bg-stone-800 my-1 border-dashed" />

            <div className="flex justify-between items-center text-sm">
              <span className="font-black text-geom-dark dark:text-stone-200 uppercase tracking-widest text-xs">Total Tagihan</span>
              <span className="font-black text-geom-primary dark:text-orange-400 text-lg">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-geom-primary hover:bg-geom-hover text-white font-black text-xs shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-1 uppercase tracking-widest font-display border border-geom-border hover:border-geom-primary"
            id="btn-submit-order-wa"
          >
            Kirim Pesanan via WhatsApp &rarr;
          </button>
        </div>
      </form>
    </div>
  );
};
