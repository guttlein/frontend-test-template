import { getGames } from './gameService';

describe('getGames', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    global.fetch = originalFetch;
  });

  it('calls fetch with correct URL including genre and page', async () => {
    const mockResponse = {
      games: [{ id: '1', name: 'Game 1' }],
      total: 1,
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const genre = 'RPG';
    const page = 2;

    const data = await getGames(genre, page);

    const expectedUrl = new URL(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/games');
    expectedUrl.searchParams.append('genre', genre);
    expectedUrl.searchParams.append('page', String(page));

    expect(fetch).toHaveBeenCalledWith(expectedUrl.toString());
    expect(data).toEqual(mockResponse);
  });

  it('calls fetch with correct URL without genre', async () => {
    const mockResponse = { games: [], total: 0 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const genre = '';
    const page = 1;

    const data = await getGames(genre, page);

    const expectedUrl = new URL(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/games');
    expectedUrl.searchParams.append('page', String(page));

    expect(fetch).toHaveBeenCalledWith(expectedUrl.toString());
    expect(data).toEqual(mockResponse);
  });

  it('throws error if fetch response not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getGames('', 1)).rejects.toThrow('Failed to fetch games');
  });
});
