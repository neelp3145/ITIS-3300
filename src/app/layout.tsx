"use client";

import { Provider } from "@/components/ui/provider";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { CartProvider } from "@/features/orders/CartProvider";
import { ReactNode } from "react";

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <CartProvider>
          <Provider>
            <Header />
            {children}
            <Footer />
          </Provider>
        </CartProvider>
      </body>
    </html>
  );
}
