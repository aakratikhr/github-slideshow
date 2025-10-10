import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Task Manager heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Task Manager/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders add task form', () => {
  render(<App />);
  const titleInput = screen.getByPlaceholderText(/Task Title/i);
  expect(titleInput).toBeInTheDocument();
});
