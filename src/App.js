import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import FormsList from './components/FormsList';
import FormBuilder from './components/FormBuilder';
import FormDisplay from './components/FormDisplay';
import FormResponses from './components/FormResponses';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                  <Route path="/form-create" element={<PrivateRoute><FormBuilder /></PrivateRoute>} />
                  <Route path="/forms-list" element={<PrivateRoute><FormsList /></PrivateRoute>} />
                  <Route path="/responses/:formId" element={<FormResponses />} />
                  <Route path="/forms/:formId" element={<FormDisplay />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
