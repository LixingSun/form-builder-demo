import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import FieldDialog from './FieldDialog';
import { FIELD_TYPES } from '@/constants/fieldConstants';

const mockDisplayName = 'Display Name';
const mockId = 'mock-uuid-value';

describe('FieldDialog', () => {
  test('should show modal when it is open', () => {
    render(
      <FieldDialog
        open={true}
        fieldId={mockId}
        fieldType={FIELD_TYPES.TEXT_FIELD}
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
        fieldId={mockId}
        fieldType={FIELD_TYPES.TEXT_FIELD}
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
        fieldId={mockId}
        fieldType={FIELD_TYPES.TEXT_FIELD}
        fieldDisplayName={mockDisplayName}
        onClose={mockOnCloseCallback}
        onSubmit={() => {}}
      />
    );

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);
    expect(mockOnCloseCallback).toHaveBeenCalled();
  });

  test('should trigger onSubmit when submit button is clicked', async () => {
    const mockOnSubmitCallback = vi.fn();
    render(
      <FieldDialog
        open={true}
        fieldId={mockId}
        fieldType={FIELD_TYPES.TEXT_FIELD}
        fieldDisplayName={mockDisplayName}
        onClose={() => {}}
        onSubmit={mockOnSubmitCallback}
      />
    );

    const mockTitle = 'Title';
    const titleConfigInput = screen
      .getByTestId('field-dialog')
      .querySelector('input[name=title]');
    expect(titleConfigInput).not.toBeNull();
    fireEvent.change(titleConfigInput!, { target: { value: mockTitle } });
    fireEvent.blur(titleConfigInput!);

    const submitButton = screen.getByText('Create');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmitCallback).toHaveBeenCalledWith({
        id: mockId,
        title: mockTitle,
        key: mockTitle.toLowerCase(),
        type: FIELD_TYPES.TEXT_FIELD,
        description: '',
        maxLength: null,
        isRequired: false,
      });
    });
  });

  test('should handle editing case when initial values are provided', () => {
    const mockInitialTitle = 'Initial Title';
    const mockInitialValue = {
      id: mockId,
      type: FIELD_TYPES.TEXT_FIELD,
      title: mockInitialTitle,
      description: 'description',
      isRequired: true,
    };

    render(
      <FieldDialog
        open={true}
        fieldId={mockId}
        fieldType={FIELD_TYPES.TEXT_FIELD}
        fieldDisplayName={mockDisplayName}
        onClose={() => {}}
        onSubmit={() => {}}
        initialValues={mockInitialValue}
      />
    );

    const element = screen.getByText(`Edit Field - ${mockDisplayName}`);
    expect(element).toBeInTheDocument();

    const titleConfigInput = screen
      .getByTestId('field-dialog')
      .querySelector('input[name=title]') as HTMLInputElement;
    expect(titleConfigInput).not.toBeNull();
    expect(titleConfigInput.value).toEqual(mockInitialTitle);
  });
});
