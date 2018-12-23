import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./js/components/Main";

const App = () => (
  <BrowserRouter>
    <div>
      <Main />
    </div>
  </BrowserRouter>
);

export default App;
