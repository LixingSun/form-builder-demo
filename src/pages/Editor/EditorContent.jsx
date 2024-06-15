import { Typography, CardContent, Container, Card, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';

export default function EditorContent({ schema }) {
  return (
    <>
      <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h6" component="div">
            {schema.title}
          </Typography>

          {schema.fields.map((field) => (
            <Card key={field.id}>
              <CardContent>
                <Typography>{field.title}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </>
  );
}

EditorContent.propTypes = {
  schema: PropTypes.object,
};
