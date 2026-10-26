import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./components/layout/Ornament.css";
import Root from "./Root.jsx";
import { enableReveal } from "./lib/reveal";

enableReveal();

const app = (
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);

const container = document.getElementById("root");
// Production pages are prerendered to HTML at build time → hydrate them.
// The dev server serves an empty #root → render from scratch.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
