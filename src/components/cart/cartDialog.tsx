"use client";

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Cart } from './cart';

export const CartDialog: React.FC = () => {
  const { isOpen, setIsOpen, getTotalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        overflowY: 'auto'
      }}
    >
      <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>
            Cart ({getTotalItems()})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>
      </div>

      <Cart />
    </div>
  );
};