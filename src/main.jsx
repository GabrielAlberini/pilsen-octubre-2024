import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { removeItem } from "./utils/localStorage.js";
removeItem("lastGenerated");
removeItem("generatedImage");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
