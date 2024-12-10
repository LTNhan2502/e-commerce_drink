import type { Metadata } from "next";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Header from "@/components/layout/client.header";
import {CartProvider} from "@/library/cart.context";

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
        <html lang="en">
          <body>
              <Header/>
              <div className="container">
                {children}
              </div>

              <ToastContainer
                  position="top-right"
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
      </CartProvider>
  );
}
