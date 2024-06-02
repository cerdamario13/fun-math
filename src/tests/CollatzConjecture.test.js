import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import CollatzConjecture from "./CollatzConjecture";

// afterEach(cleanup)
    
// test("Ensure that the main items are present", () => {
//   render(<CollatzConjecture />);
//   screen.getByText('Collatz Conjecture');
//   expect(screen.getByText('Collatz Conjecture')).toBeInTheDocument();
  
//   expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  
//   expect(screen.getByRole('button', {name: "Plot"})).toBeInTheDocument();
  
//   expect(screen.getByRole('button', {name: "Clear"})).toBeInTheDocument();
// });


test('presses the button', async () => {
  
  //Arrange
  render(<CollatzConjecture />)
    
  //Act
  userEvent.type(screen.getByRole('spinbutton'), '27');
  userEvent.click(screen.getByRole('button', {name: "Plot"}));
  // const operationsValue = screen.getByText(/operations:/i);
  

  // Assert
  expect(screen.getByRole('spinbutton')).toHaveValue(27);

})