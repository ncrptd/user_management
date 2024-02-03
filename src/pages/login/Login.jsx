import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { useTheme } from '@emotion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    await dispatch(login({ email, password }));
    navigate('/');
  };

  const theme = useTheme();
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '30px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLoginSubmit} style={{ marginTop: '20px' }}>
            <TextField label="Email" type="email" value={email} onChange={handleEmailChange} fullWidth required />
            <div style={{ marginTop: '20px', position: 'relative' }}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handleTogglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth style={{
              marginTop: '30px', backgroundColor: theme.palette.primary.brand,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.secondary.brand,
              },
            }}>
              Login
            </Button>
          </form>
          {error && <Typography variant="body2" color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
