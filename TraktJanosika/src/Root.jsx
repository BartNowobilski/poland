import App from "./App.jsx";
import ScrollManager from "./ScrollManager.jsx";
import LanguageProvider from "./i18n/LanguageProvider.jsx";

/* Provider tree shared by the browser entry (main.jsx) and the build-time
   prerenderer (entry-server.jsx). The router is supplied by the caller. */
export default function Root() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <App />
    </LanguageProvider>
  );
}
