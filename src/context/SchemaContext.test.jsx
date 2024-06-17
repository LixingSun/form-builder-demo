import { render, screen } from '@testing-library/react';
import {
  ACTION_TYPE_ADD_FIELD,
  INITIAL_SCHEMA,
  SchemaProvider,
  schemaReducer,
} from './SchemaContext';

describe('SchemaContext', () => {
  describe('SchemaProvider', () => {
    test('should render children', () => {
      const text = 'Test';
      render(
        <SchemaProvider>
          <div>{text}</div>
        </SchemaProvider>
      );
      const element = screen.getByText(text);
      expect(element).toBeInTheDocument();
    });
  });

  describe('schemaReducer', () => {
    test('should handle field addition', () => {
      const newField = { id: 1 };
      const expectedNewSchema = {
        ...INITIAL_SCHEMA,
        fields: [...INITIAL_SCHEMA.fields, newField],
      };
      const actualNewSchema = schemaReducer(INITIAL_SCHEMA, {
        type: ACTION_TYPE_ADD_FIELD,
        field: newField,
      });

      expect(actualNewSchema).toEqual(expectedNewSchema);
    });

    test('should throw error for unhandled action type', () => {
      expect(() => {
        schemaReducer(INITIAL_SCHEMA, {
          type: 'unknown',
        });
      }).toThrowError();
    });
  });
});
