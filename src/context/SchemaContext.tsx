import { createContext, useEffect, useReducer, ReactNode } from 'react';
import { FIELD_TYPES } from '@/constants/fieldConstants';

const LOCALSTORAGE_KEY_SCHEMA = 'form-builder-demo-schema';

export interface INumericField {
  maxLength?: number | null;
  maxValue?: number | null;
  minValue?: number | null;
}
export interface IFieldBase extends INumericField {
  title: string;
  description: string;
  isRequired: boolean;
  options?: string;
}
export interface IField extends IFieldBase {
  id: string;
  type: FIELD_TYPES;
  key: string;
}
export interface IFormSchema {
  title: string;
  description: string;
  fields: IField[];
}

export const INITIAL_SCHEMA: IFormSchema = {
  title: 'Test Form',
  description:
    'Welcome to Form Builder Demo. Feel free to play around and create your own form.',
  fields: [
    {
      id: '1',
      type: FIELD_TYPES.TEXT_FIELD,
      key: 'firstName',
      title: 'First Name',
      description: 'Please enter your first name',
      isRequired: true,
      maxLength: null,
    },
    {
      id: '2',
      type: FIELD_TYPES.TEXT_FIELD,
      key: 'lastName',
      title: 'Last Name',
      description: 'Please enter your last name',
      isRequired: true,
      maxLength: null,
    },
    {
      id: '3',
      type: FIELD_TYPES.NUMBER,
      key: 'age',
      title: 'Age',
      description: 'Please enter your age',
      isRequired: false,
      minValue: 1,
      maxValue: 150,
    },
    {
      id: '4',
      type: FIELD_TYPES.EMAIL,
      key: 'email',
      title: 'Email',
      description: 'Please enter your Email',
      isRequired: false,
    },
    {
      id: '5',
      type: FIELD_TYPES.DROPDOWN,
      key: 'nationality',
      title: 'Nationality',
      description: 'Please select your nationality',
      isRequired: false,
      options: 'Chinese,American,Canadian,Australian,South African,Others',
    },
  ],
};

export enum SCHEMA_ACTION_TYPE {
  INIT_SCHEMA = 'initSchema',
  RESET_SCHEMA = 'resetSchema',
  ADD_FIELD = 'addField',
  EDIT_FIELD = 'editField',
  DELETE_FIELD = 'deleteField',
  MOVE_UP_FIELD = 'moveUpField',
  MOVE_DOWN_FIELD = 'moveDownField',
  UPDATE_FORM_SETTINGS = 'updateFormSettings',
}
interface IInitSchemaAction {
  type: SCHEMA_ACTION_TYPE.INIT_SCHEMA;
}
interface IResetSchemaAction {
  type: SCHEMA_ACTION_TYPE.RESET_SCHEMA;
}
interface IAddFieldAction {
  type: SCHEMA_ACTION_TYPE.ADD_FIELD;
  field: IField;
}
interface IEditFieldAction {
  type: SCHEMA_ACTION_TYPE.EDIT_FIELD;
  field: IField;
}
interface IDeleteFieldAction {
  type: SCHEMA_ACTION_TYPE.DELETE_FIELD;
  field: IField;
}
interface IMoveUpFieldAction {
  type: SCHEMA_ACTION_TYPE.MOVE_UP_FIELD;
  field: IField;
}
interface IMoveDownFieldAction {
  type: SCHEMA_ACTION_TYPE.MOVE_DOWN_FIELD;
  field: IField;
}
export interface IFormSettings {
  title: string;
  description: string;
}
interface IUpdateFormSettingsAction {
  type: SCHEMA_ACTION_TYPE.UPDATE_FORM_SETTINGS;
  settings: IFormSettings;
}
export type SchemaAction =
  | IInitSchemaAction
  | IResetSchemaAction
  | IAddFieldAction
  | IEditFieldAction
  | IDeleteFieldAction
  | IMoveUpFieldAction
  | IMoveDownFieldAction
  | IUpdateFormSettingsAction;

export const schemaReducer = (
  schema: IFormSchema,
  action: SchemaAction
): IFormSchema => {
  let newSchema: IFormSchema;
  let fieldIndex: number;
  let currentField: IField;
  let targetField: IField;

  const syncSchemaToStorage = () => {
    localStorage.setItem(LOCALSTORAGE_KEY_SCHEMA, JSON.stringify(newSchema));
  };

  switch (action.type) {
    case SCHEMA_ACTION_TYPE.INIT_SCHEMA:
      return (
        JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_SCHEMA) || 'null') ||
        schema
      );
    case SCHEMA_ACTION_TYPE.RESET_SCHEMA:
      newSchema = INITIAL_SCHEMA;
      syncSchemaToStorage();
      return newSchema;
    case SCHEMA_ACTION_TYPE.ADD_FIELD:
      newSchema = {
        ...schema,
        fields: [...schema.fields, action.field],
      };
      syncSchemaToStorage();
      return newSchema;
    case SCHEMA_ACTION_TYPE.EDIT_FIELD:
      newSchema = {
        ...schema,
        fields: schema.fields.map((field) =>
          field.id == action.field.id ? action.field : field
        ),
      };
      syncSchemaToStorage();
      return newSchema;
    case SCHEMA_ACTION_TYPE.DELETE_FIELD:
      newSchema = {
        ...schema,
        fields: schema.fields.filter((field) => field.id !== action.field.id),
      };
      syncSchemaToStorage();
      return newSchema;
    case SCHEMA_ACTION_TYPE.MOVE_UP_FIELD:
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
    case SCHEMA_ACTION_TYPE.MOVE_DOWN_FIELD:
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
    case SCHEMA_ACTION_TYPE.UPDATE_FORM_SETTINGS:
      newSchema = {
        ...schema,
        ...action.settings,
      };
      syncSchemaToStorage();
      return newSchema;
  }
};

interface ISchemaContextProps {
  schema: IFormSchema;
  schemaDispatch: React.Dispatch<SchemaAction>;
}
export const SchemaContext = createContext<ISchemaContextProps>({
  schema: INITIAL_SCHEMA,
  schemaDispatch: () => undefined,
});
export const SchemaDispatchContext = createContext(null);

export const SchemaProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [schema, schemaDispatch] = useReducer(schemaReducer, INITIAL_SCHEMA);

  useEffect(() => {
    schemaDispatch({ type: SCHEMA_ACTION_TYPE.INIT_SCHEMA });
  }, []);

  return (
    <SchemaContext.Provider value={{ schema, schemaDispatch }}>
      {children}
    </SchemaContext.Provider>
  );
};
