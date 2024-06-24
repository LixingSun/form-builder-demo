import {
  TextFields as TextFieldsIcon,
  Numbers as NumbersIcon,
  MailOutline as EmailIcon,
  ClearAll as DropDownIcon,
} from '@mui/icons-material';

export enum FIELD_TYPES {
  TEXT_FIELD = 'textField',
  NUMBER = 'number',
  EMAIL = 'email',
  DROPDOWN = 'dropdown',
}

export const FIELD_TYPE_NAME_MAPPING: { [key in FIELD_TYPES]: string } =  {
  [FIELD_TYPES.TEXT_FIELD]: 'Text Field',
  [FIELD_TYPES.NUMBER]: 'Number',
  [FIELD_TYPES.EMAIL]: 'Email',
  [FIELD_TYPES.DROPDOWN]: 'Dropdown',
};

export const FIELD_TYPE_ICON_MAPPING: { [key in FIELD_TYPES]: JSX.ElementType } = {
  [FIELD_TYPES.TEXT_FIELD]: TextFieldsIcon,
  [FIELD_TYPES.NUMBER]: NumbersIcon,
  [FIELD_TYPES.EMAIL]: EmailIcon,
  [FIELD_TYPES.DROPDOWN]: DropDownIcon,
};