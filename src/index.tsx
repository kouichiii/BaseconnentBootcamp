import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
