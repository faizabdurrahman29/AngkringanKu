/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, ReceiptText, ChevronDown, ChevronUp, RefreshCw, Calendar, Trash2, User, MapPin, ClipboardList, CreditCard } from 'lucide-react';
import { Order } from '../types';

interface HistoryViewProps {
  orders: Order[];
  onReorder: (order: Order) => void;
  onClearHistory: () => void;
  onNavigateToMenu: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  orders,
  onReorder,
  onClearHistory,
  onNavigateToMenu,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrderExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 py-20 bg-white dark:bg-geom-dark-dark border border-geom-border rounded-3xl shadow-xs text-center gap-4 animate-fade-in" id="empty-history-container">
        <div className="w-20 h-20 rounded-lg bg-geom-beige dark:bg-stone-800 text-geom-primary flex items-center justify-center mb-1 border border-geom-border animate-pulse">
          <History className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-black text-geom-dark dark:text-stone-100 text-xl tracking-tight uppercase font-display">Belum Ada Riwayat Pesanan</h3>
          <p className="text-xs text-geom-brown-light dark:text-stone-400 max-w-sm mt-1.5 leading-relaxed">
            Anda belum pernah memesan di Angkringanku. Cobalah memesan menu legendaris kami sekarang dan rasakan kelezatannya!
          </p>
        </div>
        <button
          onClick={onNavigateToMenu}
          className="px-6 py-3 rounded-lg bg-geom-primary hover:bg-geom-hover text-white font-black text-xs transition-all uppercase tracking-wider font-display"
          id="btn-empty-history-menu"
        >
          Pesan Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12" id="history-workspace">
      {/* Header controls */}
      <div className="flex justify-between items-center gap-4 font-display">
        <div className="flex flex-col">
          <h3 className="font-black text-geom-dark dark:text-stone-100 text-xl tracking-tight uppercase">Riwayat Pesanan</h3>
          <p className="text-xs text-geom-brown-light dark:text-stone-400 font-sans mt-0.5">Daftar transaksi pesanan Anda sebelumnya</p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat pesanan?')) {
              onClearHistory();
            }
          }}
          className="px-3.5 py-2 border border-geom-border hover:bg-rose-50 dark:hover:bg-rose-950/20 text-geom-brown-light hover:text-rose-600 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          id="btn-clear-history-all"
        >
          <Trash2 className="w-4 h-4" /> Hapus Riwayat
        </button>
      </div>

      {/* List of Orders */}
      <div className="flex flex-col gap-4" id="orders-history-list">
        {orders.map((order, idx) => {
          const isExpanded = expandedOrderId === order.id;
          const totalItemsCount = order.items.reduce((acc, curr) => acc + curr.quantity, 0);
          
          return (
            <div
              key={order.id}
              className="bg-white dark:bg-geom-dark-dark rounded-3xl border border-geom-border shadow-xs overflow-hidden transition-all duration-300 font-display"
              id={`history-card-${order.id}`}
            >
              {/* Card Visible Block */}
              <div
                onClick={() => toggleOrderExpand(order.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-geom-beige/10 transition-colors"
                id={`history-summary-header-${order.id}`}
              >
                <div className="flex-1 flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-geom-beige dark:bg-stone-850 text-geom-primary shrink-0 border border-geom-border">
                    <ReceiptText className="w-5.5 h-5.5" />
                  </div>
                  
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-geom-dark dark:text-stone-100 text-sm">
                        {order.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/30 text-emerald-850 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider">
                        WA TERKIRIM
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-geom-brown-light dark:text-stone-400 font-sans">
                      <span className="flex items-center gap-1 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-geom-primary" /> {order.date}
                      </span>
                      <span>•</span>
                      <span className="font-bold">{totalItemsCount} Menu</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-dashed border-geom-border dark:border-stone-800">
                  <div className="flex flex-col sm:items-end gap-0.5">
                    <span className="text-[10px] text-geom-brown-light font-black uppercase tracking-wider">TOTAL BELANJA</span>
                    <span className="font-black text-geom-primary dark:text-orange-400 text-base">
                      Rp {order.totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Expand Collapse triggers */}
                    <div className="p-2 rounded-lg bg-geom-beige dark:bg-stone-800 text-geom-dark border border-geom-border hover:bg-geom-primary hover:text-white transition-all">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Collapsible Detail Panel */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-geom-border dark:border-stone-800/60 bg-geom-beige/20 dark:bg-stone-900/10"
                  >
                    <div className="p-5 flex flex-col md:flex-row gap-6">
                      {/* Left Block - Items list inside the order invoice */}
                      <div className="flex-1 flex flex-col gap-3">
                        <h4 className="text-xs font-black text-geom-dark dark:text-stone-300 uppercase tracking-wider flex items-center gap-1.5 font-display">
                          <ClipboardList className="w-4 h-4 text-geom-primary" /> Rincian Item Pesanan
                        </h4>
                        
                        <div className="flex flex-col gap-2.5">
                          {order.items.map((cartItem) => (
                            <div
                              key={cartItem.menuItem.id}
                              className="flex justify-between items-center bg-white dark:bg-geom-dark-dark p-3 rounded-lg border border-geom-border text-xs font-sans"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="font-black text-geom-primary dark:text-orange-400">
                                  {cartItem.quantity}x
                                </span>
                                <span className="font-bold text-geom-dark dark:text-stone-200 truncate">
                                  {cartItem.menuItem.name}
                                </span>
                              </div>
                              <span className="font-bold text-geom-brown-light dark:text-stone-300">
                                Rp {(cartItem.menuItem.price * cartItem.quantity).toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Block - Shipping details summary */}
                      <div className="w-full md:w-[300px] shrink-0 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <h4 className="text-xs font-black text-geom-dark dark:text-stone-300 uppercase tracking-wider flex items-center gap-1.5 font-display">
                            <User className="w-4 h-4 text-geom-primary" /> Tujuan Pengantaran
                          </h4>
                          <div className="bg-white dark:bg-geom-dark-dark border border-geom-border p-3.5 rounded-lg text-xs flex flex-col gap-1.5 text-geom-dark dark:text-stone-300 font-sans">
                            <div>
                              <strong className="text-geom-dark dark:text-stone-105 font-extrabold">{order.customerDetails.name}</strong>
                              <span className="text-[10px] block font-mono text-geom-brown-light mt-0.5">{order.customerDetails.phone}</span>
                            </div>
                            <div className="flex gap-1 items-start mt-1">
                              <MapPin className="w-4 h-4 text-geom-primary shrink-0 mt-0.5" />
                              <p className="leading-relaxed text-[11px] font-bold text-geom-brown-light dark:text-stone-400">{order.customerDetails.address}</p>
                            </div>
                            {order.customerDetails.notes && (
                              <p className="text-[10px] bg-geom-beige/30 dark:bg-stone-900 border border-geom-border p-2 rounded text-geom-brown-light mt-1 italic font-semibold">
                                "{order.customerDetails.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Payment summary and reorder buttons */}
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center justify-between text-xs bg-white dark:bg-geom-dark-dark border border-geom-border p-3 rounded-lg font-display">
                            <span className="text-geom-brown-light flex items-center gap-1 font-black text-[10px] tracking-wider uppercase">
                              <CreditCard className="w-3.5 h-3.5 text-geom-primary" /> BAYAR:
                            </span>
                            <span className="font-black text-geom-dark dark:text-stone-200 uppercase text-[10px] tracking-wide bg-geom-beige dark:bg-stone-800 px-2.5 py-0.5 rounded-md border border-geom-border">
                              {order.customerDetails.paymentMethod}
                            </span>
                          </div>

                          <button
                            onClick={() => onReorder(order)}
                            className="w-full py-3.5 rounded-lg bg-geom-primary hover:bg-geom-hover text-white font-black text-xs transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide border border-geom-border hover:border-geom-primary font-display"
                            id={`btn-reorder-again-${order.id}`}
                          >
                            <RefreshCw className="w-4 h-4" /> Pesan Ulang Menu Ini
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
