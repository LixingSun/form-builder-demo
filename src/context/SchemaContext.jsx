import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const initialSchema = {
  title: 'Test Form',
  fields: [
    {
      type: 'textField',
      maxLength: null,
    },
  ],
};

export const SchemaContext = createContext(null);
export const SchemaDispatchContext = createContext(null);

const schemaReducer = (schema, action) => {
  switch (action.type) {
    case 'addField':
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
  const [schema, dispatch] = useReducer(schemaReducer, initialSchema);

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
