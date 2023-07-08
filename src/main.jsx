import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Instructions from "./pages/Instructions.jsx";
import Rules from "./pages/Rules.jsx";
import { MdHelp, MdHome, MdInfo } from "react-icons/md";

export const pages = [
  {
    path: "/",
    element: <Home />,
    title: "Beranda",
    icon: MdHome,
  },
  {
    path: "/rules",
    element: <Rules />,
    title: "Aturan",
    icon: MdInfo,
  },
  {
    path: "/instructions",
    element: <Instructions />,
    title: "Instruksi",
    icon: MdHelp,
  },
];

const router = createBrowserRouter([
  {
    element: <App />,
    children: pages,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
