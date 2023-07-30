import React from 'react';
import { ReactDOM } from 'react';
import { render, cleanup, screen } from "@testing-library/react";
import CollatzConjecture from "./CollatzConjecture";

afterEach(cleanup)
    
it("Ensure that the title is present", () => {
    render(<CollatzConjecture />);
    screen.getByText('Collatz Conjecture');
    expect(screen.getByText('Collatz Conjecture')).toBeInTheDocument();
});

it("Text input present", () => {
    render(<CollatzConjecture />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
})

    