import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import JwtService from '../../services/JwtService';
import cookie from 'react-cookies';
import { JWT_TOKEN_COOKIE_NAME } from '../../constants';

export default function LoginDialog(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleLogin = () => {
      // call jwt service (AJAX)
      JwtService.login(username, password)
      .then(response => {
          //    store the access data into cookies
          cookie.save(JWT_TOKEN_COOKIE_NAME, response.data.access);
          window.location.reload();
      })
      .catch(error => {
          console.log(error);
          setErrorMessage(error.response.data.detail);
    });
  }

  return (
    <div>
      <Dialog open={props.dialogOpen} onClose={props.closeDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="email"
            fullWidth
            variant="standard"
            onChange={event => {setUsername(event.target.value)}}
          />

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={event => {setPassword(event.target.value)}}
          />
        </DialogContent>
        <DialogContentText color="error">
            {errorMessage}
          </DialogContentText>
        <DialogActions>
          <Button onClick={props.closeDialog}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
