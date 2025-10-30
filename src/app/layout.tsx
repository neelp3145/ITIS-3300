"use client";

import { Provider } from "@/components/ui/provider";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext"; // Import the CartProvider

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <CartProvider> {/* Wrap with CartProvider */}
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}