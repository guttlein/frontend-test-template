/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '@/app/cart/page';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useCart
jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('CartPage', () => {
  const mockPush = jest.fn();
  const mockRemoveFromCart = jest.fn();

  const mockGame = {
    id: 1,
    name: 'Test Game',
    genre: 'Action',
    description: 'A cool action game',
    price: 19.99,
    image: 'https://example.com/image.jpg',
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useCart as jest.Mock).mockReturnValue({
      cartItems: [mockGame],
      removeFromCart: mockRemoveFromCart,
      getTotal: () => 19.99,
      itemCount: 1,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart items correctly', () => {
    render(<CartPage />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getAllByText('1 item')[0]).toBeInTheDocument();
    expect(screen.getAllByText(mockGame.name)[0]).toBeInTheDocument();
    expect(screen.getAllByText(`$${mockGame.price}`)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Order Total')[0]).toBeInTheDocument();
  });

  it('calls router.push when clicking back button', () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText('Back to Catalog'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('calls removeFromCart when clicking ✕', () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText('✕'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockGame.id);
  });

  it('displays empty cart message when cart is empty', () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      removeFromCart: jest.fn(),
      getTotal: () => 0,
      itemCount: 0,
    });

    render(<CartPage />);
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });
});
