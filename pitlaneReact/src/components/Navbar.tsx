import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import logo from "../assets/img/logo_noBG.png"
import "../styles/navbar.css"
import LanguageSwitcher from "./LanguageSwitcher"

function Navbar(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation("navbar")

  const openMenu = () => {
    setMenuOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = "auto"
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }

    const handleResize = () => {
      if (window.innerWidth >= 1150) closeMenu()
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 font-orbitron">
        <nav className="bg-[var(--color-primary)] shadow-lg opacity-95 backdrop-blur-sm">
          <div className="mx-auto px-4 lg:px-6">
            <div className="flex justify-between items-center py-3">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-32 h-24 min-[1150px]:w-40 min-[1150px]:h-24 flex items-center justify-center mr-4">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden min-[1150px]:flex items-center space-x-3">
                <a
                  href="#centre"
                  className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.1rem] xl:text-[1.3rem]"
                >
                  {t("centre")}
                </a>
                <span className="text-gray-400">|</span>

                <a
                  href="#circuit"
                  className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.1rem] xl:text-[1.3rem]"
                >
                  {t("project")}
                </a>
                <span className="text-gray-400">|</span>

                <a
                  href="#about-us"
                  className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.1rem] xl:text-[1.3rem]"
                >
                  {t("about")}
                </a>
                <span className="text-gray-400">|</span>

                <a
                  href="#timeline"
                  className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.1rem] xl:text-[1.3rem]"
                >
                  {t("timeline")}
                </a>
                <span className="text-gray-400">|</span>

                <a
                  href="#download"
                  className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.1rem] xl:text-[1.3rem]"
                >
                  {t("download")}
                </a>
                <span className="text-gray-400">|</span>

                <a
                  href="#contact"
                  className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.1rem] xl:text-[1.3rem]"
                >
                  {t("contact")}
                </a>

                <LanguageSwitcher />
              </div>

              {/* Mobile / Tablet Hamburger */}
              <div className="min-[1150px]:hidden flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  onClick={openMenu}
                  className="text-[var(--color-text-muted)] focus:outline-none"
                  aria-label="Open menu"
                >
                  <div className="space-y-1">
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        className={`backdrop fixed inset-0 bg-black/60 z-40 ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`slide-menu fixed top-0 right-0 h-full w-64 sm:w-72 bg-primary shadow-2xl z-50 ${
          menuOpen ? "open" : ""
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            className="text-[var(--color-text-muted)] text-3xl"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col px-6 py-4 space-y-5">
          <a
            href="#centre"
            onClick={closeMenu}
            className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700"
          >
            {t("centre")}
          </a>

          <a
            href="#circuit"
            onClick={closeMenu}
            className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700"
          >
            {t("project")}
          </a>

          <a
            href="#about-us"
            onClick={closeMenu}
            className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700"
          >
            {t("about")}
          </a>

          <a
            href="#timeline"
            onClick={closeMenu}
            className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700"
          >
            {t("timeline")}
          </a>

          <a
            href="#download"
            onClick={closeMenu}
            className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700"
          >
            {t("download")}
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
            className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700"
          >
            {t("contact")}
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar