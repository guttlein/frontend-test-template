const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "/api/games";

export const getGames = async (genre: string, page: number) => {
  const url = new URL(BASE_URL, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

  if (genre) url.searchParams.append("genre", genre);
  url.searchParams.append("page", String(page));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch games");

  return res.json();
};
