import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./components/layout/Ornament.css";
import App from "./App.jsx";
import ScrollManager from "./ScrollManager.jsx";
import LanguageProvider from "./i18n/LanguageProvider.jsx";
import { enableReveal } from "./lib/reveal";

enableReveal();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ScrollManager />
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
