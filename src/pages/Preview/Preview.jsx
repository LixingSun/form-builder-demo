import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  Container,
  Grid,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { SchemaContext } from '@/context/SchemaContext';
import { FIELD_TYPES } from '@/constants/fieldConstants';

const getPreviewField = (field) => {
  switch (field.type) {
    case FIELD_TYPES.textField:
      return (
        <TextField
          required={field.isRequired}
          placeholder={field.description}
          margin="dense"
          id={`field-${field.id}`}
          name={`field-${field.id}`}
          label={field.title}
          fullWidth
          variant="outlined"
        />
      );
  }
};

export default function Preview() {
  const schema = useContext(SchemaContext);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Form Builder Demo
          </Typography>
          <Link to="/">
            <Button
              endIcon={<EditIcon />}
              sx={{ color: 'primary.contrastText' }}
            >
              Back to Edit
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, bgcolor: '#eeeeee' }}>
        <Container maxWidth="md" sx={{ paddingY: 6 }}>
          <Paper elevation={3} sx={{ padding: 6 }}>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item>
                <Typography variant="h4">{schema.title}</Typography>
              </Grid>
              <Grid item>
                <Typography>{schema.description}</Typography>
              </Grid>
              {schema.fields.map((field) => (
                <Grid item key={field.id}>
                  {getPreviewField(field)}
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
