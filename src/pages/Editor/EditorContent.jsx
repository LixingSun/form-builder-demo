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
import { PropTypes } from 'prop-types';
import {
  FIELD_TYPE_ICON_MAPPING,
  FIELD_TYPES,
} from '@/constants/fieldConstants';

export default function EditorContent({ schema }) {
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
                      <Grid container columnSpacing={1}>
                        <Grid Item>
                          <IconButton size="small" aria-label="Edit">
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                        <Grid Item>
                          <IconButton size="small" aria-label="Delete">
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                        <Grid Item>
                          <IconButton
                            size="small"
                            aria-label="Move Up"
                            disabled={index == 0}
                          >
                            <KeyboardArrowUpIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                        <Grid Item>
                          <IconButton
                            size="small"
                            aria-label="Move Down"
                            disabled={index == schema.fields.length - 1}
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
    </>
  );
}

EditorContent.propTypes = {
  schema: PropTypes.object,
};
