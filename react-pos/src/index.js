import React from "react";
import { render } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

render(
  <App />,
  document.getElementById("root")
);
registerServiceWorker();
