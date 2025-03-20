import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "@/components/BootstrapClient";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Marasem",
  description: "Marasem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
