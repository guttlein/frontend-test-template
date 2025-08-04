"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, getTotal, itemCount } = useCart();

  const router = useRouter();

  return (
    <main className="px-4 py-8 max-w-6xl mx-auto">
      {/* Back to catalog */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center text-base text-neutral-700 font-archivo font-medium  hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Catalog
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold font-archivo text-neutral-700 mb-1">Your Cart</h1>
      <p className="text-xl font-normal font-archivo text-neutral-700 mb-6">
        {itemCount} item{itemCount !== 1 && "s"}
      </p>

      {cartItems.length === 0 ? (
        <p className="text-neutral-700 font-bold text-2xl font-archivo">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="md:col-span-2 divide-y divide-gray-200">
            {cartItems.map((game, index) => (
              <div
                key={game.id}
                className={`flex items-start justify-between gap-4 py-4 relative ${
                  index === 0 ? "" : "pt-4"
                }`}
              >
                {game.isNew && (
                  <span className="absolute top-6 left-6 bg-stone-100 text-black text-[10px] px-2 py-1 rounded font-archivo">
                    New
                  </span>
                )}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-28 h-28 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="text-base font-bold font-archivo text-gray-500 uppercase mb-1">
                    {game.genre}
                  </p>
                  <h2 className="text-sm font-bold font-archivo text-neutral-700">
                    {game.name}
                  </h2>
                  {game.description && (
                    <p className="text-sm font-normal font-archivo text-neutral-500 mt-1">
                      {game.description}
                    </p>
                  )}
                  <p className="text-sm font-bold font-archivo text-neutral-700 mt-2 text-right">
                    ${game.price}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <button
                    onClick={() => removeFromCart(game.id)}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg border h-fit">
              <h3 className="text-xl font-bold font-archivo text-neutral-700 mb-2">Order Summary</h3>
              <p className="text-lg text-neutral-700 font-archivo font-normal mb-4">
                {itemCount} item{itemCount !== 1 && "s"}
              </p>

              <div className="space-y-2 text-sm">
                {cartItems.map((game) => (
                  <div
                    key={game.id}
                    className="flex justify-between text-neutral-700 font-normal font-archivo text-lg"
                  >
                    <span>{game.name}</span>
                    <span>${game.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-xl font-archivo text-neutral-700">
                <span>Order Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="mt-4 w-full bg-neutral-600 text-white py-2 rounded hover:bg-neutral-700 transition font-archivo font-bold text-base"
              disabled
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
