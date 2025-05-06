// src/App.js
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { Toaster } from "sonner";
import Feed from "./pages/Feed";
import AppLayout from "./UI/AppLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="feed" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
