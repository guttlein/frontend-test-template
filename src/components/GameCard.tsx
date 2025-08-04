"use client";

import { Game } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";

type Props = {
  game: Game;
};

export default function GameCard({ game }: Props) {
  const { isInCart, addToCart, removeFromCart } = useCart();

  const handleClick = () => {
    isInCart(game.id) ? removeFromCart(game.id) : addToCart(game);
  };

  return (
    <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
      {/* Image and New badge */}
      <div className="p-4 h-40 overflow-hidden relative">
        {game.isNew && (
          <span className="absolute top-6 left-6 bg-stone-100 text-black text-[10px] px-2 py-1 rounded font-archivo">
            New
          </span>
        )}
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Game info */}
      <div className="p-4">
        <p className="text-base font-bold font-archivo text-gray-500 uppercase">{game.genre}</p>

        <div className="flex justify-between items-center mt-1">
          <h3 className="text-sm font-bold font-archivo text-neutral-700">{game.name}</h3>
          <p className="text-sm font-bold font-archivo text-neutral-700">${game.price}</p>
        </div>

        {/* Add/Remove cart */}
        <button
          onClick={handleClick}
          className="mt-4 w-full border border-neutral-700 text-neutral-700 text-base font-bold font-archivo py-2 rounded hover:bg-gray-100 transition uppercase"
        >
          {isInCart(game.id) ? "Remove" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
