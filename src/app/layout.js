import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
  title: "Marasem App",
  description: "Marasem App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
