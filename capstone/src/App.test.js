import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from './components/Body/BookingForm';
import Main from './components/Main';

test('renders Main component with routes', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Main />
    </MemoryRouter>
  );

  const homePageText = getByText(/Welcome to the Homepage/i);
  expect(homePageText).toBeInTheDocument();
});

test('renders BookingForm component and handles form submission', async () => {
  const mockAvailableTimes = ['09:00', '10:00', '11:00']; // Mock available times
  const mockDispatch = jest.fn(); // Mock dispatch function

  const { getByLabelText, getByText, getByDisplayValue } = render(
    <BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} />
  );

  const dateInput = getByLabelText(/choose date/i);
  fireEvent.change(dateInput, { target: { value: '2023-11-20' } });

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledTimes(1); // Ensure dispatch was called
  });

  const submitButton = getByText(/make your reservation/i);
  fireEvent.click(submitButton);

  // You might add more assertions based on form submission behavior
});