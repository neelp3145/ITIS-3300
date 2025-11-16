"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeout'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Mock cart items - replace with your actual cart data
  const cartItems: CartItem[] = [
    { id: '1', name: 'Classic Burger', price: 12.99, quantity: 2 },
    { id: '2', name: 'French Fries', price: 4.99, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const generateOrderNumber = () => {
    return `ORD-${Date.now()}`;
  };

  const handleCheckout = async () => {
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (orderType === 'dine-in' && !tableNumber.trim()) {
      alert('Please enter your table number');
      return;
    }

    setIsLoading(true);

    const orderData = {
      orderNumber: generateOrderNumber(),
      customerName: customerName.trim(),
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: total,
      orderType: orderType === 'takeout' ? 'pickup' : 'dine-in',
      estimatedPrepTime: 15, // Default 15 minutes
      status: 'pending',
      tableNumber: orderType === 'dine-in' ? parseInt(tableNumber) : undefined,
      kitchenNotes: specialInstructions.trim() || '',
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.ok) {
        alert(`Order placed successfully! Your order number is: ${orderData.orderNumber}`);
        // Clear cart and redirect
        router.push('/');
      } else {
        alert(`Failed to place order: ${result.message}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
        Checkout
      </h1>

      {/* Order Type Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Type</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="orderType"
              value="dine-in"
              checked={orderType === 'dine-in'}
              onChange={(e) => setOrderType(e.target.value as 'dine-in')}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span>Dine-In</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="orderType"
              value="takeout"
              checked={orderType === 'takeout'}
              onChange={(e) => setOrderType(e.target.value as 'takeout')}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span>Take-Out</span>
          </label>
        </div>
      </div>

      {/* Customer Information */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Customer Information</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Your Name *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
            required
          />
        </div>

        {orderType === 'dine-in' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Table Number *
            </label>
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter your table number"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
              required
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Special Instructions
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any special instructions for the kitchen..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Summary</h2>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.125rem' }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: '#ea580c',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.125rem',
          fontWeight: 'bold',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </button>

      {/* Order Note */}
      <div style={{ marginTop: '1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
        Your order will be sent directly to the kitchen and you can track its progress.
      </div>
    </div>
  );
}