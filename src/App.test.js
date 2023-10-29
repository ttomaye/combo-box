import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  test('renders Tommy Combo Box heading', () => {
    render(<App />);
    const heading = screen.getByText(/Tommy Combo Box/i);
    expect(heading).toBeInTheDocument();
  });

  test('closes dropdown with escape key', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Choose a Fruit.../i);
    userEvent.click(input);

    userEvent.type(input, '{escape}');
    const dropdown = screen.queryByRole('listbox');
    expect(dropdown).not.toBeInTheDocument();
  });
});
