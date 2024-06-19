import { Editor } from './Editor';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  SchemaContext,
  SchemaDispatchContext,
  INITIAL_SCHEMA,
  ACTION_TYPE_RESET_SCHEMA,
} from '@/context/SchemaContext';
import { vi } from 'vitest';
import { ScreenLoadingProvider } from '@/context/ScreenLoadingContext';

const renderWithContext = (schema = INITIAL_SCHEMA, dispatch = () => {}) => {
  render(
    <BrowserRouter>
      <SchemaContext.Provider value={schema}>
        <SchemaDispatchContext.Provider value={dispatch}>
          <ScreenLoadingProvider>
            <Editor />
          </ScreenLoadingProvider>
        </SchemaDispatchContext.Provider>
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
      type: ACTION_TYPE_RESET_SCHEMA,
    });
  });
});
