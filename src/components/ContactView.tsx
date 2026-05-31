/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Instagram, Facebook, Globe, MessageSquare, Copy, Check } from 'lucide-react';

interface ContactViewProps {
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onShowToast }) => {
  const addressText = 'Jl. Kaliurang Km 5.6, Manggung, Caturtunggal, Depok, Sleman, Daerah Istimewa Yogyakarta 55281';
  const phoneText = '+62 812-3456-7890';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} berhasil disalin ke papan klip!`, 'success');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 pb-12 animate-fade-in" id="contact-workspace">
      {/* Left Block - General Details */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col font-display">
          <h3 className="font-black text-geom-dark dark:text-stone-100 text-xl tracking-tight uppercase">Hubungi & Kunjungi Kami</h3>
          <p className="text-xs text-geom-brown-light dark:text-stone-400 font-sans mt-0.5">Kami selalu siap melayani selera lezat malam Anda</p>
        </div>

        {/* Info detail cards row */}
        <div className="flex flex-col gap-4 font-display">
          {/* Location details card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-geom-dark-dark border border-geom-border shadow-xs flex gap-4">
            <div className="p-3 rounded-lg bg-geom-beige dark:bg-stone-850 text-geom-primary shrink-0 border border-geom-border">
              <MapPin className="w-5.5 h-5.5" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-[10px] text-geom-brown-light font-black tracking-widest uppercase">ALAMAT RESTORAN</p>
              <p className="text-xs text-geom-dark dark:text-stone-200 font-bold leading-relaxed font-sans">{addressText}</p>
              <button
                onClick={() => copyToClipboard(addressText, 'Alamat')}
                className="mt-2 text-[10px] text-geom-primary dark:text-orange-400 hover:text-geom-hover font-black flex items-center gap-1 cursor-pointer transition-colors w-fit border border-geom-border px-2 py-1.5 rounded-lg bg-geom-beige/40 uppercase tracking-widest hover:border-geom-primary"
                id="btn-copy-address"
              >
                <Copy className="w-3 h-3" /> Salin Alamat
              </button>
            </div>
          </div>

          {/* Opening info card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-geom-dark-dark border border-geom-border shadow-xs flex gap-4">
            <div className="p-3 rounded-lg bg-geom-beige dark:bg-stone-850 text-geom-primary shrink-0 border border-geom-border">
              <Clock className="w-5.5 h-5.5" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-[10px] text-geom-brown-light font-black tracking-widest uppercase">JAM OPERASIONAL</p>
              <p className="text-sm text-geom-dark dark:text-stone-100 font-black leading-relaxed">Setiap Hari: 16.00 - 02.00 WIB</p>
              <p className="text-[10px] text-geom-brown-light dark:text-stone-400 font-sans leading-relaxed mt-1">Kami menyambut makan malam & kumpul-kumpul santai Anda bersama cita rasa legendaris.</p>
            </div>
          </div>

          {/* Direct WA contact card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-geom-dark-dark border border-geom-border shadow-xs flex gap-4">
            <div className="p-3 rounded-lg bg-geom-beige dark:bg-stone-850 text-geom-primary shrink-0 border border-geom-border">
              <Phone className="w-5.5 h-5.5" />
            </div>
            <div className="flex-1 flex flex-col gap-1 col-span-3">
              <p className="text-[10px] text-geom-brown-light font-black tracking-widest uppercase">LAYANAN WHATSAPP</p>
              <p className="text-sm text-geom-dark dark:text-stone-100 font-black leading-normal">{phoneText}</p>
              <div className="flex gap-2.5 mt-2.5">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-black text-white flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer uppercase tracking-widest"
                  id="btn-link-wa-contact"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Chat Sekarang
                </a>
                <button
                  onClick={() => copyToClipboard(phoneText, 'Nomor HP')}
                  className="text-[10px] py-2 px-3 rounded-lg border border-geom-border dark:border-stone-800 font-black text-geom-dark dark:text-stone-300 hover:bg-geom-beige/35 transition-colors cursor-pointer uppercase tracking-widest"
                  id="btn-copy-contact"
                >
                  Salin Nomor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social connections */}
        <div className="flex flex-col gap-3 py-1 font-display">
          <h4 className="text-xs font-black text-geom-brown-light dark:text-stone-405 uppercase tracking-widest">Ikuti Kami Di Media Sosial</h4>
          <div className="flex gap-3" id="social-media-container">
            {[
              { label: '@angkringanku.id', href: 'https://instagram.com', bg: 'hover:bg-geom-beige/30 hover:text-geom-primary text-geom-brown-light dark:text-stone-350', hover: 'Instagram', icon: <Instagram className="w-5 h-5" /> },
              { label: 'Angkringanku Yogyakarta', href: 'https://facebook.com', bg: 'hover:bg-geom-beige/30 hover:text-geom-primary text-geom-brown-light dark:text-stone-350', hover: 'Facebook', icon: <Facebook className="w-5 h-5" /> },
              { label: 'angkringanku.com', href: 'https://angkringanku.com', bg: 'hover:bg-geom-beige/30 hover:text-geom-primary text-geom-brown-light dark:text-stone-350', hover: 'Website', icon: <Globe className="w-5 h-5" /> }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                title={soc.hover}
                className={`p-3 rounded-lg border border-geom-border dark:border-stone-800/80 bg-white dark:bg-geom-dark-dark/45 transition-all flex items-center justify-center cursor-pointer hover:border-geom-primary ${soc.bg}`}
                id={`social-link-${idx}`}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right Block - Map Card Embed */}
      <div className="w-full md:w-[350px] lg:w-[480px] shrink-0 flex flex-col gap-4">
        <h4 className="text-xs font-black text-geom-brown-light dark:text-stone-405 uppercase tracking-widest font-display">PETA LOKASI RESTORAN</h4>
        <div className="relative rounded-3xl overflow-hidden bg-geom-beige/25 border border-geom-border shadow-xs h-80 sm:h-96 md:h-full">
          {/* Mock Interactive Interactive Map with customizable layout details */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15813.111976535565!2d110.38021008715822!3d-7.760311799999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59afc70c175f%3A0xc6cb51eaeffa58!2sUniversitas%20Gadjah%20Mada!5e0!3m2!1sid!2sid!4v1780000000000!5m2!1sid!2sid"
            className="absolute inset-0 w-full h-full border-0 filter dark:invert dark:hue-rotate-180"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Angkringanku Kaliurang Yogyakarta"
          />
        </div>
      </div>
    </div>
  );
};
