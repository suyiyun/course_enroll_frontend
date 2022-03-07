import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LoginDialog from './dialog/LoginDialog';
import { JWT_TOKEN_COOKIE_NAME } from '../constants';
import cookie from 'react-cookies';


export default function MenuBar() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const closeDialog = () => {
    setDialogOpen(false);
  };
  const handleLogout = () => {
    cookie.remove(JWT_TOKEN_COOKIE_NAME);
    window.location.replace('/');
  }

  const accessToken = cookie.load(JWT_TOKEN_COOKIE_NAME);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Course Enrolled Systems
          </Typography>
          <Button exact="true" to = "/" component={Link} color="inherit">All Courses</Button>   
          {
            accessToken ? (
              <>
                <Button exact="true" to = "/enrolled" component={Link} color="inherit">Enrolled Courses</Button>
                <Button exact="true" color="inherit" onClick={handleLogout}>Logout</Button>
              </>
              ) : (
              <Button exact="true" color="inherit" onClick={() => setDialogOpen(true)}>Login</Button>
            )
          }


        </Toolbar>
        <LoginDialog dialogOpen={dialogOpen} closeDialog={closeDialog}/>
      </AppBar>
    </Box>
  );
}
