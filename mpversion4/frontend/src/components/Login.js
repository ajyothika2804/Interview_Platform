// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = ({ setAuth, setRole }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRoleState] = useState('candidate');

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const endpoint = role === 'admin' 
//                 ? 'http://localhost:5000/api/auth/login/admin' 
//                 : 'http://localhost:5000/api/auth/login/candidate';

//             const res = await axios.post(endpoint, { username, password });
            
//             if (res.data.success) {
//                 localStorage.setItem('token', res.data.token); // Store JWT
//                 setAuth(true); // Set authentication to true
//                 setRole(role); // Set the role of the user
//                 alert(`Login successful as ${role}`);
//             } else {
//                 alert('Invalid credentials');
//             }
//         } catch (err) {
//             alert('An error occurred during login');
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input 
//                     type="text" 
//                     placeholder="Username" 
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)} 
//                     required 
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                 />
//                 <select value={role} onChange={(e) => setRoleState(e.target.value)}>
//                     <option value="candidate">Candidate</option>
//                     <option value="admin">HR/Admin</option>
//                 </select>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;


// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "../styles/login.css"

// const Login = ({ setAuth, setRole }) => {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRoleState] = useState("candidate")
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()

//     try {
//       const endpoint =
//         role === "admin"
//           ? "http://localhost:5000/api/auth/login/admin"
//           : "http://localhost:5000/api/auth/login/candidate"

//       const res = await axios.post(endpoint, { username, password })

//       if (res.data.success) {
//         setAuth(true)
//         setRole(role)
//         alert(`Login successful as ${role}`)

//         if (role === "admin") {
//           navigate("/admin")
//         } else {
//           navigate("/interview")
//         }
//       } else {
//         alert("Invalid credentials")
//       }
//     } catch (err) {
//       console.error(err)
//       alert("An error occurred during login: " + err.message)
//     }
//   }

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//           <h2 className="mb-4">Login</h2>
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="d-flex">
//               <select className="form-select me-2" value={role} onChange={(e) => setRoleState(e.target.value)}>
//                 <option value="candidate">Candidate</option>
//                 <option value="admin">HR/Admin</option>
//               </select>
//               <button type="submit" className="btn btn-light border">
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login



import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

const Login = ({ setAuth, setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoleState] = useState("candidate");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateForm(true);
    }, 100);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint =
        role === "admin"
          ? "http://localhost:5000/api/auth/login/admin"
          : "http://localhost:5000/api/auth/login/candidate";

      const res = await axios.post(endpoint, { username, password });

      if (res.data.success) {
        // Show success animation
        document.querySelector('.login-form').classList.add('success');
        
        setTimeout(() => {
          setAuth(true);
          setRole(role);
          
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/interview");
          }
        }, 1000);
      } else {
        // Show error animation
        document.querySelector('.login-form').classList.add('error');
        setTimeout(() => {
          document.querySelector('.login-form').classList.remove('error');
          alert("Invalid credentials");
          setIsLoading(false);
        }, 500);
      }
    } catch (err) {
      console.error(err);
      // Show error animation
      document.querySelector('.login-form').classList.add('error');
      setTimeout(() => {
        document.querySelector('.login-form').classList.remove('error');
        alert("An error occurred during login: " + err.message);
        setIsLoading(false);
      }, 500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
        <div className="shape shape4"></div>
      </div>
      
      <div className={`login-card ${animateForm ? 'animate' : ''}`}>
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your account</p>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">
              <i className="fas fa-user"></i> Username
            </label>
            <div className="input-focus-effect"></div>
          </div>
          
          <div className="form-floating mb-4 password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password
            </label>
            <button 
              type="button" 
              className="password-toggle" 
              onClick={togglePasswordVisibility}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
            <div className="input-focus-effect"></div>
          </div>
          
          <div className="form-floating mb-4">
            <select 
              className="form-select" 
              id="role" 
              value={role} 
              onChange={(e) => setRoleState(e.target.value)}
            >
              <option value="candidate">Candidate</option>
              <option value="admin">HR/Admin</option>
            </select>
            <label htmlFor="role">
              <i className="fas fa-user-tag"></i> Login As
            </label>
            <div className="input-focus-effect"></div>
          </div>
          
          <button 
            type="submit" 
            className="login-button" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            ) : (
              <>
                <span className="button-text">Login</span>
                <span className="button-icon">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </>
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="#">Register</a></p>
          <p><a href="#">Forgot Password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
