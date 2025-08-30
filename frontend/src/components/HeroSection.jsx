const HeroSection = ({ title, subtitle, onButtonClick }) => {
  return (
    <div className="hero-section bg-gradient-to-r from-green-400 to-green-600 text-center py-16 px-8">
      {/* Main heading (value proposition) */}
      <h1>{title}</h1>
      {/* Background (image or gradient) */}
      {/* // - Subtext (supporting message) */}
      <p>{subtitle}</p>

      {/* // - CTA button (Shop Now) */}
      <button className="btn btn-primary" onClick={onButtonClick}>
        Shop Now
      </button>
      {/* // - Optional: Hero image/illustration */}
    </div>
  );
};
export default HeroSection;
