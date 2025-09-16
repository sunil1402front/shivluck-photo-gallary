export default function Footer() {
  return (
    <footer id="contact" className="relative py-14 mt-20 overflow-hidden bg-gradient-to-b from-transparent to-orange-50/70 dark:from-transparent dark:to-transparent">
      {/* Decorative water bubbles */}
      <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 h-44 w-44 rounded-full bg-orange-200/40 blur-2xl bubble-anim-medium dark:bg-orange-300/20" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-orange-100/60 blur-3xl bubble-anim-slow bubble-delay-2 dark:bg-orange-200/20" />
      <div aria-hidden className="pointer-events-none absolute -top-12 right-0 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl bubble-anim-fast bubble-delay-4 dark:bg-amber-200/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card container */}
        <div className="rounded-3xl border border-gray-200/70 bg-white/60 backdrop-blur-md shadow-sm p-5 md:py-10 md:px-5 dark:bg-white/10 dark:border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ring-1 ring-gray-200/70 bg-white/70 backdrop-blur-md dark:bg-white/10 dark:ring-white/10">
                  <span className="text-gray-900 dark:text-gray-100 font-extrabold text-lg">S</span>
                </div>
                <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100"><span className="text-orange-500">SHIV</span> LUCK</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Transforming spaces with thoughtful, timeless interiors.</p>
            </div>

            {/* Contact Info with icons */}
            <div className="text-center md:text-center flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact</h3>
              <div className="mx-auto max-w-xs text-left space-y-3">
                {/* Email */}
                <a href="mailto:shivluck999@gmail.com" className="flex items-center justify-center md:justify-start gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/60 backdrop-blur-md text-gray-900 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-gray-100">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7l9 6 9-6m-18 0h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                    </svg>
                  </span>
                  <span className="font-medium">shivluck999@gmail.com</span>
                </a>

                {/* Phone 1 */}
                <a href="tel:+919898167270" className="flex items-center justify-center md:justify-start gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/60 backdrop-blur-md text-gray-900 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-gray-100">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.12 3.36a1 1 0 01-.27 1.06l-1.7 1.7a16 16 0 006.36 6.36l1.7-1.7a1 1 0 011.06-.27l3.36 1.12a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C8.82 21 3 15.18 3 8V7a2 2 0 012-2z" />
                    </svg>
                  </span>
                  <span className="font-medium"><span className="text-gray-900 dark:text-gray-100 font-semibold">KP Suthar:</span> 9898167270</span>
                </a>

                {/* Phone 2 */}
                <a href="tel:+918320785875" className="flex items-center justify-center md:justify-start gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/60 backdrop-blur-md text-gray-900 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-gray-100">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.12 3.36a1 1 0 01-.27 1.06l-1.7 1.7a16 16 0 006.36 6.36l1.7-1.7a1 1 0 011.06-.27l3.36 1.12a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C8.82 21 3 15.18 3 8V7a2 2 0 012-2z" />
                    </svg>
                  </span>
                  <span className="font-medium"><span className="text-gray-900 dark:text-gray-100 font-semibold">Rajesh Suthar:</span> 8320785875</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto md:ml-auto md:mr-0">
                <a
                  href="https://shiv-luck-interior.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center space-x-2 rounded-full border border-gray-200/70 bg-white/60 backdrop-blur-md px-3 py-2 text-xs md:text-sm font-semibold text-gray-900 hover:bg-white/80 transition-colors dark:border-white/10 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/15"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span>Our site</span>
                </a>
                <a
                  href="https://www.instagram.com/shivluck_interior?igsh=bmxsaXZyMm54OTNl&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center space-x-2 rounded-full border border-gray-200/70 bg-white/60 backdrop-blur-md px-3 py-2 text-xs md:text-sm font-semibold text-gray-900 hover:bg-white/80 transition-colors dark:border-white/10 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/15"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Social Connect</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200/70 dark:border-white/10 mt-10 pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">&copy; 2024 SHIVLUCK Interior. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}