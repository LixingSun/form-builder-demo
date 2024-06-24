import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {
  SCHEMA_ACTION_TYPE,
  INITIAL_SCHEMA,
  SchemaProvider,
  schemaReducer,
} from './SchemaContext';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
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
        type: SCHEMA_ACTION_TYPE.INIT_SCHEMA,
      });

      expect(actualNewSchema).toEqual(newSchema);

      vi.restoreAllMocks();
    });

    test('should handle schema reset', () => {
      const updatedSchema = schemaReducer(
        { ...INITIAL_SCHEMA, title: 'Test' },
        {
          type: SCHEMA_ACTION_TYPE.RESET_SCHEMA,
        }
      );

      expect(updatedSchema).toEqual(INITIAL_SCHEMA);
    });

    test('should handle field addition', () => {
      const newField = { ...INITIAL_SCHEMA.fields[0], id: 'newId' };
      const expectedNewSchema = {
        ...INITIAL_SCHEMA,
        fields: [...INITIAL_SCHEMA.fields, newField],
      };
      const actualNewSchema = schemaReducer(INITIAL_SCHEMA, {
        type: SCHEMA_ACTION_TYPE.ADD_FIELD,
        field: newField,
      });

      expect(actualNewSchema).toEqual(expectedNewSchema);
    });

    test('should handle field editing', () => {
      const updatedField = { ...INITIAL_SCHEMA.fields[0], title: 'New Title' };

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: SCHEMA_ACTION_TYPE.EDIT_FIELD,
        field: updatedField,
      });

      expect(updatedSchema.fields[0]).toEqual(updatedField);
    });

    test('should handle field editing', () => {
      const originalFieldCount = INITIAL_SCHEMA.fields.length;
      const targetField = INITIAL_SCHEMA.fields[0];

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: SCHEMA_ACTION_TYPE.DELETE_FIELD,
        field: targetField,
      });

      expect(updatedSchema.fields.length).toEqual(originalFieldCount - 1);
      expect(updatedSchema.fields[0].title).not.toEqual(targetField.title);
    });

    test('should handle field moving up', () => {
      const targetFieldTitle = INITIAL_SCHEMA.fields[1].title;

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: SCHEMA_ACTION_TYPE.MOVE_UP_FIELD,
        field: INITIAL_SCHEMA.fields[1],
      });

      expect(updatedSchema.fields[0].title).toEqual(targetFieldTitle);
    });

    test('should handle field moving down', () => {
      const targetFieldTitle = INITIAL_SCHEMA.fields[0].title;

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: SCHEMA_ACTION_TYPE.MOVE_DOWN_FIELD,
        field: INITIAL_SCHEMA.fields[0],
      });

      expect(updatedSchema.fields[1].title).toEqual(targetFieldTitle);
    });

    test('should handle form settings modification', () => {
      const title = 'New Form Title';
      const description = 'New Form Title';

      const updatedSchema = schemaReducer(INITIAL_SCHEMA, {
        type: SCHEMA_ACTION_TYPE.UPDATE_FORM_SETTINGS,
        settings: {
          title,
          description,
        },
      });

      expect(updatedSchema.title).toEqual(title);
      expect(updatedSchema.description).toEqual(description);
    });
  });
});
