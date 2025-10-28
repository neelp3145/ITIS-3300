import React, { createContext, useContext, useEffect, useState } from 'react';

type CartContextType = {
    cartItems: any[];
    addItem: (item: any) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // useEffect to load cart from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const items = window.localStorage.getItem('cart');
            setCartItems(items ? JSON.parse(items) : []);
        } catch (e) {
            console.error('Failed to parse cart from localStorage', e);
            setCartItems([]);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // useEffect to save cart to localStorage on change
    useEffect(() => {
        if (!isLoaded || typeof window === 'undefined') return;
        window.localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems, isLoaded]);

    const addItem = (item: any) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
