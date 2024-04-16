import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Home, HomeTest } from "./components"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<HomeTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
