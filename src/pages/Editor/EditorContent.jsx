import { useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import {
  Typography,
  CardContent,
  Container,
  Card,
  Stack,
  Grid,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import {
  FIELD_TYPE_ICON_MAPPING,
  FIELD_TYPE_NAME_MAPPING,
  FIELD_TYPES,
} from '@/constants/fieldConstants';
import FieldDialog from './FieldDialog';
import {
  ACTION_TYPE_EDIT_FIELD,
  ACTION_TYPE_DELETE_FIELD,
  ACTION_TYPE_MOVE_UP_FIELD,
  ACTION_TYPE_MOVE_DOWN_FIELD,
  SchemaDispatchContext,
} from '@/context/SchemaContext';

export default function EditorContent({ schema }) {
  const [isFieldEdittingOpen, setIsFieldEdittingOpen] = useState(false);
  const [fieldEdittingType, setFieldEdittingType] = useState(
    FIELD_TYPES.textField
  );
  const [fieldEdittingInitialValues, setFieldEdittingInitialValues] =
    useState(null);
  const dispatch = useContext(SchemaDispatchContext);

  const handleEditField = (field) => {
    setFieldEdittingType(field.type);
    setIsFieldEdittingOpen(true);
    setFieldEdittingInitialValues(field);
  };

  const handleDeleteField = (field) => {
    dispatch({ type: ACTION_TYPE_DELETE_FIELD, field: field });
  };

  const handleMoveUpField = (field) => {
    dispatch({ type: ACTION_TYPE_MOVE_UP_FIELD, field: field });
  };

  const handleMoveDownField = (field) => {
    dispatch({ type: ACTION_TYPE_MOVE_DOWN_FIELD, field: field });
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h6" component="div">
            {schema.title}
          </Typography>

          {schema.fields.map((field, index) => {
            const FieldIcon = FIELD_TYPE_ICON_MAPPING[FIELD_TYPES[field.type]];
            return (
              <Card key={field.id}>
                <CardContent sx={{ paddingY: 2 }}>
                  <Grid container columnSpacing={2} alignItems="center">
                    <Grid item>
                      <FieldIcon sx={{ display: 'block' }} />
                    </Grid>
                    <Grid item>
                      <Typography>
                        {field.title}
                        {field.isRequired && '*'}
                      </Typography>
                    </Grid>
                    <Grid item xs></Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item>
                          <IconButton
                            size="small"
                            aria-label="Edit"
                            data-testid={`edit-field-button-${index}`}
                            onClick={() => handleEditField(field)}
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            size="small"
                            aria-label="Delete"
                            data-testid={`delete-field-button-${index}`}
                            onClick={() => handleDeleteField(field)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            size="small"
                            aria-label="Move Up"
                            disabled={index == 0}
                            data-testid={`move-up-field-button-${index}`}
                            onClick={() => handleMoveUpField(field)}
                          >
                            <KeyboardArrowUpIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            size="small"
                            aria-label="Move Down"
                            disabled={index == schema.fields.length - 1}
                            data-testid={`move-down-field-button-${index}`}
                            onClick={() => handleMoveDownField(field)}
                          >
                            <KeyboardArrowDownIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
                {/* To avoid forced paddingBottom of CardContent set by MUI when it is the last child */}
                <span />
              </Card>
            );
          })}
        </Stack>
      </Container>

      <FieldDialog
        open={isFieldEdittingOpen}
        fieldType={fieldEdittingType}
        fieldDisplayName={FIELD_TYPE_NAME_MAPPING[fieldEdittingType]}
        initialValues={fieldEdittingInitialValues}
        onClose={() => setIsFieldEdittingOpen(false)}
        onSubmit={(formData) => {
          dispatch({
            type: ACTION_TYPE_EDIT_FIELD,
            field: formData,
          });
          setIsFieldEdittingOpen(false);
        }}
      />
    </>
  );
}

EditorContent.propTypes = {
  schema: PropTypes.object,
};
