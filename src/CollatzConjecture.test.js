import React from 'react';
import { ReactDOM } from 'react';
import { render, cleanup, screen } from "@testing-library/react";
import CollatzConjecture from "./CollatzConjecture";

afterEach(cleanup)
    
it("Ensure that the main items are present", () => {
    render(<CollatzConjecture />);
    screen.getByText('Collatz Conjecture');
    expect(screen.getByText('Collatz Conjecture')).toBeInTheDocument();
    
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    
    expect(screen.getByRole('button', {name: "Plot"})).toBeInTheDocument();
    
    expect(screen.getByRole('button', {name: "Clear"})).toBeInTheDocument();
});


