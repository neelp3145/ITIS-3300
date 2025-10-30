"use client";

import React from 'react';
import { useCart } from '@/contexts/CartContext';

export const Cart: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    clearCart
  } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  if (items.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Your cart is empty</h3>
        <p>Add some delicious items from our menu!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Shopping Cart</h2>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: '#ff6b35',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Cart
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px 0',
              borderBottom: '1px solid #eee'
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
              <p style={{ margin: 0, color: '#ff6b35', fontWeight: 'bold' }}>
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer'
                }}
              >
                -
              </button>

              <span style={{ minWidth: '30px', textAlign: 'center' }}>
                {item.quantity}
              </span>

              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer'
                }}
              >
                +
              </button>

              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  marginLeft: '10px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '2px solid #ff6b35', paddingTop: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>

        <button
          style={{
            backgroundColor: '#ff6b35',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '15px'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};