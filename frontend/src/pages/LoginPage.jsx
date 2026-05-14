import HeroSection from "../components/auth/HeroSection";
import AuthCard from "../components/auth/AuthCard";

function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl min-h-145 rounded-2xl overflow-hidden border border-white/6">
        <HeroSection />
        <AuthCard />
      </div>
    </div>
  );
}
export default LoginPage;