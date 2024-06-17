import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import FieldDialog from './FieldDialog';
import { FIELD_TYPES } from '@/constants/fieldConstants';

const mockDisplayName = 'Display Name';
const mockUuid = 'mock-uuid-value';
vi.mock('uuid', () => {
  return {
    v4: vi.fn(() => mockUuid),
  };
});

describe('FieldDialog', () => {
  test('should show modal when it is open', () => {
    render(
      <FieldDialog
        open={true}
        fieldType={FIELD_TYPES.textField}
        fieldDisplayName={mockDisplayName}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    );
    const element = screen.getByText(`Create Field - ${mockDisplayName}`);
    expect(element).toBeInTheDocument();
  });

  test('should not show modal when it is closed', () => {
    render(
      <FieldDialog
        open={false}
        fieldType={FIELD_TYPES.textField}
        fieldDisplayName={mockDisplayName}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    );
    const element = screen.queryByText(`Create Field - ${mockDisplayName}`);
    expect(element).not.toBeInTheDocument();
  });

  test('should trigger onClose when cancel button is clicked', () => {
    const mockOnCloseCallback = vi.fn();
    render(
      <FieldDialog
        open={true}
        fieldType={FIELD_TYPES.textField}
        fieldDisplayName={mockDisplayName}
        onClose={mockOnCloseCallback}
        onSubmit={() => {}}
      />
    );

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);
    expect(mockOnCloseCallback).toHaveBeenCalled();
  });

  test('should trigger onSubmit when submit button is clicked', () => {
    const mockOnSubmitCallback = vi.fn();
    render(
      <FieldDialog
        open={true}
        fieldType={FIELD_TYPES.textField}
        fieldDisplayName={mockDisplayName}
        onClose={() => {}}
        onSubmit={mockOnSubmitCallback}
      />
    );

    const mockTitle = 'Title';
    const titleConfigInput = screen
      .getByTestId('field-dialog')
      .querySelector('input[name=title]');
    fireEvent.change(titleConfigInput, { target: { value: mockTitle } });
    fireEvent.blur(titleConfigInput);

    const submitButton = screen.getByText('Create');
    fireEvent.click(submitButton);

    expect(mockOnSubmitCallback).toHaveBeenCalledWith({
      id: mockUuid,
      title: mockTitle,
      type: FIELD_TYPES.textField,
      description: '',
      maxLength: null,
      isRequired: false,
    });
  });
});
