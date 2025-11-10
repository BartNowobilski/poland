import React from "react";

export default function Gallery({ lang }) {
  const labels = {
    en: {
      gallery: "Gallery",
      interior: "Interior",
      exterior: "Exterior",
    },
    pl: {
      gallery: "Galeria",
      interior: "Wnętrza",
      exterior: "Zewnętrze",
    },
  };

  const t = labels[lang] || labels.en;
  const interior = [
    "/S1.jpg",
    "/S2.JPG",
    "/S3.JPG",
    "/S4.JPG",
    "/S5.JPG",
    "/S6.JPG",
    "/S7.jpg",
    "/S8.jpg",
    "/S9.JPG",
    "/S15.jpg",
    "/S16.jpg",
    "/S17.jpg",
    "/S18.jpg",
    "/S19.jpg",
    "/S20.jpg",
    "/S21.jpg",
    "/S22.jpg",
    "/S23.jpg",
    "/S24.jpg",
    "/S25.jpg",
    "/S26.jpg",
    "/S27.jpg",
    "/S28.jpg",
    "/S29a.jpg",
    "/S29b.jpg",
    "/S29c.jpg",
    "/S30.jpg",
    "/S31.jpg",
    "/S32.jpg",
    "/S33.jpg",
    "/S34.jpg",
    "/S35.jpg",
    "/S36.jpg",
    "/S37.jpg",
    "/S39.jpg",
    "/S40.jpg",
    "/S41.jpg",
    "/S42.jpg",
    "/S43.jpg",
    "/S44.jpg",
    "/S45.jpg",
  ];

  const exterior = ["bialka.jpg", "h5.jpg", "h2.jpg", "h3.jpg", "h4.jpg"];
  return (
    <div className="section section-alt">
      <div className="container">
        {/* Main gallery title */}
        <h2
          className="h2"
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            textTransform: "uppercase",
          }}
        >
          {t.gallery}
        </h2>

        {/* INTERIOR SECTION */}
        <div style={{ marginBottom: "3rem" }}>
          <h3
            className="h3"
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {t.interior}
          </h3>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {interior.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${t.interior} ${i + 1}`}
                className="img"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>

        {/* EXTERIOR SECTION */}
        <div>
          <h3
            className="h3"
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {t.exterior}
          </h3>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {exterior.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${t.exterior} ${i + 1}`}
                className="img"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
