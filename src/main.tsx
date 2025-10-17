import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@getpara/react-sdk/styles.css";
import App from "./App.tsx";
import { QueryProvider } from "./context/QueryProvider";
import { ParaProvider } from "./context/ParaProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // new dashboard page


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ParaProvider>
       <BrowserRouter>
          <Routes>
            {/* root route keeps your existing App exactly as-is */}
            <Route path="/" element={<App />} />
            {/* new dashboard route */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ParaProvider>
    </QueryProvider>
  </StrictMode>
);
