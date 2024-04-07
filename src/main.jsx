import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "../contexts/authContext"
import "./index.css"
import Dashboard from "./routes/Dashboard"
import ErrorPage from "./routes/ErrorPage"
import Home from "./routes/Home"
import Layout from "./routes/Layout"
import Profil from "./routes/Profil"

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
        path: "/Dashboard",
        element: <Dashboard />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
