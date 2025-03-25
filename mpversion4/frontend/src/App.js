

// import React, { useState } from 'react'; 
// import Login from './components/Login';
// import Interview from './components/Interview';
// import AdminComponent from './components/AdminComponent';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState('');

//   return (
//     <div>
//       <Login setAuth={setIsAuthenticated} setRole={setRole} />
//       {isAuthenticated && role === 'admin' && <AdminComponent />}
//       {isAuthenticated && role === 'candidate' && <Interview />}
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import AdminComponent from './components/AdminComponent';
// import Interview from './components/Interview';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState('');

//   return (
//     <Router>
//       <div>
//         {!isAuthenticated ? (
//           <Login setAuth={setIsAuthenticated} setRole={setRole} />
//         ) : (
//           <Routes>
//             <Route path="/admin" element={<AdminComponent />} />
//             <Route path="/interview" element={<Interview />} />
//           </Routes>
//         )}

//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminComponent from './components/AdminComponent';
import Interview from './components/Interview';
import Results from './components/Results';
import TestEvaluation from './components/TestEvaluation'; // Add this for testing

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [evaluationData, setEvaluationData] = useState(null);

  // Check auth status on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You might want to verify token validity here
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole('');
    setEvaluationData(null);
  };

  return (
    <Router>
      <div className="app-container">
        {!isAuthenticated ? (
          <Login setAuth={setIsAuthenticated} setRole={setRole} />
        ) : (
          <>
            <nav className="app-nav">
              <button onClick={handleLogout}>Logout</button>
              {role === 'admin' && (
                <a href="/admin">Admin Dashboard</a>
              )}
              <a href="/interview">Interview</a>
              {evaluationData && (
                <a href="/results">View Results</a>
              )}
              {role === 'admin' && (
                <a href="/test-evaluation">Test Evaluation</a>
              )}
            </nav>

            <Routes>
              <Route 
                path="/admin" 
                element={role === 'admin' ? <AdminComponent /> : <Navigate to="/interview" />} 
              />
              <Route 
                path="/interview" 
                element={<Interview setEvaluationData={setEvaluationData} />} 
              />
              <Route 
                path="/results" 
                element={evaluationData ? <Results data={evaluationData} /> : <Navigate to="/interview" />} 
              />
              {role === 'admin' && (
                <Route path="/test-evaluation" element={<TestEvaluation />} />
              )}
              <Route path="*" element={<Navigate to={role === 'admin' ? "/admin" : "/interview"} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}
// function App()
// {
//   return(<div>
//     <Interview /> 
//   </div>)
// }


export default App;