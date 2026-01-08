// src/router/router.ts (or wherever your router file is)

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Components/Pages/Home/Home";
import NotFoundPage from "../Components/Pages/NotFound/NotFoundPage";
import { RegistrationForm } from "../Components/Pages/Authentication/Registration/RegistrationForm";
import LoginForm from "../Components/Pages/Authentication/Login/LoginForm";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import DashboardHome from "../Components/DashBoard/DashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // same as path: "/"
        element: <Home />,
      },
      {
        path: "signup",
        element: <RegistrationForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true, 
            element: <DashboardHome />,
          },
          // {
          //   path: "my-links",
          //   element: <MyLinks />,
          // },
          // {
          //   path: "analytics",
          //   element: <Analytics />,
          // },
          // {
          //   path: "settings",
          //   element: <Settings />,
          // },
        ],
      },
    ],
  },
]);