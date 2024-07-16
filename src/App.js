import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBuilder from './components/FormBuilder';
import FormDisplay from './components/FormDisplay';
import FormResponses from './components/FormResponses';

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/create-form" element={<FormBuilder />} />
                  <Route path="/form/:formId" element={<FormDisplay />} />
                  <Route path="/responses/:formId" element={<FormResponses />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
