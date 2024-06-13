import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home'; // Importa HomePage
import Pasteles from './components/PaginaPasteles'; // Importa el componente Pasteles
import ServicesTab from './components/Service';
const App = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pasteles" element={<Pasteles />}/>
            <Route path="/services" element={<ServicesTab />}/>
          </Routes>
        </Router>
    );
}

export default App;
