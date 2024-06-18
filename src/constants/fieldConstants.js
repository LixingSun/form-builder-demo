import {
  TextFields as TextFieldsIcon,
  Numbers as NumbersIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

export const FIELD_TYPES = {
  textField: 'textField',
  number: 'number',
  email: 'email',
};

export const FIELD_TYPE_NAME_MAPPING = {
  [FIELD_TYPES.textField]: 'Text Field',
  [FIELD_TYPES.number]: 'Number',
  [FIELD_TYPES.email]: 'Email',
};

export const FIELD_TYPE_ICON_MAPPING = {
  [FIELD_TYPES.textField]: TextFieldsIcon,
  [FIELD_TYPES.number]: NumbersIcon,
  [FIELD_TYPES.email]: EmailIcon,
};
