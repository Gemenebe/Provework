import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-sora font-bold text-2xl text-navy">
            prove<span className="text-cobalt">work</span>
          </Link>
          <p className="text-smoke text-sm mt-2">Create your free account</p>
        </div>

        <div className="glass-card p-8 space-y-5">
          {/* Role selector */}
          <div>
            <label className="text-sm font-semibold text-ink block mb-2">I am a…</label>
            <div className="grid grid-cols-2 gap-3">
              {["Talent", "Employer"].map((r) => (
                <label key={r} className="cursor-pointer">
                  <input type="radio" name="role" value={r.toLowerCase()} className="sr-only peer" defaultChecked={r === "Talent"} />
                  <div className="glass-card !rounded-[12px] p-4 text-center text-sm font-semibold text-smoke peer-checked:border-navy peer-checked:text-navy peer-checked:bg-[rgba(15,45,82,0.04)] transition-all cursor-pointer">
                    {r}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-ink block mb-2">Full Name</label>
            <input type="text" placeholder="Amara Osei" className="w-full border border-[rgba(15,45,82,0.12)] rounded-[12px] px-4 py-3 text-sm text-ink bg-white/70 placeholder:text-smoke focus:outline-none focus:border-navy transition-colors" />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink block mb-2">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full border border-[rgba(15,45,82,0.12)] rounded-[12px] px-4 py-3 text-sm text-ink bg-white/70 placeholder:text-smoke focus:outline-none focus:border-navy transition-colors" />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink block mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full border border-[rgba(15,45,82,0.12)] rounded-[12px] px-4 py-3 text-sm text-ink bg-white/70 placeholder:text-smoke focus:outline-none focus:border-navy transition-colors" />
          </div>

          <button className="btn-navy w-full !py-3.5">Create Account →</button>

          <p className="text-center text-sm text-smoke">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-navy font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
