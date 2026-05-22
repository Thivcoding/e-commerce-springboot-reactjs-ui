import { Link } from 'react-router-dom'
import {
  FaArrowLeft,
  FaCartShopping,
  FaHouse,
  FaLocationDot,
  FaMagnifyingGlass,
  FaRoute,
  FaTriangleExclamation,
} from 'react-icons/fa6'

const productTiles = [
  { name: 'Sneakers', color: 'bg-cyan-300', price: '$89', icon: FaRoute },
  { name: 'Headset', color: 'bg-amber-300', price: '$42', icon: FaMagnifyingGlass },
  { name: 'Jacket', color: 'bg-rose-300', price: '$120', icon: FaCartShopping },
]

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-10">
      <section className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-slate-200/80 sm:p-8 lg:p-10">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-amber-100" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-cyan-100" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
              <FaTriangleExclamation className="mr-2" />
              Error 404
            </p>

            <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Oops, this product aisle vanished.
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              The page may be out of stock, moved to a new shelf, or typed with the wrong address.
            </p>

            <div className="mt-6 flex max-w-lg items-center gap-3 rounded-full border border-slate-200 bg-slate-50 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-lg font-black text-white">
                <FaMagnifyingGlass className="text-sm" />
              </div>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-500">
                Try checking the URL or return to the storefront
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-300/60 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <FaHouse />
                Back to home
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <FaArrowLeft />
                Go back
              </button>
            </div>
          </div>

          <div className="relative mx-auto h-[25rem] w-full max-w-sm">
            <div className="absolute inset-x-8 top-8 rotate-6 rounded-[1.5rem] bg-amber-300 p-5 shadow-xl shadow-amber-100" />

            <div className="absolute inset-x-0 top-0 -rotate-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200">
              <div className="rounded-[1.25rem] bg-slate-950 p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-slate-300">
                    <FaCartShopping className="mr-2 inline-block" />
                    Lost cart
                  </span>
                  <span className="h-3 w-3 rounded-full bg-cyan-300" />
                </div>

                <div className="py-6 text-center">
                  <div className="text-[5.5rem] font-black leading-none text-white sm:text-[6.5rem]">
                    404
                  </div>
                  <div className="mx-auto mt-2 h-2 w-28 rounded-full bg-gradient-to-r from-cyan-300 via-white to-amber-300" />
                </div>

                <div className="space-y-2">
                  {productTiles.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-2.5"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color} text-slate-950`}>
                        <item.icon />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white">{item.name}</p>
                        <p className="text-xs text-slate-400">Unavailable on this route</p>
                      </div>
                      <p className="text-sm font-black text-amber-200">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -left-2 top-16 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-950 shadow-lg">
              <FaLocationDot className="mr-2 inline-block text-cyan-600" />
              Shelf not found
            </div>
            <div className="absolute bottom-2 right-2 rounded-2xl bg-slate-950 px-5 py-4 text-xs font-black text-white shadow-xl">
              <FaRoute className="mr-2 inline-block" />
              New route needed
            </div>
            <div className="absolute bottom-24 left-8 h-14 w-14 rounded-2xl bg-cyan-300 shadow-lg shadow-cyan-100" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default NotFound
