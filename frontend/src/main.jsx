import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Landing from "./pages/Landing";
import Error404 from "./pages/Error404";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Budget from "./pages/Budget";
import Calendar from "./pages/Calendar";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact";
import DocShare from "./pages/DocShare";
import GroupParams from "./pages/GroupParams";
import Home from "./pages/Home";
import List from "./pages/List";
import LostPassword from "./pages/LostPassword";
import Parameters from "./pages/Parameters";
import ProfileParams from "./pages/ProfileParams";
import Recipe from "./pages/Recipe";

const router = createBrowserRouter([
  // Routes publiques
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/index",
    element: <Landing />,
  },

  {
    path: "*",
    element: <Error404 />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/lostpassword",
    element: <LostPassword />,
  },

  // Routes privées
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/calendar",
    element: <Calendar />,
  },

  {
    path: "/budget",
    element: <Budget />,
  },

  {
    path: "/todolist",
    element: <List />,
  },

  {
    path: "/recipes",
    element: <Recipe />,
  },

  {
    path: "/contacts",
    element: <Contact />,
  },

  {
    path: "/documents",
    element: <DocShare />,
  },

  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/settings",
    element: <Parameters />,
  },

  {
    path: "/profile",
    element: <ProfileParams />,
  },

  {
    path: "/group",
    element: <GroupParams />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
