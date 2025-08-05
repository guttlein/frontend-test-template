import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart, Game } from "./CartContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const fakeGame: Game = {
  id: "1",
  name: "Test Game",
  description: "Desc",
  genre: "RPG",
  image: "img.png",
  price: 30,
  isNew: false,
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with empty cart if no localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.itemCount).toBe(0);
  });

  it("loads initial cart from localStorage", () => {
    localStorage.setItem("cartItems", JSON.stringify([fakeGame]));
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe(fakeGame.id);
  });

  it("addToCart adds a game", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(fakeGame);
    });

    expect(result.current.cartItems).toContainEqual(fakeGame);
    expect(result.current.itemCount).toBe(1);
  });

  it("removeFromCart removes a game", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(fakeGame);
    });
    act(() => {
      result.current.removeFromCart(fakeGame.id);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it("isInCart returns correct boolean", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(fakeGame);
    });

    expect(result.current.isInCart(fakeGame.id)).toBe(true);
    expect(result.current.isInCart("no-existe")).toBe(false);
  });

  it("getTotal returns sum of prices", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(fakeGame);
      result.current.addToCart({ ...fakeGame, id: "2", price: 20 });
    });

    expect(result.current.getTotal()).toBe(50);
  });

  it("syncs cartItems to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(fakeGame);
    });

    const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
    expect(stored).toContainEqual(fakeGame);
  });
});
