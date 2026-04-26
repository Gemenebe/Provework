import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-sora font-bold text-2xl text-navy">
            prove<span className="text-cobalt">work</span>
          </Link>
          <p className="text-smoke text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="glass-card p-8 space-y-5">
          <div>
            <label className="text-sm font-semibold text-ink block mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-[rgba(15,45,82,0.12)] rounded-[12px] px-4 py-3 text-sm text-ink bg-white/70 placeholder:text-smoke focus:outline-none focus:border-navy transition-colors"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink block mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-[rgba(15,45,82,0.12)] rounded-[12px] px-4 py-3 text-sm text-ink bg-white/70 placeholder:text-smoke focus:outline-none focus:border-navy transition-colors"
            />
          </div>

          <button className="btn-navy w-full !py-3.5">Sign In</button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-[rgba(15,45,82,0.10)]" />
            <span className="text-xs text-smoke">or</span>
            <div className="flex-1 h-px bg-[rgba(15,45,82,0.10)]" />
          </div>

          <button className="btn-outline w-full !py-3 !text-sm flex items-center gap-2 justify-center">
            <span>⌥</span> Continue with GitHub
          </button>

          <p className="text-center text-sm text-smoke">
            No account?{" "}
            <Link href="/auth/signup" className="text-navy font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
