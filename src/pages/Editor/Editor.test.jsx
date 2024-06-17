import Editor from './Editor';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { SchemaContext, INITIAL_SCHEMA } from '@/context/SchemaContext';

const renderWithContext = (schema = INITIAL_SCHEMA) => {
  render(
    <BrowserRouter>
      <SchemaContext.Provider value={schema}>
        <Editor />
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
});
