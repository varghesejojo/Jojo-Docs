import GoogleAuthButton from "./GoogleAuthButton";


function AuthCard() {
  return (
    <div className="w-full md:w-1/2 bg-[#0e1320] flex items-center justify-center p-10">
      <div className="w-full max-w-85">

        {/* Badge + title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-3 py-1 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-[11px] text-indigo-400 font-medium tracking-wide">
              Secure login
            </span>
          </div>
          <h2 className="font-serif text-[28px] font-bold text-slate-100 tracking-tight mb-2">
            Sign in to continue
          </h2>
          <p className="text-[13px] text-slate-500">
            Access your documents and workspace
          </p>
        </div>

        {/* Google button */}
        <GoogleAuthButton />

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/6" />
          <span className="text-[11px] text-slate-600 font-medium tracking-widest">
            OR
          </span>
          <div className="flex-1 h-px bg-white/6" />
        </div>

        {/* Coming soon */}
        <button
          disabled
          className="w-full py-3.5 px-5 bg-white/2 border border-white/6 rounded-xl text-[13px] text-slate-600 cursor-not-allowed flex items-center justify-center gap-2"
        >
          Register / Login
          <span className="bg-white/4 rounded-full px-2 py-0.5 text-[10px] text-slate-700 uppercase tracking-wide font-medium">
            Coming soon
          </span>
        </button>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-700 mt-7">
          🔒 Secure authentication powered by Google
        </p>
      </div>
    </div>
  );
}
export default AuthCard;