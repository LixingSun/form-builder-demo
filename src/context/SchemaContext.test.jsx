import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {
  ACTION_TYPE_INIT_SCHEMA,
  ACTION_TYPE_RESET_SCHEMA,
  ACTION_TYPE_ADD_FIELD,
  ACTION_TYPE_EDIT_FIELD,
  ACTION_TYPE_DELETE_FIELD,
  ACTION_TYPE_MOVE_UP_FIELD,
  ACTION_TYPE_MOVE_DOWN_FIELD,
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

    test('should handle schema reset', () => {
      const updatedSchema = schemaReducer(
        { ...INITIAL_SCHEMA, title: 'Test' },
        {
          type: ACTION_TYPE_RESET_SCHEMA,
        }
      );

      expect(updatedSchema).toEqual(INITIAL_SCHEMA);
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

    test('should handle field editing', () => {
      const updatedField = { ...INITIAL_SCHEMA.fields[0], title: 'New Title' };

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: ACTION_TYPE_EDIT_FIELD,
        field: updatedField,
      });

      expect(updatedSchema.fields[0]).toEqual(updatedField);
    });

    test('should handle field editing', () => {
      const originalFieldCount = INITIAL_SCHEMA.fields.length;
      const targetField = INITIAL_SCHEMA.fields[0];

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: ACTION_TYPE_DELETE_FIELD,
        field: targetField,
      });

      expect(updatedSchema.fields.length).toEqual(originalFieldCount - 1);
      expect(updatedSchema.fields[0].title).not.toEqual(targetField.title);
    });

    test('should handle field moving up', () => {
      const targetFieldTitle = INITIAL_SCHEMA.fields[1].title;

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: ACTION_TYPE_MOVE_UP_FIELD,
        field: INITIAL_SCHEMA.fields[1],
      });

      expect(updatedSchema.fields[0].title).toEqual(targetFieldTitle);
    });

    test('should handle field moving down', () => {
      const targetFieldTitle = INITIAL_SCHEMA.fields[0].title;

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: ACTION_TYPE_MOVE_DOWN_FIELD,
        field: INITIAL_SCHEMA.fields[0],
      });

      expect(updatedSchema.fields[1].title).toEqual(targetFieldTitle);
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
