/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastItemProps {
  toast: ToastMessage;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getStyleAndIcon = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
          icon: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        };
      case 'error':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/90 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200',
          icon: <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/90 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
          icon: <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
        };
    }
  };

  const config = getStyleAndIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-lg ${config.bg} backdrop-blur-md`}
      id={`toast-${toast.id}`}
    >
      {config.icon}
      <div className="flex-1 text-sm font-medium leading-normal">{toast.message}</div>
      <button
        onClick={onClose}
        className="p-0.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0 text-gray-500 dark:text-gray-400"
        id={`close-toast-${toast.id}`}
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
