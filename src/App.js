import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import DndPractice from './pages/DndPractice';
import Login from "./pages/Login";
import Projects from './pages/Projects';
import Register from "./pages/Register";
import Teams from './pages/Teams';


function App() {
  const authChecked = useAuthCheck();
  return authChecked ?
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/teams" element={<PrivateRoute><Teams /></PrivateRoute>} />
          <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
          <Route path="/dnd" element={<PrivateRoute><DndPractice /></PrivateRoute>} />
        </Routes>
      </DndProvider>
    </BrowserRouter>
    : <p>Checking Auth</p>
    ;
}

export default App;
