import "./configs/configureMobX.ts";

import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "./styles/styles.scss";

import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

if(module.hot) {
  module.hot.accept();
}
