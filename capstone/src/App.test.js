import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from './components/Body/BookingForm';


test('renders BookingForm component and handles form submission', async () => {
  const mockAvailableTimes = ['09:00', '10:00', '11:00']; // Mock available times
  const mockDispatch = jest.fn(); // Mock dispatch function

  const { getByLabelText, getByText, getByDisplayValue } = render(
    <BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} />
  );

  const dateInput = getByLabelText(/Choose date/i);
  fireEvent.change(dateInput, { target: { value: '2023-11-20' } });

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledTimes(1); // Ensure dispatch was called
  });

  const submitButton = getByText(/make your reservation/i);
  fireEvent.click(submitButton);

  // You might add more assertions based on form submission behavior
});

describe('BookingForm component', () => {
  it('does not change submitted state if number of guests is greater than 120', () => {
    // Simulated available times for the component
    const availableTimes = ['10:00 AM', '12:00 PM', '3:00 PM'];

    const { getByLabelText, queryByText } = render(
      <BookingForm availableTimes={availableTimes} />
    );

    const guestsInput = getByLabelText('Number of guests');
    fireEvent.change(guestsInput, { target: { value: '150' } });

    const submitButton = getByLabelText('On Click: Submit reservation');
    fireEvent.click(submitButton);

    // Check that the ConfirmedBooking component is not rendered
    expect(queryByText('ConfirmedBooking')).toBeNull();
  });
});