import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('test', () => {
  render(<App />);
  const linkElement = screen.getByText(/albul-k/i);
  expect(linkElement).toBeInTheDocument();
});
