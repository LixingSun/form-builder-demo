import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';

export const FIELD_TYPES = {
  textField: 'textField',
  number: 'number',
};

export const FIELD_TYPE_NAME_MAPPING = {
  [FIELD_TYPES.textField]: 'Text Field',
  [FIELD_TYPES.number]: 'Number',
};

export const FIELD_TYPE_ICON_MAPPING = {
  [FIELD_TYPES.textField]: TextFieldsIcon,
  [FIELD_TYPES.number]: NumbersIcon,
};
