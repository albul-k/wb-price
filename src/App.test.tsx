import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';


test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('footer loads', () => {
  render(<App />);
  const linkElement = screen.getByText(/albul-k/i);
  expect(linkElement).toBeInTheDocument();
});