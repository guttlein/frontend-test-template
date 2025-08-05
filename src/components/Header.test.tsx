import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

import { useCart } from "@/context/CartContext";

describe("Header", () => {
  it("renders logo and cart link", () => {
    (useCart as jest.Mock).mockReturnValue({ itemCount: 0 });

    render(<Header />);

    // Logo link
    const logoLink = screen.getByRole("link", { name: /gamershop/i });
    expect(logoLink).toHaveAttribute("href", "/");

    // Cart link
    const cartLink = screen.getByRole("link", { name: /go to cart/i });
    expect(cartLink).toHaveAttribute("href", "/cart");

    // Badge should NOT be in document
    const badge = screen.queryByText("0");
    expect(badge).not.toBeInTheDocument();
  });

  it("shows badge with correct itemCount when > 0", () => {
    (useCart as jest.Mock).mockReturnValue({ itemCount: 5 });

    render(<Header />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
