import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lost from './components/Lost';
import LostForm from './components/LostForm';
import Find from './components/Find';
import FindForm from './components/FindForm';
import Here from './components/Here';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Find />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/lostform" element={<LostForm />} />
        <Route path="/got" element={<Find />} />
        <Route path="/findform" element={<FindForm />} />
        <Route path="/here" element={<Here />} />
      </Routes>
    </Router>
  );
}

export default App;