import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PreviewIcon from '@mui/icons-material/Preview';


export default function Home() {
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Form Builder Demo
          </Typography>
          <Button color="inherit" endIcon={<PreviewIcon />}>Preview</Button>
        </Toolbar>
      </AppBar>
  );
}