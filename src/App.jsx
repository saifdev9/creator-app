// src/App.js
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { Toaster } from "sonner";
import Feed from "./pages/Feed";
import AppLayout from "./UI/AppLayout";
import SavedFeed from "./pages/SavedFeed";
import ProctedRoute from "./pages/ProctedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/app"
          element={
            <ProctedRoute>
              <AppLayout />
            </ProctedRoute>
          }
        >
          <Route index element={<Navigate to="feed"/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="feed" element={<Feed />} />
          <Route path="saved-feeds" element={<SavedFeed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
