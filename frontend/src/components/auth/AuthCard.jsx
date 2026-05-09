import GoogleAuthButton from "./GoogleAuthButton";

function AuthCard() {
  return (
    <div className="w-full md:w-1/2 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 p-10 rounded-2xl shadow-2xl border border-slate-800">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Jojo Docs</h2>
          <p className="text-slate-400 mt-2">
            Sign in to continue
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <GoogleAuthButton />
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-700"></div>
          <span className="px-4 text-slate-500 text-sm">OR</span>
          <div className="flex-1 border-t border-slate-700"></div>
        </div>

        <button
          disabled
          className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 cursor-not-allowed"
        >
          Register / Login (Coming Soon)
        </button>

        <p className="text-center text-sm text-slate-500 mt-8">
          Secure authentication powered by Google
        </p>
      </div>
    </div>
  );
}

export default AuthCard;