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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Posts",
        element: <Posts />,
        children: [
          {
            path: "details/:id",
            element: <PostDetails />,
          },
        ],
      },
      {
        path: "/AddPost",
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
