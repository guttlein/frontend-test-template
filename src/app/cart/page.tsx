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
        className="flex items-center text-base text-neutral-700 font-archivo font-medium hover:underline mb-6"
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
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((game) => (
              <div
                key={game.id}
                className="relative bg-white rounded-lg border p-4 flex flex-col sm:flex-row sm:items-start sm:gap-4"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(game.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm sm:static sm:ml-auto sm:self-start sm:mt-0 sm:order-3"
                >
                  ✕
                </button>

                {/* Game image */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-40 sm:w-28 sm:h-28 object-cover rounded mb-4 sm:mb-0"
                />

                {/* Info + price container */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start flex-1 w-full">
                  {/* Info */}
                  <div>
                    <p className="text-[10px] font-bold font-archivo text-gray-500 uppercase mb-1">
                      {game.genre}
                    </p>
                    <h2 className="text-sm font-bold font-archivo text-neutral-700">{game.name}</h2>
                    {game.description && (
                      <p className="text-sm font-normal font-archivo text-neutral-500 mt-1">
                        {game.description}
                      </p>
                    )}
                  </div>

                  {/* Price aligned right always */}
                  <div className="text-right mt-2 sm:mt-0">
                    <p className="text-sm font-bold font-archivo text-neutral-700">
                      ${game.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-auto">
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
