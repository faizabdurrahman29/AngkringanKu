/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-geom-dark-dark rounded-3xl p-4 border border-geom-border shadow-xs animate-pulse flex flex-col gap-3">
      <div className="w-full aspect-[4/3] bg-geom-beige dark:bg-stone-800 rounded-lg" />
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-geom-beige dark:bg-stone-800 rounded-md w-1/3" />
        <div className="h-5 bg-geom-beige dark:bg-stone-800 rounded-md w-2/3" />
        <div className="h-3 bg-geom-beige dark:bg-stone-800 rounded-md w-full" />
        <div className="h-3 bg-geom-beige dark:bg-stone-800 rounded-md w-4/5" />
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-geom-border dark:border-stone-800/60">
        <div className="h-5 bg-geom-beige dark:bg-stone-800 rounded-md w-1/4" />
        <div className="h-8 bg-geom-beige dark:bg-stone-800 rounded-lg w-1/3" />
      </div>
    </div>
  );
};

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
};
