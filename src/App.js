import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lost from './components/Lost';
import LostForm from './components/LostForm';
import Find from './components/Find';
import FindForm from './components/FindForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lost />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/lost-form" element={<LostForm />} />
        <Route path="/find" element={<Find />} />
        <Route path="/find-form" element={<FindForm />} />
      </Routes>
    </Router>
  );
}

export default App;