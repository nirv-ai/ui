// TODO: moving shit into devDeps causes rendering errors?
// TODO: continue to add jsdocs to all fns, components, etc n things
// TODO: enable top level await in webopack: https://marmelab.com/blog/2021/07/22/cra-webpack-no-eject.html
// TODO: run this periodically: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports
// ^ yarn dlx  react-codemod update-react-imports
// ^ https://github.com/reactjs/react-codemod
// TODO: set Library dir as a project reference: https://www.typescriptlang.org/docs/handbook/project-references.html
// check this: https://github.com/tsmodule/tsmodule#installation
// TODO: read this https://github.com/microsoft/TypeScript/wiki/Performance#writing-easy-to-compile-code
// TODO: https://github.com/microsoft/TypeScript-Handbook/blob/master/pages/tutorials/tsconfig.json.md#types-typeroots-and-types
// TODO: add validator.js for all form validation

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Router } from "Router";
import { reportWebVitals } from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Router />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
