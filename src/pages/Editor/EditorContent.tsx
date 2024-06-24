import { useState, useContext } from 'react';
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
  IField,
  IFormSchema,
  SCHEMA_ACTION_TYPE,
  SchemaContext,
} from '@/context/SchemaContext';
import FormTitleDialog from './FormTitleDialog';

interface IEditorContentProps {
  schema: IFormSchema;
}
const EditorContent: React.FC<IEditorContentProps> = ({ schema }) => {
  const [isFieldEditingOpen, setIsFieldEditingOpen] = useState<boolean>(false);
  const [fieldEditingId, setFieldEditingId] = useState<string>('');
  const [fieldEditingType, setFieldEditingType] = useState<FIELD_TYPES>(
    FIELD_TYPES.TEXT_FIELD
  );
  const [fieldEditingInitialValues, setFieldEditingInitialValues] =
    useState<IField | null>(null);
  const [isFormEditingOpen, setIsFormEditingOpen] = useState<boolean>(false);
  const { schemaDispatch } = useContext(SchemaContext);

  const handleEditField = (field: IField) => {
    setFieldEditingType(field.type);
    setFieldEditingId(field.id);
    setFieldEditingInitialValues(field);
    setIsFieldEditingOpen(true);
  };

  const handleDeleteField = (field: IField) => {
    schemaDispatch({ type: SCHEMA_ACTION_TYPE.DELETE_FIELD, field: field });
  };

  const handleMoveUpField = (field: IField) => {
    schemaDispatch({ type: SCHEMA_ACTION_TYPE.MOVE_UP_FIELD, field: field });
  };

  const handleMoveDownField = (field: IField) => {
    schemaDispatch({ type: SCHEMA_ACTION_TYPE.MOVE_DOWN_FIELD, field: field });
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
            const FieldIcon = FIELD_TYPE_ICON_MAPPING[field.type];
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
        key={fieldEditingId}
        fieldId={fieldEditingId}
        open={isFieldEditingOpen}
        fieldType={fieldEditingType}
        fieldDisplayName={FIELD_TYPE_NAME_MAPPING[fieldEditingType]}
        initialValues={fieldEditingInitialValues}
        onClose={() => setIsFieldEditingOpen(false)}
        onSubmit={(formData) => {
          schemaDispatch({
            type: SCHEMA_ACTION_TYPE.EDIT_FIELD,
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
          schemaDispatch({
            type: SCHEMA_ACTION_TYPE.UPDATE_FORM_SETTINGS,
            settings: formData,
          });
          setIsFormEditingOpen(false);
        }}
      />
    </>
  );
};

export default EditorContent;
