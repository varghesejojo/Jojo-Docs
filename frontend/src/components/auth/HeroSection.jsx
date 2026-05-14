import heroImg from "../../assets/hero.png";
function HeroSection() {
  return (
    <div className="hidden md:flex w-1/2 bg-[#0f1729] flex-col justify-between p-12 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-lg">
          ✦
        </div>
        <span className="font-serif text-[17px] font-bold text-slate-200 tracking-tight">
          Jojo Docs
        </span>
      </div>

      {/* Main heading */}
      <div className="flex-1 flex flex-col justify-center py-8 relative z-10">
        <p className="text-[11px] font-medium tracking-[2px] uppercase text-indigo-400 mb-5">
          Intelligent workspace
        </p>
        <h1 className="font-serif text-[38px] font-bold leading-[1.12] text-slate-100 tracking-tight mb-5">
          Write{" "}
          <em className="not-italic text-indigo-400 font-light">smarter,</em>
          <br />
          think deeper.
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed max-w-70">
          Collaborate, create and organize documents seamlessly in one
          intelligent workspace.
        </p>
      </div>

      {/* Feature list */}
      <div className="flex flex-col gap-3.5 relative z-10">
        {[
          { label: "AI-powered writing assistance", color: "bg-indigo-500" },
          { label: "Real-time collaboration", color: "bg-teal-500" },
          { label: "Smart organization & search", color: "bg-violet-500" },
        ].map((feat) => (
          <div key={feat.label} className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${feat.color}`} />
            <span className="text-[13px] text-slate-400">{feat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HeroSection;