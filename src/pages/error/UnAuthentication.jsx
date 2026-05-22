import { Link } from 'react-router-dom'
import {
  FaCircleExclamation,
  FaHouse,
  FaLock,
  FaRightToBracket,
  FaShieldHalved,
  FaUnlockKeyhole,
} from 'react-icons/fa6'

const UnAuthentication = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-10">
      <section className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-slate-200/80 sm:p-8 lg:p-10">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-rose-100" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-amber-100" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
              <FaShieldHalved className="mr-2" />
              Error 401
            </p>

            <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Sign in required.
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              Your Token is missing or has expired. Please log in again to continue shopping securely.
            </p>

            <div className="mt-6 flex max-w-lg items-center gap-3 rounded-full border border-slate-200 bg-slate-50 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                <FaLock />
              </div>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-500">
                Protected page needs authentication
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-300/60 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <FaRightToBracket />
                Login now
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <FaHouse />
                Back to home
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[25rem] w-full max-w-sm">
            <div className="absolute inset-x-8 top-8 rotate-6 rounded-[1.5rem] bg-amber-300 p-5 shadow-xl shadow-amber-100" />

            <div className="absolute inset-x-0 top-0 -rotate-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200">
              <div className="rounded-[1.25rem] bg-slate-950 p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-slate-300">
                    <FaShieldHalved className="mr-2 inline-block" />
                    Secure checkout
                  </span>
                  <span className="h-3 w-3 rounded-full bg-rose-300" />
                </div>

                <div className="py-8 text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border-8 border-amber-300 bg-white text-5xl font-black text-slate-950 shadow-xl">
                    <FaLock />
                  </div>
                  <div className="mt-6 text-[4.5rem] font-black leading-none text-white">
                    401
                  </div>
                  <div className="mx-auto mt-2 h-2 w-28 rounded-full bg-gradient-to-r from-rose-300 via-white to-amber-300" />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                  <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Access status</span>
                    <span className="inline-flex items-center gap-1 text-rose-200">
                      <FaLock />
                      Locked
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-2/5 rounded-full bg-rose-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-2 top-16 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-950 shadow-lg">
              <FaCircleExclamation className="mr-2 inline-block text-rose-600" />
              Token expired
            </div>
            <div className="absolute bottom-2 right-2 rounded-2xl bg-slate-950 px-5 py-4 text-xs font-black text-white shadow-xl">
              <FaUnlockKeyhole className="mr-2 inline-block" />
              Login needed
            </div>
            <div className="absolute bottom-24 left-8 h-14 w-14 rounded-2xl bg-rose-300 shadow-lg shadow-rose-100" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default UnAuthentication
