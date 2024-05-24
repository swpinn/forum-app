/**
 * scenario testing
 *
 * - CommentInput component
 *   - should handle text typing correctly
 *   - should display character count correctly
 *   - should call commentThread function when comment button is clicked
 */

import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInput component', () => {
  it('should handle text typing correctly', async () => {
    // Arrange
    render(<CommentInput commentThread={() => {}} />);
    const textarea = await screen.getByPlaceholderText('Berikan Komentarmu');

    // Action
    await userEvent.type(textarea, 'Hello World!');

    // Assert
    expect(textarea).toHaveValue('Hello World!');
  });

  it('should display character count correctly', async () => {
    // Arrange
    render(<CommentInput commentThread={() => {}} />);
    const textarea = await screen.getByPlaceholderText('Berikan Komentarmu');
    const charCount = await screen.getByText(/\/320/);

    // Action
    await userEvent.type(textarea, 'Hello World!');

    // Assert
    expect(charCount).toHaveTextContent('12/320');
  });

  it('should call commentThread function when comment button is clicked', async () => {
    // Arrange
    const mockCommentThread = vi.fn();
    render(<CommentInput commentThread={mockCommentThread} />);
    const textarea = await screen.getByPlaceholderText('Berikan Komentarmu');
    await userEvent.type(textarea, 'Hello World!');
    const commentButton = await screen.getByRole('button', { name: 'comment' });

    // Action
    await userEvent.click(commentButton);

    // Assert
    expect(mockCommentThread).toBeCalledWith('Hello World!');
  });
});
