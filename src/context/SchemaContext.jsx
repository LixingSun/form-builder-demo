import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FIELD_TYPES } from '@/constants/fieldConstants';

const LOCALSTORAGE_KEY_SCHEMA = 'form-builder-demo-schema';

export const INITIAL_SCHEMA = {
  title: 'Test Form',
  description:
    'Welcome to Form Builder Demo. Feel free to play around and create your own form.',
  fields: [
    {
      id: '1',
      type: FIELD_TYPES.textField,
      key: 'firstName',
      title: 'First Name',
      description: 'Please enter your first name',
      isRequired: true,
      maxLength: null,
    },
    {
      id: '2',
      type: FIELD_TYPES.textField,
      key: 'lastName',
      title: 'Last Name',
      description: 'Please enter your last name',
      isRequired: true,
      maxLength: null,
    },
    {
      id: '3',
      type: FIELD_TYPES.number,
      key: 'age',
      title: 'Age',
      description: 'Please enter your age',
      isRequired: false,
      minValue: '1',
      maxValue: '150',
    },
    {
      id: '4',
      type: FIELD_TYPES.email,
      key: 'email',
      title: 'Email',
      description: 'Please enter your Email',
      isRequired: false,
    },
    {
      id: '5',
      type: FIELD_TYPES.dropdown,
      key: 'nationality',
      title: 'Nationality',
      description: 'Please select your nationality',
      isRequired: false,
      options: 'Chinese,American,Canadian,Australian,South African,Others',
    },
  ],
};

export const SchemaContext = createContext(null);
export const SchemaDispatchContext = createContext(null);

export const ACTION_TYPE_INIT_SCHEMA = 'initSchema';
export const ACTION_TYPE_RESET_SCHEMA = 'resetSchema';
export const ACTION_TYPE_ADD_FIELD = 'addField';
export const ACTION_TYPE_EDIT_FIELD = 'editField';
export const ACTION_TYPE_DELETE_FIELD = 'deleteField';
export const ACTION_TYPE_MOVE_UP_FIELD = 'moveUpField';
export const ACTION_TYPE_MOVE_DOWN_FIELD = 'moveDownField';

export const schemaReducer = (schema, action) => {
  let newSchema;
  let fieldIndex;
  let currentField;
  let targetField;

  const syncSchemaToStorage = () => {
    localStorage.setItem(LOCALSTORAGE_KEY_SCHEMA, JSON.stringify(newSchema));
  };

  switch (action.type) {
    case ACTION_TYPE_INIT_SCHEMA:
      return (
        JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_SCHEMA)) || schema
      );
    case ACTION_TYPE_RESET_SCHEMA:
      newSchema = INITIAL_SCHEMA;
      syncSchemaToStorage();
      return newSchema;
    case ACTION_TYPE_ADD_FIELD:
      newSchema = {
        ...schema,
        fields: [...schema.fields, action.field],
      };
      syncSchemaToStorage();
      return newSchema;
    case ACTION_TYPE_EDIT_FIELD:
      newSchema = {
        ...schema,
        fields: schema.fields.map((field) =>
          field.id == action.field.id ? action.field : field
        ),
      };
      syncSchemaToStorage();
      return newSchema;
    case ACTION_TYPE_DELETE_FIELD:
      newSchema = {
        ...schema,
        fields: schema.fields.filter((field) => field.id !== action.field.id),
      };
      syncSchemaToStorage();
      return newSchema;
    case ACTION_TYPE_MOVE_UP_FIELD:
      fieldIndex = schema.fields.findIndex(
        (field) => field.id == action.field.id
      );
      currentField = structuredClone(action.field);
      targetField = structuredClone(schema.fields[fieldIndex - 1]);
      newSchema = {
        ...schema,
        fields: schema.fields.map((field, index) => {
          if (index == fieldIndex - 1) {
            return currentField;
          } else if (index == fieldIndex) {
            return targetField;
          } else {
            return field;
          }
        }),
      };
      syncSchemaToStorage();
      return newSchema;
    case ACTION_TYPE_MOVE_DOWN_FIELD:
      fieldIndex = schema.fields.findIndex(
        (field) => field.id == action.field.id
      );
      currentField = structuredClone(action.field);
      targetField = structuredClone(schema.fields[fieldIndex + 1]);
      newSchema = {
        ...schema,
        fields: schema.fields.map((field, index) => {
          if (index == fieldIndex + 1) {
            return currentField;
          } else if (index == fieldIndex) {
            return targetField;
          } else {
            return field;
          }
        }),
      };
      syncSchemaToStorage();
      return newSchema;
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export function SchemaProvider({ children }) {
  const [schema, dispatch] = useReducer(schemaReducer, INITIAL_SCHEMA);

  useEffect(() => {
    dispatch({ type: ACTION_TYPE_INIT_SCHEMA });
  }, []);

  return (
    <SchemaContext.Provider value={schema}>
      <SchemaDispatchContext.Provider value={dispatch}>
        {children}
      </SchemaDispatchContext.Provider>
    </SchemaContext.Provider>
  );
}

SchemaProvider.propTypes = {
  children: PropTypes.node,
};
