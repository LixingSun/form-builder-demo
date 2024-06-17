import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FIELD_TYPES } from '@/constants/fieldConstants';

const LOCALSTORAGE_KEY_SCHEMA = 'form-builder-demo-schema';

export const INITIAL_SCHEMA = {
  title: 'Test Form',
  fields: [
    {
      id: '1',
      type: FIELD_TYPES.textField,
      title: 'First Name',
      description: 'Please enter your first name',
      required: true,
      maxLength: null,
    },
    {
      id: '2',
      type: FIELD_TYPES.textField,
      title: 'Last Name',
      description: 'Please enter your last name',
      required: true,
      maxLength: null,
    },
  ],
};

export const SchemaContext = createContext(null);
export const SchemaDispatchContext = createContext(null);

export const ACTION_TYPE_INIT_SCHEMA = 'initSchema';
export const ACTION_TYPE_ADD_FIELD = 'addField';
export const ACTION_TYPE_EDIT_FIELD = 'editField';
export const ACTION_TYPE_DELETE_FIELD = 'deleteField';

export const schemaReducer = (schema, action) => {
  let newSchema;

  const syncSchemaToStorage = () => {
    localStorage.setItem(LOCALSTORAGE_KEY_SCHEMA, JSON.stringify(newSchema));
  };

  switch (action.type) {
    case ACTION_TYPE_INIT_SCHEMA:
      return (
        JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_SCHEMA)) || schema
      );
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
