import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "GameStore",
  description: "Frontend test – Game catalog with cart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-archivo">
        <CartProvider>
          {/* Header */}
          <Header />
          {/* Main Content */}
          <main className="flex-1">{children}</main>
          {/* Footer */}
          <footer className="border-t py-4 text-center text-sm text-white bg-neutral-700">
            <a
              href="/"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src="/assets/Apply-Digital-Logo.svg"
                alt="Apply Digital logo"
                className="mx-auto h-6"
              />
            </a>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
