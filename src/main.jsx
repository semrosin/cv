import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import Snowfall from "react-snowfall";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Snowfall snowflakeCount={90} /> */}
    <App />
  </StrictMode>
);
