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
import { useFormik } from 'formik';
import * as yup from 'yup';

const getPreviewField = (field, formik) => {
  switch (field.type) {
    case FIELD_TYPES.textField:
      return (
        <TextField
          required={field.isRequired}
          placeholder={field.description}
          margin="dense"
          id={`field-${field.id}`}
          name={field.key}
          label={field.title}
          fullWidth
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
          helperText={formik.touched[field.key] && formik.errors[field.key]}
        />
      );
    default:
      throw Error('Unknown field type: ' + field.type);
  }
};

const generateInitFormValues = (fields) => {
  let formValues = {};
  fields.forEach((field) => {
    switch (field.type) {
      case FIELD_TYPES.textField:
        formValues[field.key] = '';
        return;
      default:
        throw Error('Unknown field type: ' + field.type);
    }
  });
  return formValues;
};

const generateValidationSchema = (fields) => {
  let validationSchema = {};
  fields.forEach((field) => {
    let validators;
    switch (field.type) {
      case FIELD_TYPES.textField:
        validators = yup.string();
        if (field.isRequired) {
          validators = validators.required('This field is required.');
        }
        if (field.maxLength) {
          validators = validators.max(
            field.maxLength,
            `This field must be at most ${field.maxLength} characters.`
          );
        }
        break;
      default:
        throw Error('Unknown field type: ' + field.type);
    }
    validationSchema[field.key] = validators;
  });
  return yup.object(validationSchema);
};

export default function Preview() {
  const schema = useContext(SchemaContext);
  const formik = useFormik({
    initialValues: generateInitFormValues(schema.fields),
    validationSchema: generateValidationSchema(schema.fields),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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

      <Box
        component="form"
        sx={{ flexGrow: 1, bgcolor: '#eeeeee' }}
        noValidate
        onSubmit={formik.handleSubmit}
      >
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
                  {getPreviewField(field, formik)}
                </Grid>
              ))}
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
