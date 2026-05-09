import HeroSection from "../components/auth/HeroSection";
import AuthCard from "../components/auth/AuthCard";

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <HeroSection />
      <AuthCard />
    </div>
  );
}

export default LoginPage;