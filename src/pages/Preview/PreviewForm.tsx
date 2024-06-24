import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Container, Paper, Grid, Typography, Button } from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import PreviewField from './PreviewField';
import { useMemo } from 'react';
import { IField, IFormSchema } from '@/context/SchemaContext';
import {
  ERROR_MESSAGE_REQUIRED,
  ERROR_MESSAGE_EXCEED_MAX_LENGTH,
  ERROR_MESSAGE_INVALID_EMAIL,
  ERROR_MESSAGE_LESS_THAN_MIN_VALUE,
  ERROR_MESSAGE_EXCEED_MAX_VALUE,
} from '@/constants/validationConstants';

interface FormValues {
  [fieldKey: string]: string | number | null;
}
const generateInitFormValues = (fields: IField[]): FormValues => {
  let formValues: FormValues = {};
  fields.forEach((field) => {
    switch (field.type) {
      case FIELD_TYPES.TEXT_FIELD:
        formValues[field.key] = '';
        return;
      case FIELD_TYPES.NUMBER:
        formValues[field.key] = null;
        return;
      case FIELD_TYPES.EMAIL:
        formValues[field.key] = '';
        return;
      case FIELD_TYPES.DROPDOWN:
        formValues[field.key] = '';
        return;
    }
  });
  return formValues;
};

interface FormValidationSchema {
  [fieldKey: string]: yup.StringSchema<any> | yup.NumberSchema<any>;
}
const generateValidationSchema = (fields: IField[]) => {
  let validationSchema: FormValidationSchema = {};
  fields.forEach((field) => {
    let validators;
    switch (field.type) {
      case FIELD_TYPES.TEXT_FIELD:
        validators = yup.string();
        if (field.isRequired) {
          validators = validators.required(ERROR_MESSAGE_REQUIRED);
        }
        if (field.maxLength != null) {
          validators = validators.max(
            field.maxLength,
            ERROR_MESSAGE_EXCEED_MAX_LENGTH(field.maxLength)
          );
        }
        break;
      case FIELD_TYPES.NUMBER:
        validators = yup.number().nullable();
        if (field.isRequired) {
          validators = validators.required(ERROR_MESSAGE_REQUIRED);
        }
        if (field.minValue != null) {
          validators = validators.min(
            field.minValue,
            ERROR_MESSAGE_LESS_THAN_MIN_VALUE(field.minValue)
          );
        }
        if (field.maxValue != null) {
          validators = validators.max(
            field.maxValue,
            ERROR_MESSAGE_EXCEED_MAX_VALUE(field.maxValue)
          );
        }
        break;
      case FIELD_TYPES.EMAIL:
        validators = yup.string().email(ERROR_MESSAGE_INVALID_EMAIL);
        if (field.isRequired) {
          validators = validators.required(ERROR_MESSAGE_REQUIRED);
        }
        break;
      case FIELD_TYPES.DROPDOWN:
        validators = yup.string();
        if (field.isRequired) {
          validators = validators.required(ERROR_MESSAGE_REQUIRED);
        }
    }
    validationSchema[field.key] = validators;
  });
  return yup.object(validationSchema);
};

const PreviewForm: React.FC<{ schema: IFormSchema }> = ({ schema }) => {
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
      {({
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        setTouched,
        isValid,
      }) => (
        <Box
          component="form"
          data-testid="preview-form"
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
                      setTouched={setTouched}
                    />
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
      )}
    </Formik>
  );
};

export default PreviewForm;
