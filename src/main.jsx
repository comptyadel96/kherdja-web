import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Dashboard from "./screens/Dashboard"
import ErrorPage from "./screens/ErrorPage"
import Home from "./screens/Home"
import Layout from "./screens/Layout"
import Profil from "./screens/Profil"
import Login from "./screens/Login"
import Posts from "./screens/Posts"
import PostDetails from "./screens/PostDetails"
import AddPost from "./screens/dashboard/AddPost"
import ModifyPost from "./screens/dashboard/ModifyPost" // Importez le composant ModifyPost

import ReactGA from "react-ga4"

ReactGA.initialize("G-P21J5FR9C4")


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profil",
        element: <Profil />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/details/:id",
        element: <PostDetails />,
      },
      {
        path: "posts/modify/:id", // Ajoutez cette route pour la modification des posts
        element: <ModifyPost />,
      },
      {
        path: "addpost",
        element: <AddPost />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
