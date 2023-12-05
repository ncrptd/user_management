import { useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.auth.status);
  // const error = useSelector((state) => state.auth.error)


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (status === 'idle') {
      await dispatch(login({ email, password }));
      navigate('/')
    }

  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
          <button type="submit">Login</button>
        </form>
        <a href="#" className="google-login">Login with Google</a>
        <a href="#" className="forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;
