import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";

// Design-system reference page, compiled out of production builds.
const Styleguide = import.meta.env.DEV ? lazy(() => import("./pages/Styleguide")) : null;

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      {/* transparent header over the homepage hero */}
      <Nav overlay={pathname === "/"} />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          {Styleguide && (
            <Route
              path="/styleguide"
              element={
                <Suspense fallback={null}>
                  <Styleguide />
                </Suspense>
              }
            />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
