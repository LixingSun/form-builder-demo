import { BrowserRouter } from 'react-router-dom';
import { Preview } from './Preview';
import { render, screen } from '@testing-library/react';
import {
  SchemaContext,
  INITIAL_SCHEMA,
  IFormSchema,
} from '@/context/SchemaContext';
import { ScreenLoadingProvider } from '@/context/ScreenLoadingContext';
import { vi } from 'vitest';

const renderPreview = (schema: IFormSchema) => {
  render(
    <BrowserRouter>
      <SchemaContext.Provider value={{ schema, schemaDispatch: vi.fn() }}>
        <ScreenLoadingProvider>
          <Preview />
        </ScreenLoadingProvider>
      </SchemaContext.Provider>
    </BrowserRouter>
  );
};

describe('Preview', () => {
  test('should render preview page', () => {
    renderPreview(INITIAL_SCHEMA);

    const element = screen.getByText('Form Builder Demo');
    expect(element).toBeInTheDocument();
  });
});
