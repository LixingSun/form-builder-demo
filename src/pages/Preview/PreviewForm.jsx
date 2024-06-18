import { Formik } from 'formik';
import * as yup from 'yup';
import { PropTypes } from 'prop-types';
import { Box, Container, Paper, Grid, Typography, Button } from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import PreviewField from './PreviewField';
import { useMemo } from 'react';

const generateInitFormValues = (fields) => {
  let formValues = {};
  fields.forEach((field) => {
    switch (field.type) {
      case FIELD_TYPES.textField:
        formValues[field.key] = '';
        return;
      case FIELD_TYPES.number:
        formValues[field.key] = null;
        return;
      case FIELD_TYPES.email:
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
        if (field.maxLength !== null) {
          validators = validators.max(
            field.maxLength,
            `This field must be at most ${field.maxLength} characters.`
          );
        }
        break;
      case FIELD_TYPES.number:
        validators = yup.number().nullable();
        if (field.isRequired) {
          validators = validators.required('This field is required.');
        }
        if (field.minValue !== null) {
          validators = validators.min(
            field.minValue,
            `The minimum acceptable value is ${field.minValue}.`
          );
        }
        if (field.maxValue !== null) {
          validators = validators.max(
            field.maxValue,
            `The maximum acceptable value is ${field.maxValue}.`
          );
        }
        break;
      case FIELD_TYPES.email:
        validators = yup.string().email('The email format is invalid');
        if (field.isRequired) {
          validators = validators.required('This field is required.');
        }
        break;
      default:
        throw Error('Unknown field type: ' + field.type);
    }
    validationSchema[field.key] = validators;
  });
  return yup.object(validationSchema);
};

export default function PreviewForm({ schema }) {
  const { initialValues, validationSchema } = useMemo(() => {
    const { fields } = schema;
    return {
      initialValues: generateInitFormValues(fields),
      validationSchema: generateValidationSchema(fields),
    };
  }, [schema]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
        <Box
          component="form"
          sx={{ flexGrow: 1, bgcolor: '#eeeeee' }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
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
                    <PreviewField
                      field={field}
                      touched={!!touched[field.key]}
                      error={errors[field.key]}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Grid>
                ))}
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      )}
    </Formik>
  );
}

PreviewForm.propTypes = {
  schema: PropTypes.object,
};
