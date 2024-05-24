/**
 * scenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle body typing correctly
 *   - should handle category typing correctly
 *   - should display character count correctly
 *   - should call threadInput function when submit button is clicked
 */

import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('ThreadInput component', () => {
  it('should handle title typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <ThreadInput threadInput={() => {}} />
      </MemoryRouter>,
    );
    const titleInput = await screen.getByPlaceholderText('judul');

    // Action
    await userEvent.type(titleInput, 'Hello World!');

    // Assert
    expect(titleInput).toHaveValue('Hello World!');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <ThreadInput threadInput={() => {}} />
      </MemoryRouter>,
    );
    const bodyInput = await screen.getByPlaceholderText('tanyakan ?');

    // Action
    await userEvent.type(bodyInput, 'This is a test body');

    // Assert
    expect(bodyInput).toHaveValue('This is a test body');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <ThreadInput threadInput={() => {}} />
      </MemoryRouter>,
    );
    const categoryInput = await screen.getByPlaceholderText('category');

    // Action
    await userEvent.type(categoryInput, 'Test Category');

    // Assert
    expect(categoryInput).toHaveValue('Test Category');
  });

  it('should display character count correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <ThreadInput threadInput={() => {}} />
      </MemoryRouter>,
    );
    const bodyInput = await screen.getByPlaceholderText('tanyakan ?');
    const charCount = await screen.getByText(/\/320/);

    // Action
    await userEvent.type(bodyInput, 'This is a test body');

    // Assert
    expect(charCount).toHaveTextContent('19/320');
  });

  it('should call threadInput function when submit button is clicked', async () => {
    // Arrange
    const mockThreadInput = vi.fn();
    render(
      <MemoryRouter>
        <ThreadInput threadInput={mockThreadInput} />
      </MemoryRouter>,
    );
    const titleInput = await screen.getByPlaceholderText('judul');
    await userEvent.type(titleInput, 'Hello World!');
    const bodyInput = await screen.getByPlaceholderText('tanyakan ?');
    await userEvent.type(bodyInput, 'This is a test body');
    const categoryInput = await screen.getByPlaceholderText('category');
    await userEvent.type(categoryInput, 'Test Category');
    const submitButton = await screen.getByRole('button', { name: 'submit' });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockThreadInput).toBeCalledWith('Hello World!', 'This is a test body', 'Test Category');
  });
});
