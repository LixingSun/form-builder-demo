import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PropTypes from 'prop-types';
import FieldDialog from './FieldDialog';
import { useState } from 'react';

const EditorMenuItem = ({ name, icon: Icon, onClick }) => {
  return (
    <Card>
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
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function EditorMenu() {
  const [isFieldCreationOpen, setIsFieldCreationOpen] = useState(false);
  const [fieldCreationType, setFieldCreationType] = useState('');

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
            icon={TextFieldsIcon}
            onClick={() => {
              setFieldCreationType('Text Field');
              setIsFieldCreationOpen(true);
            }}
          />
        </Grid>
      </Grid>
      <FieldDialog
        open={isFieldCreationOpen}
        fieldType={fieldCreationType}
        onClose={() => setIsFieldCreationOpen(false)}
        onSubmit={(formData) => {
          console.log(formData);
          setIsFieldCreationOpen(false);
        }}
      />
    </>
  );
}
