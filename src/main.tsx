import "reflect-metadata";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { container } from "./config";
import { DIProvider } from "./providers";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DIProvider container={container}>
      <App />
    </DIProvider>
  </StrictMode>
);
