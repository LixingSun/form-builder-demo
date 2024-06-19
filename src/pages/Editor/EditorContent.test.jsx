import EditorContent from './EditorContent';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  INITIAL_SCHEMA,
  SchemaDispatchContext,
  ACTION_TYPE_EDIT_FIELD,
  ACTION_TYPE_DELETE_FIELD,
  ACTION_TYPE_MOVE_UP_FIELD,
  ACTION_TYPE_MOVE_DOWN_FIELD,
} from '@/context/SchemaContext';
import { vi } from 'vitest';
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
      const element = screen.getByText(new RegExp(field.title));
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

  test('should trigger submisson and close dialog when submit callback is triggered', async () => {
    const mockDispatch = vi.fn();

    render(
      <SchemaDispatchContext.Provider value={mockDispatch}>
        <EditorContent schema={INITIAL_SCHEMA} />
      </SchemaDispatchContext.Provider>
    );

    const editButton = screen.getByTestId('edit-field-button-0');
    fireEvent.click(editButton);

    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const dialogTitleElement = screen.queryByText(
        `Edit Field - ${FIELD_TYPE_NAME_MAPPING[FIELD_TYPES.textField]}`
      );
      expect(dialogTitleElement).not.toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: ACTION_TYPE_EDIT_FIELD })
      );
    });
  });

  test('should delete field when delete button is clicked', () => {
    const mockDispatch = vi.fn();

    const onlyField = INITIAL_SCHEMA.fields[0];

    render(
      <SchemaDispatchContext.Provider value={mockDispatch}>
        <EditorContent schema={{ title: 'Form', fields: [onlyField] }} />
      </SchemaDispatchContext.Provider>
    );

    const deleteButton = screen.getByTestId('delete-field-button-0');
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE_DELETE_FIELD,
      field: onlyField,
    });
  });

  test('should move up field when move up button is clicked', () => {
    const mockDispatch = vi.fn();

    const firstField = INITIAL_SCHEMA.fields[0];
    const secondField = INITIAL_SCHEMA.fields[1];

    render(
      <SchemaDispatchContext.Provider value={mockDispatch}>
        <EditorContent
          schema={{ title: 'Form', fields: [firstField, secondField] }}
        />
      </SchemaDispatchContext.Provider>
    );

    const moveUpButton = screen.getByTestId('move-up-field-button-1');
    fireEvent.click(moveUpButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE_MOVE_UP_FIELD,
      field: secondField,
    });
  });

  test('should move down field when move down button is clicked', () => {
    const mockDispatch = vi.fn();

    const firstField = INITIAL_SCHEMA.fields[0];
    const secondField = INITIAL_SCHEMA.fields[1];

    render(
      <SchemaDispatchContext.Provider value={mockDispatch}>
        <EditorContent
          schema={{ title: 'Form', fields: [firstField, secondField] }}
        />
      </SchemaDispatchContext.Provider>
    );

    const moveDownButton = screen.getByTestId('move-down-field-button-0');
    fireEvent.click(moveDownButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE_MOVE_DOWN_FIELD,
      field: firstField,
    });
  });

  test('should open form settings dialog when form title action area is clicked', () => {
    renderEditor();

    const formTitleActionArea = screen.getByTestId('form-title-action-area');
    fireEvent.click(formTitleActionArea);

    const dialogTitleElement = screen.getByText('Configure Form');
    expect(dialogTitleElement).toBeInTheDocument();
  });
});
