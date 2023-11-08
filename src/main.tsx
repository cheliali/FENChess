import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { FENChess } from "./FENChess";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FENChess />
    </Provider>
  </React.StrictMode>
);
