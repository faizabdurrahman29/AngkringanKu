/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- KATEGORI: NASI ---
  {
    id: 'nasi-1',
    name: 'Nasi Kucing Sambal Teri',
    category: 'Nasi',
    description: 'Nasi porsi kecil dibungkus daun pisang dengan lauk sambal teri gurih & kering tempe manis.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'nasi-2',
    name: 'Nasi Kucing Sambal Bandeng',
    category: 'Nasi',
    description: 'Nasi hangat dibungkus daun pisang dengan suwiran ikan bandeng goreng dan bumbu sambal matang pedas sedap.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'nasi-3',
    name: 'Nasi Kucing Rica Rica Ayam',
    category: 'Nasi',
    description: 'Nasi dibungkus daun pisang berisikan tumisan ayam rica pedas bumbu kuning beraroma kemangi segar.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },

  // --- KATEGORI: SATE-SATEAN ---
  {
    id: 'sate-1',
    name: 'Sate Telur Puyuh Bacem',
    category: 'Sate-satean',
    description: 'Sate telur puyuh rasa manis gurih khas bumbu bacem tradisional Jawa, dibakar harum.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'sate-2',
    name: 'Sate Usus Ayam Goreng/Bakar',
    category: 'Sate-satean',
    description: 'Sate usus ayam bumbu kuning gurih yang digoreng garing atau dipanggang manis legit.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'sate-3',
    name: 'Sate Kulit Ayam Bumbu Kecap',
    category: 'Sate-satean',
    description: 'Sate kulit ayam kenyal dan gurih dengan baluran bumbu kecap manis karamelisasi saat dibakar.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'sate-4',
    name: 'Sate Kikil Pedas Manis',
    category: 'Sate-satean',
    description: 'Sate kenyal dari kikil sapi pilihan, dibumbui pedas manis meresap sempurna.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    isAvailable: true
  },

  // --- KATEGORI: GORENGAN ---
  {
    id: 'gorengan-1',
    name: 'Tempe Mendoan Hangat',
    category: 'Gorengan',
    description: 'Tempe lebar berselimut adonan tepung ketumbar & irisan daun bawang, digoreng setengah matang (mendo).',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'gorengan-2',
    name: 'Bakwan Sayur Garing',
    category: 'Gorengan',
    description: 'Bakwan sayuran (wortel, kubis, kecambah) bertekstur krispi di luar, lembut di dalam, lengkap cabe rawit.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'gorengan-3',
    name: 'Tahu Isi Sayuran Korek',
    category: 'Gorengan',
    description: 'Tahu pong goreng berisi tumisan sayuran gurih pedas, digoreng renyah dengan tepung gurih.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'gorengan-4',
    name: 'Bakwan Jagung Manis',
    category: 'Gorengan',
    description: 'Fritter jagung manis pipil segar bercampur bumbu rempah aromatik, digoreng kuning keemasan.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    isAvailable: true
  },

  // --- KATEGORI: MIE ---
  {
    id: 'mie-1',
    name: 'Mie Goreng Jawa Bakar',
    category: 'Mie',
    description: 'Mie kuning goreng bumbu kecap manis otentik dengan telur orak-arik, disajikan hangat beralas daun pisang.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'mie-2',
    name: 'Mie Nyemek Getar',
    category: 'Mie',
    description: 'Mie instan / kuning yang dimasak setengah basah (nyemek) dengan bumbu ulekan bawang, cabai, telur, kol, tomat.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },

  // --- KATEGORI: MINUMAN ---
  {
    id: 'minuman-1',
    name: 'Wedang Jahe Susu Geprek',
    category: 'Minuman',
    description: 'Minuman jahe merah bakar geprek asli disiram air panas mendidih dan susu kental manis, sangat menghangatkan.',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'minuman-2',
    name: 'Kopi Joss Arang Membara',
    category: 'Minuman',
    description: 'Kopi hitam manis tubruk khas Yogyakarta yang disajikan unik dengan celupan arang kayu membara alami.',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'minuman-3',
    name: 'Wedang Uwuh Khas Imogiri',
    category: 'Minuman',
    description: 'Minuman kaya rempah berkhasiat (secang, pala, cengkeh, jahe, kayu manis) berwarna merah segar manis gula batu.',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'minuman-4',
    name: 'Es Teh Manis Jumbo',
    category: 'Minuman',
    description: 'Teh melati seduhan kental khas angkringan yang manis legit dengan es batu melimpah di gelas ukuran besar.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80',
    isPopular: false,
    isAvailable: true
  }
];
