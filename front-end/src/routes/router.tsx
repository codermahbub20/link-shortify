import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Components/Pages/Home/Home";
import NotFoundPage from "../Components/Pages/NotFound/NotFoundPage";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ],
  }

]);
