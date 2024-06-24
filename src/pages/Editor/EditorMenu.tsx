import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import FieldDialog from './FieldDialog';
import React, { useContext, useState } from 'react';
import {
  FIELD_TYPES,
  FIELD_TYPE_NAME_MAPPING,
  FIELD_TYPE_ICON_MAPPING,
} from '@/constants/fieldConstants';
import { SchemaContext, SCHEMA_ACTION_TYPE } from '@/context/SchemaContext';
import { v4 as uuidv4 } from 'uuid';

interface IEditorMenuItemProps {
  name: string;
  id: string;
  icon: JSX.ElementType;
  onClick(): void;
}
const EditorMenuItem: React.FC<IEditorMenuItemProps> = ({
  name,
  id,
  icon: Icon,
  onClick,
}) => {
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

const fieldTypes = Object.values(FIELD_TYPES);

export default function EditorMenu() {
  const [isFieldCreationOpen, setIsFieldCreationOpen] =
    useState<boolean>(false);
  const [fieldCreationType, setFieldCreationType] = useState<FIELD_TYPES>(
    FIELD_TYPES.TEXT_FIELD
  );
  const [fieldCreationId, setFieldCreationId] = useState<string>(uuidv4());
  const { schemaDispatch } = useContext(SchemaContext);

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
        {fieldTypes.map((fieldType) => {
          return (
            <Grid item key={fieldType} xs={12} sm={6} md={12} lg={6}>
              <EditorMenuItem
                id={`${fieldType}-menu-item`}
                name={FIELD_TYPE_NAME_MAPPING[fieldType]}
                icon={FIELD_TYPE_ICON_MAPPING[fieldType]}
                onClick={() => {
                  setFieldCreationId(uuidv4());
                  setFieldCreationType(fieldType);
                  setIsFieldCreationOpen(true);
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <FieldDialog
        key={fieldCreationId}
        fieldId={fieldCreationId}
        open={isFieldCreationOpen}
        fieldType={fieldCreationType}
        fieldDisplayName={FIELD_TYPE_NAME_MAPPING[fieldCreationType]}
        onClose={() => setIsFieldCreationOpen(false)}
        onSubmit={(formData) => {
          schemaDispatch({
            type: SCHEMA_ACTION_TYPE.ADD_FIELD,
            field: formData,
          });
          setIsFieldCreationOpen(false);
        }}
      />
    </>
  );
}
