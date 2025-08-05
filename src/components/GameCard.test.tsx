import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "@/components/GameCard";

jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

import { useCart } from "@/context/CartContext";

const fakeGame = {
  id: "1",
  name: "Test Game",
  description: "Desc",
  genre: "RPG",
  image: "test-image.png",
  price: 25,
  isNew: true,
};

describe("GameCard", () => {
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders game info and shows 'Add to cart' button when not in cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      isInCart: (id: string) => false,
      addToCart,
      removeFromCart,
    });

    render(<GameCard game={fakeGame} />);

    expect(screen.getByText(fakeGame.genre.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(fakeGame.name)).toBeInTheDocument();
    expect(screen.getByText(`$${fakeGame.price}`)).toBeInTheDocument();
    expect(screen.getByText(/Add to cart/i)).toBeInTheDocument();

    // New badge should show
    expect(screen.getByText(/New/i)).toBeInTheDocument();

    // Image alt attribute
    expect(screen.getByAltText(fakeGame.name)).toHaveAttribute("src", fakeGame.image);
  });

  it("renders 'Remove' button when game is in cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      isInCart: (id: string) => true,
      addToCart,
      removeFromCart,
    });

    render(<GameCard game={fakeGame} />);

    expect(screen.getByText(/Remove/i)).toBeInTheDocument();
  });

  it("calls addToCart when clicking button if game not in cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      isInCart: (id: string) => false,
      addToCart,
      removeFromCart,
    });

    render(<GameCard game={fakeGame} />);

    fireEvent.click(screen.getByRole("button"));

    expect(addToCart).toHaveBeenCalledWith(fakeGame);
    expect(removeFromCart).not.toHaveBeenCalled();
  });

  it("calls removeFromCart when clicking button if game is in cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      isInCart: (id: string) => true,
      addToCart,
      removeFromCart,
    });

    render(<GameCard game={fakeGame} />);

    fireEvent.click(screen.getByRole("button"));

    expect(removeFromCart).toHaveBeenCalledWith(fakeGame.id);
    expect(addToCart).not.toHaveBeenCalled();
  });
});
