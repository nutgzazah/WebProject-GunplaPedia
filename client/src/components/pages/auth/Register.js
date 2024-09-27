import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { IoIosLock } from "react-icons/io";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//function
import { register } from '../../../functions/auth';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      name: data.get("name"),
      password: data.get("password"),
      passwordConfirmation: data.get("passwordConfirmation"),
    };

    // You may want to add validation here to check if passwords match
    if (formData.password !== formData.passwordConfirmation) {
      // alert("Passwords do not match");
      toast.error('Passwords do not match.');
      return;
    }

    register(formData)
      .then(res => {
        console.log(res);
        
        if (res.data === 'User Already Exists!!') {
          toast.error(res.data);
        } else if (res.data === 'Register Success!!') {
          toast.success(res.data);
        } else {
          toast.error("Unexpected response from server");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <div className="login">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
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
            <div className="input-box">
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <i><IoIosLock /></i>
            </div>
            <div class="remember-forget">
              <label><input required type="checkbox" />  I accept all terms & conditions</label>
            </div>
            <button type="submit" className="btn">Register</button>
            <div className="register-link">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </ThemeProvider>
  );
}

export default Register;
