import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from "./App";
import BookingForm from "./components/Body/BookingForm";

test('Renders the Header heading', () => {
  const mockTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  render(<BookingForm availableTimes={mockTimes} />);
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
})

test('Options in select should match initializeTimes', () => {
  // Define a mock set of times to pass as props to BookingForm
  const mockTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

  // Render the BookingForm component with the mock times as props
  const { getByLabelText } = render(<BookingForm availableTimes={mockTimes} />);

  // Find the select element by its label text
  const selectElement = getByLabelText('Choose time');

  // Find all the options within the select element
  const options = Array.from(selectElement.querySelectorAll('option'));

  // Extract the values of the options
  const optionValues = options.map(option => option.value);

  // Compare the option values with the mockTimes
  expect(optionValues).toEqual(mockTimes);
});

test("Check if availableTimes is equal to updateTimes", () => {
  // Mock the dispatch function
  const mockDispatch = jest.fn();

  // Render the BookingForm component with the necessary props
  render(
    <BookingForm
      availableTimes={["19:00", "20:00", "21:00", "22:00"]}
      dispatch={mockDispatch}
    />
  );

  // Find the date input field and select a date
  const dateInput = screen.getByLabelText("Choose date");
  fireEvent.change(dateInput, { target: { value: "2023-10-15" } });

  // Get the select element for choosing time
  const timeSelect = screen.getByLabelText("Choose time");

  // Check if the options in the select element match the expected availableTimes
  const options = Array.from(timeSelect.options).map((option) => option.value);
  const expectedTimes = ["19:00", "20:00", "21:00", "22:00"];
  expect(options).toEqual(expectedTimes);

  // Ensure that the dispatch function was called with the selected date
  expect(mockDispatch).toHaveBeenCalledWith("2023-10-15");
});