import heroImg from "../../assets/hero.png";

function HeroSection() {
  return (
    <div className="hidden md:flex w-1/2 bg-linear-to-br from-slate-900 to-slate-800 items-center justify-center p-16">
      <div className="max-w-lg">
        <img
          src={heroImg}
          alt="Hero"
          className="w-72 mb-8 mx-auto"
        />

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Write smarter with Jojo Docs
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed">
          Collaborate, create and organize documents seamlessly
          in one intelligent workspace.
        </p>
      </div>
    </div>
  );
}

export default HeroSection;