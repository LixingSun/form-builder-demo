import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import FormTitleDialog from './FormTitleDialog';

const mockInitialValues = {
  title: 'Original Title',
  description: 'Original Description',
};

describe('FieldDialog', () => {
  test('should show modal when it is open', () => {
    render(
      <FormTitleDialog
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        initialValues={mockInitialValues}
      />
    );
    const element = screen.getByText(`Configure Form`);
    expect(element).toBeInTheDocument();
  });

  test('should not show modal when it is closed', () => {
    render(
      <FormTitleDialog
        open={false}
        onClose={() => {}}
        onSubmit={() => {}}
        initialValues={mockInitialValues}
      />
    );
    const element = screen.queryByText(`Configure Form`);
    expect(element).not.toBeInTheDocument();
  });

  test('should trigger onClose when cancel button is clicked', () => {
    const mockOnCloseCallback = vi.fn();
    render(
      <FormTitleDialog
        open={true}
        onClose={mockOnCloseCallback}
        onSubmit={() => {}}
        initialValues={mockInitialValues}
      />
    );

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);
    expect(mockOnCloseCallback).toHaveBeenCalled();
  });

  test('should trigger onSubmit when submit button is clicked', () => {
    const mockOnSubmitCallback = vi.fn();
    render(
      <FormTitleDialog
        open={true}
        onClose={() => {}}
        onSubmit={mockOnSubmitCallback}
        initialValues={mockInitialValues}
      />
    );

    const mockTitle = 'New Title';
    const titleConfigInput = screen
      .getByTestId('form-title-config')
      .querySelector('input[name=title]');
    fireEvent.change(titleConfigInput, { target: { value: mockTitle } });
    fireEvent.blur(titleConfigInput);

    const mockDescription = 'New Description';
    const descriptionConfigInput = screen
      .getByTestId('form-description-config')
      .querySelector('textarea[name=description]');
    fireEvent.change(descriptionConfigInput, {
      target: { value: mockDescription },
    });
    fireEvent.blur(descriptionConfigInput);

    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);

    expect(mockOnSubmitCallback).toHaveBeenCalledWith({
      title: mockTitle,
      description: mockDescription,
    });
  });

  test('should display current title and description configured in schema', () => {
    render(
      <FormTitleDialog
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        initialValues={mockInitialValues}
      />
    );

    const titleConfigInput = screen
      .getByTestId('form-title-config')
      .querySelector('input[name=title]');
    expect(titleConfigInput.value).toEqual(mockInitialValues.title);

    const descriptionConfigInput = screen
      .getByTestId('form-description-config')
      .querySelector('textarea[name=description]');
    expect(descriptionConfigInput.value).toEqual(mockInitialValues.description);
  });
});
