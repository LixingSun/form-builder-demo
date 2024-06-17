import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {
  ACTION_TYPE_ADD_FIELD,
  ACTION_TYPE_INIT_SCHEMA,
  INITIAL_SCHEMA,
  SchemaProvider,
  schemaReducer,
} from './SchemaContext';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

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
    test('should handle schema initialization', () => {
      const newSchema = { title: 'New Schema', fields: [] };
      vi.spyOn(window.localStorage, 'getItem').mockImplementation(() =>
        JSON.stringify(newSchema)
      );

      const actualNewSchema = schemaReducer(INITIAL_SCHEMA, {
        type: ACTION_TYPE_INIT_SCHEMA,
      });

      expect(actualNewSchema).toEqual(newSchema);

      vi.restoreAllMocks();
    });

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
