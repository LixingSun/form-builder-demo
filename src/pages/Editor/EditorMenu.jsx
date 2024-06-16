import { Typography, Grid, Card, CardContent } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { PropTypes } from 'prop-types';

const EditorMenuItem = ({ name, icon: Icon }) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', paddingTop: 3 }}>
        <Icon />
        <Typography sx={{ marginLeft: 1 }}>{name}</Typography>
      </CardContent>
    </Card>
  );
};

EditorMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default function EditorMenu() {
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
          <EditorMenuItem name={'Text Field'} icon={TextFieldsIcon} />
        </Grid>
      </Grid>
    </>
  );
}
