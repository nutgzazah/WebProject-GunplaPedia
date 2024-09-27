import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginRedux } from '../../../store/userSlice';
import { login } from '../../../functions/auth';
import { FaUser } from "react-icons/fa";
import { IoIosLock } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Assuming you copied your friend's CSS file

const defaultTheme = createTheme();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      name: data.get('name'),
      password: data.get('password'),
    };

    login(formData)
      .then((res) => {
        console.log(res);
        dispatch(
          loginRedux({
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
            token: res.data.token,
          })
        );
        localStorage.setItem('token', res.data.token);
        roleRedirects(res.data.payload.user.role);
        toast.success('Login successful!');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Incorrect username or password. Please try again.');
      });
  };

  const roleRedirects = (role) => {
    if (role === 'admin') {
      navigate('/admin/index');
    } else {
      navigate('/gunpla');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="app-container">
        <div className="login">
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="input-box">
                <input type="text" name="name" placeholder="Username" required />
                <i><FaUser /></i>
              </div>
              <div className="input-box">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  required
                />
                <i onClick={togglePasswordVisibility} className="password-toggle-icon">
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </i>
              </div>
              <div className="remember-forget">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
              </div>
              <button type="submit" className="btn">Login</button>
              <div className="register-link">
                <p>Don't have an account? <Link to="/register"><a href="#">Register</a></Link></p>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </ThemeProvider>
  );
}

export default Login;
