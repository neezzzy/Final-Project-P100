import React from "react";

export const HeroBanner: React.FC = () => {
  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo"></div>
      <h1 className="hero-banner__headline">Campus Connect</h1>
      <p className="hero-banner__description">
        Welcome to new way to find the best projects that suits your needs.{" "}
        <strong>#winning</strong>.
      </p>
    </div>
  );
};
