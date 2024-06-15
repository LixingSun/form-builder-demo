import { Typography, Grid, Card, CardContent } from '@mui/material';

export default function EditorMenu() {
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
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>Text Field</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
