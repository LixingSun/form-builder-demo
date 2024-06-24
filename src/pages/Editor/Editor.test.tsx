import { Editor } from './Editor';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  SchemaContext,
  INITIAL_SCHEMA,
  SCHEMA_ACTION_TYPE,
} from '@/context/SchemaContext';
import { vi } from 'vitest';
import { ScreenLoadingProvider } from '@/context/ScreenLoadingContext';

const renderWithContext = (
  schema = INITIAL_SCHEMA,
  schemaDispatch = () => {}
) => {
  render(
    <BrowserRouter>
      <SchemaContext.Provider value={{ schema, schemaDispatch }}>
        <ScreenLoadingProvider>
          <Editor />
        </ScreenLoadingProvider>
      </SchemaContext.Provider>
    </BrowserRouter>
  );
};

describe('Editor', () => {
  test('should render editor page', () => {
    renderWithContext();
    const element = screen.getByText('Form Builder Demo');

    expect(element).toBeInTheDocument();
  });

  test('should trigger reset schema when reset button is clicked', () => {
    const mockDispatch = vi.fn();
    renderWithContext(INITIAL_SCHEMA, mockDispatch);

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: SCHEMA_ACTION_TYPE.RESET_SCHEMA,
    });
  });
});
