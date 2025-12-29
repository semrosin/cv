import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Snowfall from "react-snowfall";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Snowfall snowflakeCount={90} />
    <App />
  </StrictMode>
);
