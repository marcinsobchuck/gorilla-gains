import {  render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe('renders a primary button by default', () => {
    it('renders a button with specified text', () => {
        render(<Button buttonType="button">Test</Button>);
        const button = screen.getByRole('button', { name: /test/i });
        expect(button).toBeInTheDocument();
    })
  });