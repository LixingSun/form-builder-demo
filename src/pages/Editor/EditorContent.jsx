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
  CardActionArea,
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
  ACTION_TYPE_UPDATE_FORM_SETTINGS,
  SchemaDispatchContext,
} from '@/context/SchemaContext';
import FormTitleDialog from './FormTitleDialog';

export default function EditorContent({ schema }) {
  const [isFieldEditingOpen, setIsFieldEditingOpen] = useState(false);
  const [fieldEditingType, setFieldEditingType] = useState(
    FIELD_TYPES.textField
  );
  const [fieldEditingInitialValues, setFieldEditingInitialValues] =
    useState(null);
  const [isFormEditingOpen, setIsFormEditingOpen] = useState(false);
  const dispatch = useContext(SchemaDispatchContext);

  const handleEditField = (field) => {
    setFieldEditingType(field.type);
    setIsFieldEditingOpen(true);
    setFieldEditingInitialValues(field);
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
          <Card>
            <CardActionArea
              data-testid="form-title-action-area"
              onClick={() => {
                setIsFormEditingOpen(true);
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {schema.title}
                </Typography>
                <Typography component="div">{schema.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

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
        open={isFieldEditingOpen}
        fieldType={fieldEditingType}
        fieldDisplayName={FIELD_TYPE_NAME_MAPPING[fieldEditingType]}
        initialValues={fieldEditingInitialValues}
        onClose={() => setIsFieldEditingOpen(false)}
        onSubmit={(formData) => {
          dispatch({
            type: ACTION_TYPE_EDIT_FIELD,
            field: formData,
          });
          setIsFieldEditingOpen(false);
        }}
      />

      <FormTitleDialog
        open={isFormEditingOpen}
        initialValues={{ title: schema.title, description: schema.description }}
        onClose={() => setIsFormEditingOpen(false)}
        onSubmit={(formData) => {
          dispatch({
            type: ACTION_TYPE_UPDATE_FORM_SETTINGS,
            settings: formData,
          });
          setIsFormEditingOpen(false);
        }}
      />
    </>
  );
}

EditorContent.propTypes = {
  schema: PropTypes.object,
};
