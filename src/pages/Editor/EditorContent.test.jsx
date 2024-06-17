import EditorContent from './EditorContent';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { INITIAL_SCHEMA } from '@/context/SchemaContext';
import {
  FIELD_TYPES,
  FIELD_TYPE_NAME_MAPPING,
} from '@/constants/fieldConstants';

const renderEditor = (schema = INITIAL_SCHEMA) => {
  render(<EditorContent schema={schema} />);
};

describe('EditorContent', () => {
  test('should render form title', () => {
    renderEditor();
    const element = screen.getByText(INITIAL_SCHEMA.title);
    expect(element).toBeInTheDocument();
  });

  test('should render every field for editing', () => {
    renderEditor();
    INITIAL_SCHEMA.fields.forEach((field) => {
      const element = screen.getByText(field.title);
      expect(element).toBeInTheDocument();
    });
  });

  test('should open field editing dialog when edit button is clicked', () => {
    renderEditor();

    const editButton = screen.getByTestId('edit-field-button-0');
    fireEvent.click(editButton);

    const dialogTitleElement = screen.getByText(
      `Edit Field - ${FIELD_TYPE_NAME_MAPPING[FIELD_TYPES.textField]}`
    );
    expect(dialogTitleElement).toBeInTheDocument();
  });

  test('should close dialog when close callback is triggered', async () => {
    renderEditor();

    const editButton = screen.getByTestId('edit-field-button-0');
    fireEvent.click(editButton);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    await waitFor(() => {
      const dialogTitleElement = screen.queryByText(
        `Edit Field - ${FIELD_TYPE_NAME_MAPPING[FIELD_TYPES.textField]}`
      );
      expect(dialogTitleElement).not.toBeInTheDocument();
    });
  });
});
