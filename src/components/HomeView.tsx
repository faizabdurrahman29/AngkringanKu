/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Clock, MapPin, Award, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface HomeViewProps {
  popularItems: MenuItem[];
  onNavigateToMenu: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  popularItems,
  onNavigateToMenu,
  onAddToCart,
}) => {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-geom-dark border border-geom-border shadow-md h-[450px] md:h-[550px] flex flex-col justify-end">
        <img
          src="/src/assets/images/angkringanku_hero_1780192990453.png"
          alt="Angkringanku Indonesia Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-80 md:opacity-90 saturate-125 hover:scale-[1.02] transition-transform duration-[10000ms] ease-out-sine"
          referrerPolicy="no-referrer"
        />
        {/* Soft Radial Warm Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative p-6 sm:p-10 md:p-14 max-w-2xl flex flex-col items-start gap-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="px-4 py-1.5 rounded-xl bg-geom-primary text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"
            id="hero-badge"
          >
            <Award className="w-3.5 h-3.5 text-white" /> Pelopor Angkringan Premium
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12] uppercase font-display"
            id="hero-title"
          >
            Nostalgia Kuliner <br />
            <span className="text-geom-primary">
              Angkringan Tradisional
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-sm sm:text-base leading-relaxed"
            id="hero-slogan"
          >
            Rasakan kehangatan malam bersama sepiring Nasi Kucing pulen, aneka sate baceman bakar, gorengan garing, dan ikonik Wedang Jahe hangat kami. Cita rasa legendaris kini hadir dalam satu genggaman Anda.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-2 w-full sm:w-auto"
            id="hero-buttons-container"
          >
            <button
              onClick={onNavigateToMenu}
              className="px-8 py-4 rounded-xl bg-geom-primary hover:bg-geom-hover text-white font-extrabold text-sm shadow-lg shadow-geom-primary/30 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center uppercase tracking-widest"
              id="btn-hero-order"
            >
              <ShoppingBag className="w-4 h-4" /> Pesan Sekarang
            </button>
            <a
              href="#lokasi"
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm backdrop-blur-xs transition-colors text-center w-full sm:w-auto"
              id="btn-hero-location"
            >
              Lihat Lokasi
            </a>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="trust-badges-grid">
        <div className="p-5 rounded-2xl bg-white dark:bg-geom-dark-dark border border-geom-border dark:border-stone-800/80 shadow-xs flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-geom-beige dark:bg-stone-800 text-geom-primary">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-geom-dark dark:text-stone-200 text-base font-display">Selalu Hangat</h3>
            <p className="text-xs text-geom-brown-light dark:text-stone-450 mt-1">Dibuat langsung & disajikan dalam kondisi hangat.</p>
          </div>
        </div>
        
        <div className="p-5 rounded-2xl bg-white dark:bg-geom-dark-dark border border-geom-border dark:border-stone-800/80 shadow-xs flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-geom-beige dark:bg-stone-800 text-geom-primary">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-geom-dark dark:text-stone-200 text-base font-display">Bahan Berkualitas</h3>
            <p className="text-xs text-geom-brown-light dark:text-stone-450 mt-1 font-normal">Kualitas rasa tradisional yang bersih dan higienis.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-geom-dark-dark border border-geom-border dark:border-stone-800/80 shadow-xs flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-geom-beige dark:bg-stone-800 text-geom-primary">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-geom-dark dark:text-stone-200 text-base font-display">Pengiriman Cepat</h3>
            <p className="text-xs text-geom-brown-light dark:text-stone-450 mt-1 font-normal">Antar aman terlindungi daun pisang tebal.</p>
          </div>
        </div>
      </div>

      {/* Popular Menu Slider/Grid */}
      <div className="flex flex-col gap-6" id="popular-menu-section">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-geom-dark dark:text-stone-100 tracking-tight font-display">MENU TERLARIS 🔥</h2>
            <p className="text-sm text-geom-brown-light dark:text-stone-450 mt-1 font-normal">Sajian andalan paling dirindukan para pelanggan setia</p>
          </div>
          <button
            onClick={onNavigateToMenu}
            className="text-geom-primary hover:text-geom-hover dark:text-geom-primary dark:hover:text-amber-300 font-extrabold text-xs transition-colors flex items-center gap-1 cursor-pointer uppercase tracking-widest"
            id="btn-see-all-menu"
          >
            Lihat Semua Menu &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white dark:bg-geom-dark-dark border border-geom-border dark:border-stone-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              id={`popular-item-${item.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5DC]/30">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-geom-primary text-white text-[10px] font-bold uppercase shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" /> Terlaris
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-geom-primary font-bold tracking-wide uppercase font-display">
                    {item.category}
                  </div>
                  <h3 className="font-extrabold text-geom-dark dark:text-stone-100 text-base md:text-lg group-hover:text-geom-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-geom-brown-light dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-dashed border-geom-border/50 dark:border-stone-800/85">
                  <span className="font-black text-geom-primary dark:text-orange-400 text-base md:text-lg">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                  
                  <button
                    onClick={() => onAddToCart(item)}
                    className="px-3.5 py-1.5 rounded-lg bg-geom-beige hover:bg-geom-primary dark:bg-stone-800 dark:hover:bg-geom-primary text-geom-dark dark:text-stone-200 hover:text-white dark:hover:text-white border border-geom-border hover:border-geom-primary dark:border-stone-800 text-xs font-black transition-all cursor-pointer flex items-center gap-1 uppercase tracking-wider"
                    id={`btn-add-popular-${item.id}`}
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="p-8 rounded-3xl bg-geom-beige/30 dark:bg-geom-dark-dark/40 border border-geom-border shadow-xs flex flex-col gap-6" id="reviews-section">
        <div className="text-center max-w-md mx-auto flex flex-col gap-1.5 font-display text-geom-dark dark:text-stone-100">
          <h2 className="text-2xl font-black uppercase tracking-tight">APA KATA MEREKA?</h2>
          <p className="text-xs text-geom-brown-light dark:text-stone-400">Pengalaman bersantap nyata dari pelanggan Angkringanku</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#1E150C] p-5 rounded-2xl shadow-xs border border-geom-border dark:border-stone-850">
            <div className="flex items-center gap-1 text-geom-primary mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-geom-primary text-geom-primary" />
              ))}
            </div>
            <p className="text-xs text-geom-dark dark:text-stone-300 italic leading-relaxed">
              "Kualitas nasi kucingnya premium! Dibungkus daun pisang jadi harum banget, sambal terinya pas pedasnya. Sate puyuh dibakar pakai kecap legi asli, mantap!"
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-geom-beige dark:bg-stone-800 text-geom-primary flex items-center justify-center font-black text-xs border border-geom-border">
                AN
              </div>
              <div>
                <h4 className="text-xs font-black text-geom-dark dark:text-stone-200">Adi Nugroho</h4>
                <p className="text-[10px] text-geom-brown-light dark:text-stone-500 font-medium">Pecinta Kuliner Tradisional</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E150C] p-5 rounded-2xl shadow-xs border border-geom-border dark:border-stone-850">
            <div className="flex items-center gap-1 text-geom-primary mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-geom-primary text-geom-primary" />
              ))}
            </div>
            <p className="text-xs text-geom-dark dark:text-stone-300 italic leading-relaxed">
              "Wedang jahe susu di sini beneran pake jahe bakar geprek asli, bukan bubuk instan. Ampas jahenya berasa berkhasiat. Gorengan mendoan tebal porsi puas."
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-geom-beige dark:bg-stone-800 text-geom-primary flex items-center justify-center font-black text-xs border border-geom-border">
                SR
              </div>
              <div>
                <h4 className="text-xs font-black text-geom-dark dark:text-stone-200">Siti Rahma</h4>
                <p className="text-[10px] text-geom-brown-light dark:text-stone-500 font-medium">Pelanggan Setia</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E150C] p-5 rounded-2xl shadow-xs border border-geom-border dark:border-stone-850">
            <div className="flex items-center gap-1 text-geom-primary mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-geom-primary text-geom-primary" />
              ))}
            </div>
            <p className="text-xs text-geom-dark dark:text-stone-300 italic leading-relaxed">
              "Pertama kali nemu angkringan dengan website selancar food delivery bintang lima. Gampang pesan, pesanan langsung masuk wa rapi rinciannya. Pasti langganan!"
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-geom-beige dark:bg-stone-800 text-geom-primary flex items-center justify-center font-black text-xs border border-geom-border">
                BP
              </div>
              <div>
                <h4 className="text-xs font-black text-geom-dark dark:text-stone-200">Bambang P.</h4>
                <p className="text-[10px] text-geom-brown-light dark:text-stone-500 font-medium">Pegawai Kantor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
