import { BrowserRouter } from 'react-router-dom';
import Preview from './Preview';
import { render, screen } from '@testing-library/react';
import { SchemaContext, INITIAL_SCHEMA } from '@/context/SchemaContext';

const renderPreview = (schema) => {
  render(
    <BrowserRouter>
      <SchemaContext.Provider value={schema}>
        <Preview />
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
