/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CatalogPage from "@/app/page";
import * as gameService from "@/services/gameService";
import * as nextNavigation from "next/navigation";
import { CartProvider } from "@/context/CartContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/services/gameService");

describe("CatalogPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        if (key === "genre") return "";
        if (key === "page") return "1";
        return null;
      },
    });
  });

  it("renders loading state and games, and handles genre change and see more", async () => {
    const fakeGames = [
      {
        id: "1",
        name: "Game 1",
        description: "Desc 1",
        genre: "RPG",
        image: "img1.png",
        price: 10,
        isNew: true,
      },
      {
        id: "2",
        name: "Game 2",
        description: "Desc 2",
        genre: "Shooter",
        image: "img2.png",
        price: 20,
        isNew: false,
      },
    ];

    (gameService.getGames as jest.Mock).mockResolvedValue({
      games: fakeGames,
    });

    await waitFor(() => {
      render(
        <CartProvider>
          <CatalogPage />
        </CartProvider>
      );
    });

    await waitFor(() => {
      expect(gameService.getGames).toHaveBeenCalledWith("", 1);
      expect(screen.getByText("Game 1")).toBeInTheDocument();
      expect(screen.getByText("Game 2")).toBeInTheDocument();
    });

    // Test genre select change triggers router.push with correct params
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "RPG" } });
    expect(mockPush).toHaveBeenCalledWith("/?genre=RPG&page=1");

    // Test clicking "See more" triggers router.push with incremented page
    fireEvent.click(screen.getByRole("button", { name: /see more/i }));
    expect(mockPush).toHaveBeenCalledWith("/?genre=&page=2");
  });

  it("handles errors gracefully", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (gameService.getGames as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    render(
      <CartProvider>
        <CatalogPage />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading games/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(gameService.getGames).toHaveBeenCalled();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    await waitFor(() => {
      expect(screen.queryByText(/loading games/i)).not.toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });
});
