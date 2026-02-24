import Link from "next/link";

export const metadata = {
  title: "Access Restricted | Workspace Mockup",
};

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 grid place-items-center p-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
          Mockup Access
        </p>
        <h1 className="mt-3 text-2xl font-bold">Akses dibatasi</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Gunakan link share dari admin (contoh: <code>/share/&lt;token&gt;</code>)
          untuk membuka mockup yang ditugaskan ke Anda.
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Admin dapat masuk dengan route <code>/admin-access?key=...</code>.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/logout"
            className="rounded-full border border-white/10 px-4 py-2 text-zinc-200 hover:bg-white/10"
          >
            Reset Session
          </Link>
        </div>
      </div>
    </main>
  );
}
