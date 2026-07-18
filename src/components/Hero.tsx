import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            PT Mughis Cipta Media
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-emerald-100 sm:text-xl">
            Menghadirkan Literasi Berkualitas melalui Maktabah Al-Mughis
          </p>
          <div className="mt-8">
            <Link
              href="/katalog"
              className="inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
            >
              Jelajahi Katalog
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-emerald-500 opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500 opacity-10"></div>
      </div>
    </section>
  );
}
