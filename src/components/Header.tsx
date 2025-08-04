'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="w-full border-b bg-zinc-100 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-zinc-600">
          GamerShop
        </Link>

        {/* Cart icon */}
        <Link
          href="/cart"
          className="relative rounded p-2 transition hover:bg-gray-100"
          aria-label="Go to cart"
        >
          <ShoppingCart className="h-6 w-6" />
          {/* Badge item count */}
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.1rem] items-center justify-center rounded-full bg-red-600 text-[11px] font-bold leading-none text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
