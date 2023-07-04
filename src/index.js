import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import {AuthProvider} from "./context/AuthProvider";
import Home from "./Home/Home";
import VideoZego from "./zego/VideoZego";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App />}>
                      <Route path="login" element={<Login/>}/>
                      <Route path="register" element={<Register/>}/>
                  </Route>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/home/room/:roomID" element={<VideoZego/>}/>
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);

