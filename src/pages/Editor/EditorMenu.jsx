import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import PropTypes from 'prop-types';
import FieldDialog from './FieldDialog';
import { useContext, useState } from 'react';
import {
  FIELD_TYPES,
  FIELD_TYPE_NAME_MAPPING,
  FIELD_TYPE_ICON_MAPPING,
} from '@/constants/fieldConstants';
import {
  SchemaDispatchContext,
  ACTION_TYPE_ADD_FIELD,
} from '@/context/SchemaContext';

const EditorMenuItem = ({ name, id, icon: Icon, onClick }) => {
  return (
    <Card data-testid={id}>
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ display: 'flex' }}>
          <Icon />
          <Typography sx={{ marginLeft: 1 }}>{name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

EditorMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function EditorMenu() {
  const [isFieldCreationOpen, setIsFieldCreationOpen] = useState(false);
  const [fieldCreationType, setFieldCreationType] = useState(
    FIELD_TYPES.textField
  );
  const dispatch = useContext(SchemaDispatchContext);

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        color="primary.contrastText"
        sx={{ marginBottom: 2 }}
      >
        Create Field
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <EditorMenuItem
            name={'Text Field'}
            id="text-field-menu-item"
            icon={FIELD_TYPE_ICON_MAPPING[FIELD_TYPES.textField]}
            onClick={() => {
              setFieldCreationType(FIELD_TYPES.textField);
              setIsFieldCreationOpen(true);
            }}
          />
        </Grid>
      </Grid>

      <FieldDialog
        open={isFieldCreationOpen}
        fieldType={fieldCreationType}
        fieldDisplayName={FIELD_TYPE_NAME_MAPPING[fieldCreationType]}
        onClose={() => setIsFieldCreationOpen(false)}
        onSubmit={(formData) => {
          dispatch({
            type: ACTION_TYPE_ADD_FIELD,
            field: formData,
          });
          setIsFieldCreationOpen(false);
        }}
      />
    </>
  );
}
