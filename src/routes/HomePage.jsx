import { 
  AppBar, 
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Container,
  Card,
  CardContent,
  Stack
 } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';

export default function Home() {
  return (
    <Box sx={{minHeight: "100vh", display: 'flex', flexDirection: 'column'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Form Builder Demo
          </Typography>
          <Button color="inherit" endIcon={<PreviewIcon />}>Preview</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', bgcolor: "#eeeeee"}}>
        <Grid container sx={{flex: 1}}>
          <Grid item xs={12} md={3} sx={{p: 4, bgcolor: "primary.light"}}>
            <Typography variant="h6" color="primary.contrastText" sx={{marginBottom: 2}}>Create Field</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography>Text Field</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={9}>
            <Container maxWidth="sm" sx={{paddingTop: 4}}>
              <Stack spacing={2}>
                <Typography variant="h6">Test Form</Typography>
                <Card>
                  <CardContent>Placeholder</CardContent>
                </Card>
              </Stack>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}