'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getGames } from '@/services/gameService';
import GameCard from '@/components/GameCard';

type Game = {
  id: string;
  name: string;
  description: string;
  genre: string;
  image: string;
  price: number;
  isNew: boolean;
};

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const genreParam = searchParams.get('genre') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const data = await getGames(genreParam, pageParam);
        setGames((prev) =>
          pageParam === 1 ? data.games : [...prev, ...data.games]
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [genreParam, pageParam]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    router.push(`/?genre=${encodeURIComponent(selectedGenre)}&page=1`);
  };

  const handleSeeMore = () => {
    router.push(
      `/?genre=${encodeURIComponent(genreParam)}&page=${pageParam + 1}`
    );
  };

  return (
    <>
      <div className="w-full border-b px-4">
        <div className="max-w-6xl mx-auto flex flex-col mt-4 mb-4 gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="pl-2 sm:pl-6">
            <h1 className="text-2xl font-bold neutral-700 font-archivo">
              Top Sellers
            </h1>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2 text-sm px-2 sm:px-8">
            <span className="text-gray-600 font-bold text-xs font-archivo">
              Genre
            </span>
            <span className="h-4 w-px bg-gray-300"></span>
            <select
              value={genreParam}
              onChange={handleGenreChange}
              className="border-0 rounded px-2 py-1 text-xs font-normal font-archivo w-full sm:w-auto"
            >
              <option value="">All</option>
              <option value="Battle Royale">Battle Royale</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
            </select>
          </div>
        </div>
      </div>

      <main className="p-4 max-w-6xl mx-auto">
        {loading && <p className="text-center">Loading games...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {!loading && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSeeMore}
              className="bg-zinc-600 w-full sm:w-auto text-white font-bold font-archivo px-4 py-2 rounded hover:bg-zinc-700 transition"
            >
              See more
            </button>
          </div>
        )}
      </main>
    </>
  );
}
