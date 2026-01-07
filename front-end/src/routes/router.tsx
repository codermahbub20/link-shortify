import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Components/Pages/Home/Home";
import NotFoundPage from "../Components/Pages/NotFound/NotFoundPage";
import { RegistrationForm } from "../Components/Pages/Authentication/Registration/RegistrationForm";
import { LoginForm } from "../Components/Pages/Authentication/Login/LoginForm";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        
      },{
        path:"/signup",
        element:<RegistrationForm/>
      },
      { 
        path:"/login",
        element:<LoginForm/>
      }
    ],
  }

]);
