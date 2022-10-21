// TODO: removing "^" from package.json deps causes rendering errors?
// TODO: moving shit into devDeps causes rendering errors?
// TODO: continue to add jsdocs to all fns, components, etc n things
// TODO: enable top level await in webopack: https://marmelab.com/blog/2021/07/22/cra-webpack-no-eject.html
import React from "react";
import ReactDOM from "react-dom/client";

import { Router } from "Router";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
