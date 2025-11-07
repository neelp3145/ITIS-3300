import { Provider } from "@/components/ui/provider";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext";
import SessionProvider from "@/components/providers/SessionProvider";
import { auth } from "@/app/api/auth/[...nextauth]/route";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {

  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
            </CartProvider>
        </Provider>
      </body>
    </html>
  );
}