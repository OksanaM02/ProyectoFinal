import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home'; // Importa HomePage

const App = () => {
    return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} /> {/* Define la ruta para HomePage */}
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
    );
}

export default App;
