import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const LOCALSTORAGE_KEY_SCHEMA = 'form-builder-demo-schema';

export const INITIAL_SCHEMA = {
  title: 'Test Form',
  fields: [
    {
      id: '1',
      type: 'textField',
      title: 'First Name',
      description: 'Please enter your first name',
      required: true,
      maxLength: null,
    },
    {
      id: '2',
      type: 'textField',
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

export const schemaReducer = (schema, action) => {
  let newSchema;

  switch (action.type) {
    case ACTION_TYPE_INIT_SCHEMA:
      return action.schema;
    case ACTION_TYPE_ADD_FIELD:
      newSchema = {
        ...schema,
        fields: [...schema.fields, action.field],
      };
      localStorage.setItem(LOCALSTORAGE_KEY_SCHEMA, JSON.stringify(newSchema));
      return newSchema;
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export function SchemaProvider({ children }) {
  const [schema, dispatch] = useReducer(schemaReducer, INITIAL_SCHEMA);

  useEffect(() => {
    const storedSchema = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_SCHEMA)
    );
    if (storedSchema) {
      dispatch({ type: ACTION_TYPE_INIT_SCHEMA, schema: storedSchema });
    }
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
