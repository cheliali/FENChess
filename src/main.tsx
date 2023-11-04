import React from "react";
import ReactDOM from "react-dom/client";
import { FENChess } from "./FENChess";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FENChess />
  </React.StrictMode>
);
