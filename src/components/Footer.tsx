export default function Footer() {
  return (
    <footer id="contact" className="relative py-12 mt-20 overflow-hidden bg-gradient-to-b from-transparent to-orange-50/70">
      {/* Decorative water bubbles */}
      <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 h-44 w-44 rounded-full bg-orange-200/40 blur-2xl bubble-anim-medium" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-orange-100/60 blur-3xl bubble-anim-slow bubble-delay-2" />
      <div aria-hidden className="pointer-events-none absolute -top-12 right-0 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl bubble-anim-fast bubble-delay-4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ring-1 ring-gray-200/70 bg-white/70 backdrop-blur-md">
                <span className="text-gray-900 font-extrabold text-lg">S</span>
              </div>
              <span className="text-xl font-extrabold text-gray-900"><span className="text-orange-500">SHIV</span> LUCK</span>
            </div>
            <p className="text-gray-500">Transforming spaces with thoughtful, timeless interiors.</p>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2 text-gray-600">
              <p>Email: <a className="underline hover:text-gray-800" href="mailto:shivluck999@gmail.com">shivluck999@gmail.com</a></p>
              <div className="space-y-1">
                <p className="flex items-center justify-center space-x-2">
                  <span className="text-gray-900 font-semibold">KP Suthar:</span>
                  <a className="underline hover:text-gray-800" href="tel:+919898167270">9898167270</a>
                </p>
                <p className="flex items-center justify-center space-x-2">
                  <span className="text-gray-900 font-semibold">Rajesh Suthar:</span>
                  <a className="underline hover:text-gray-800" href="tel:+918320785875">8320785875</a>
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://shiv-luck-interior.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rounded-full border border-gray-200/70 bg-white/60 backdrop-blur-md px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-white/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                <span>Our site</span>
              </a>
              <a
                href="https://www.instagram.com/shivluck_interior?igsh=bmxsaXZyMm54OTNl&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rounded-full border border-gray-200/70 bg-white/60 backdrop-blur-md px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-white/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Social Connect</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200/70 mt-8 pt-8 text-center">
          <p className="text-gray-500">&copy; 2024 SHIVLUCK Interior. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 