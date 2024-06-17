import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

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

export const ACTION_TYPE_ADD_FIELD = 'addField';

export const schemaReducer = (schema, action) => {
  switch (action.type) {
    case ACTION_TYPE_ADD_FIELD:
      return {
        ...schema,
        fields: [...schema.fields, action.field],
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export function SchemaProvider({ children }) {
  const [schema, dispatch] = useReducer(schemaReducer, INITIAL_SCHEMA);

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
