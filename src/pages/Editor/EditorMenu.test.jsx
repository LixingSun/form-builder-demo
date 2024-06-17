import EditorMenu from './EditorMenu';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  FIELD_TYPES,
  FIELD_TYPE_NAME_MAPPING,
} from '@/constants/fieldConstants';
import { expect, vi } from 'vitest';
import {
  SchemaDispatchContext,
  ACTION_TYPE_ADD_FIELD,
} from '@/context/SchemaContext';

describe('EditorMenu', () => {
  test('should render menu title', () => {
    render(<EditorMenu />);

    const menuTitleElement = screen.getByText('Create Field');
    expect(menuTitleElement).toBeInTheDocument();
  });

  test('should open text field creation dialog when text field menu item is clicked', () => {
    render(<EditorMenu />);

    const menuItem = screen
      .getByTestId('text-field-menu-item')
      .querySelector('button');
    fireEvent.click(menuItem);

    const dialogTitleElement = screen.getByText(
      `Create Field - ${FIELD_TYPE_NAME_MAPPING[FIELD_TYPES.textField]}`
    );
    expect(dialogTitleElement).toBeInTheDocument();
  });

  test('should close dialog when close callback is triggered', async () => {
    render(<EditorMenu />);

    const menuItem = screen
      .getByTestId('text-field-menu-item')
      .querySelector('button');
    fireEvent.click(menuItem);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    await waitFor(() => {
      const dialogTitleElement = screen.queryByText(
        `Create Field - ${FIELD_TYPE_NAME_MAPPING[FIELD_TYPES.textField]}`
      );
      expect(dialogTitleElement).not.toBeInTheDocument();
    });
  });

  test('should trigger submisson and close dialog when submit callback is triggered', async () => {
    const mockDispatch = vi.fn();
    render(
      <SchemaDispatchContext.Provider value={mockDispatch}>
        <EditorMenu />
      </SchemaDispatchContext.Provider>
    );

    const menuItem = screen
      .getByTestId('text-field-menu-item')
      .querySelector('button');
    fireEvent.click(menuItem);

    const mockTitle = 'Title';
    const titleConfigInput = screen
      .getByTestId('field-dialog')
      .querySelector('input[name=title]');
    fireEvent.change(titleConfigInput, { target: { value: mockTitle } });
    fireEvent.blur(titleConfigInput);

    const submitButton = screen.getByText('Create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const dialogTitleElement = screen.queryByText(
        `Create Field - ${FIELD_TYPE_NAME_MAPPING[FIELD_TYPES.textField]}`
      );
      expect(dialogTitleElement).not.toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: ACTION_TYPE_ADD_FIELD })
      );
    });
  });
});
