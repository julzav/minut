import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Page from '@/app/page';

describe('Landing page', () => {
  it('renders the hero heading', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent('Video meetings with AI-powered minutes');
  });

  it('join button is disabled when meeting code is empty', () => {
    render(<Page />);
    expect(screen.getByRole('button', { name: 'Join' })).toBeDisabled();
  });

  it('join button enables when a meeting code is typed', async () => {
    const user = userEvent.setup();
    render(<Page />);
    await user.type(screen.getByPlaceholderText('Enter meeting code'), 'abc-defg-hij');
    expect(screen.getByRole('button', { name: 'Join' })).toBeEnabled();
  });

  it('clears join button when input is whitespace only', async () => {
    const user = userEvent.setup();
    render(<Page />);
    await user.type(screen.getByPlaceholderText('Enter meeting code'), '   ');
    expect(screen.getByRole('button', { name: 'Join' })).toBeDisabled();
  });
});
