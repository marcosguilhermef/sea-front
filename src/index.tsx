import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import ListUsers from './Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditUser from './EditUser';
import AddUser from './AddUser'
import Login from './Login'
import ProtectedRoute from './PortectedRoute';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<ListUsers />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/:id" element={<EditUser />} />
          <Route path="/users/add-user" element={<AddUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
