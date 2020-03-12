import React from "react";

import { PipeManager } from "../pipeManager/PipeManager";

import classes from "./App.module.scss";

function App() {
  return (
    <div className={classes.App}>
      <PipeManager />
    </div>
  );
}

export default App;
