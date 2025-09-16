"use client";

import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  onUploadClick: () => void;
}

export default function Navbar({ onUploadClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const enableDark = stored ? stored === "dark" : prefersDark;
      document.documentElement.classList.toggle("dark", enableDark);
      setIsDark(enableDark);
    } catch {}
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const clickedInsideMenu = mobileMenuRef.current?.contains(target);
      const clickedToggle = mobileToggleRef.current?.contains(target);
      if (!clickedInsideMenu && !clickedToggle) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
    };
  }, [isMobileMenuOpen]);

  const handleUploadClick = () => {
    onUploadClick();
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <nav className="sticky top-0 z-40 px-4 sm:px-8 py-4 backdrop-blur-md bg-white/60 border-b border-gray-200/70 shadow-sm overflow-hidden dark:bg-white/5 dark:border-white/10">
      {/* Floating bubbles */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 left-6 h-24 w-24 rounded-full bg-orange-200/50 blur-2xl bubble-anim-medium bubble-delay-1"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-10 h-20 w-20 rounded-full bg-amber-100/60 blur-2xl bubble-anim-slow bubble-delay-3"
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm ring-1 ring-gray-200/70 bg-white/70 backdrop-blur-md dark:bg-white/10 dark:ring-white/10">
              <span className="text-gray-900 dark:text-gray-100 font-extrabold text-lg sm:text-xl">
                S
              </span>
            </div>
            <span className="text-lg sm:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              <span className="text-orange-500">SHIV</span> LUCK
            </span>
          </div>

          {/* Desktop Menu Items - Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gray-200/70 bg-white/60 backdrop-blur-md text-gray-900 hover:bg-white/80 transition-colors dark:border-white/10 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/15"
            >
              {isDark ? (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.64 13a9 9 0 1 1-10.63-10.6 1 1 0 0 1 1.11 1.48A7 7 0 1 0 20.16 12a1 1 0 0 1 1.48 1z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Z" />
                </svg>
              )}
            </button>
            {/* Shivluck Site */}
            <a
              href="https://shiv-luck-interior.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2 rounded-full border border-gray-200/70 bg-white/60 backdrop-blur-md px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-white/80 transition-colors dark:bg-white/10 dark:border-white/10 dark:text-gray-100 dark:hover:bg-white/15"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
              <span>Our site</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/shivluck_interior?igsh=bmxsaXZyMm54OTNl&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2 rounded-full border border-gray-200/70 bg-white/60 backdrop-blur-md px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-white/80 transition-colors dark:bg-white/10 dark:border-white/10 dark:text-gray-100 dark:hover:bg-white/15"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Social Connect</span>
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="group inline-flex items-center space-x-2 rounded-full border border-gray-200/70 bg-white/60 backdrop-blur-md px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-white/80 transition-colors dark:bg-white/10 dark:border-white/10 dark:text-gray-100 dark:hover:bg-white/15"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 8a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2h14a2 2 0 012 2v2z"
                />
              </svg>
              <span>Contact</span>
            </a>

            {/* Upload Image Button */}
            <button
              onClick={handleUploadClick}
              className="group relative inline-flex items-center space-x-2 rounded-full px-5 py-2 text-sm font-semibold text-gray-900 border border-white/60 bg-gradient-to-r from-orange-300/80 to-white/70 backdrop-blur-md shadow-sm hover:shadow transition-transform hover:scale-105 dark:bg-white/10 dark:border-white/10 dark:text-gray-100 dark:hover:bg-white/15 dark:hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Upload Image</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-60 [mask-image:radial-gradient(60%_60%_at_20%_20%,white,transparent)]"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              ref={mobileToggleRef}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme border"
            >
              {isDark ? (
                // 🌙 Moon icon
                <svg
                  className="w-5 h-5 text-gray-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.64 13a9 9 0 1 1-10.63-10.6 1 1 0 0 1 1.11 1.48A7 7 0 1 0 20.16 12a1 1 0 0 1 1.48 1z" />
                </svg>
              ) : (
                // ☀️ Sun icon (circle + rays, dashed style)
                <svg
                  className="w-5 h-5 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Dashed sun core */}
                  <circle cx="12" cy="12" r="5" strokeDasharray="4 2" />

                  {/* Sun rays */}
                  <line x1="12" y1="1" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            <button
              ref={mobileToggleRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 hover:text-gray-700 transition-colors duration-300 dark:text-gray-100 dark:hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu with animation */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 translate-y-0 mt-2 dark:bg-transparent"
              : "max-h-0 opacity-0 -translate-y-8"
          } transform`}
          style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
        >
          <div className="flex flex-col space-y-3 pt-4 pb-4 bg-white/60 backdrop-blur-md rounded-xl border border-gray-200/70 p-3 dark:bg-white/10 dark:border-white/10">
            {/* Shivluck Site */}
            <a
              href="https://shiv-luck-interior.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-900 hover:text-gray-700 transition-all duration-300 font-semibold py-2 dark:text-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
              <span className="dark:text-gray-100">Our site</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/shivluck_interior?igsh=bmxsaXZyMm54OTNl&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-900 hover:text-gray-700 transition-all duration-300 font-semibold py-2 dark:text-gray-100"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="dark:text-gray-100">Social Connect</span>
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="flex items-center space-x-3 text-gray-900 hover:text-gray-700 transition-all duration-300 font-semibold py-2 dark:text-gray-100"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 8a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2h14a2 2 0 012 2v2z"
                />
              </svg>
              <span className="dark:text-gray-100">Contact</span>
            </a>

            {/* Upload Image Button */}
            <a
              onClick={handleUploadClick}
              className="relative w-full flex items-center space-x-3 text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="dark:text-gray-100">Upload Image</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-60 [mask-image:radial-gradient(60%_60%_at_20%_20%,white,transparent)]"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
