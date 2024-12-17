import type { Metadata } from "next";
import {ToastContainer} from "react-toastify";
import Header from "@/components/layout/client.header";
import {CartProvider} from "@/library/cart.context";
import {CurrencyWrapper} from "@/library/currency.context";
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
  title: "Trà sữa An Tea",
  description: "Trà sữa An Tea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <CartProvider>
          <CurrencyWrapper>
            <html lang="en">
              <body>
                  <Header/>
                  <div className="container scrollbar-custom">
                    {children}
                  </div>

                  <ToastContainer
                      position="top-center"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                  />
              </body>
            </html>
          </CurrencyWrapper>
      </CartProvider>
  );
}
