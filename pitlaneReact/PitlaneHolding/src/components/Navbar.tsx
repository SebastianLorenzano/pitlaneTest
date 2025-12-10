import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import logo from "../assets/img/logo_noBG.png"
import "../styles/navbar.css"
import LanguageSwitcher from "./LanguageSwitcher"

function Navbar(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()

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
      if (window.innerWidth >= 768) closeMenu()
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
          <div className="mx-auto px-6">
            <div className="flex justify-between items-center py-3">

              {/* Logo */}
              <div className="flex items-center">
                <div className="w-32 h-24 md:w-40 md:h-24 flex items-center justify-center mr-4">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4">

                <a href="#project" className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.3rem]">
                  {t("navbar.project")}
                </a>
                <span className="text-gray-400">|</span>

                <a href="#about-us" className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.3rem]">
                  {t("navbar.about")}
                </a>
                <span className="text-gray-400">|</span>

                <a href="#contact" className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.3rem]">
                  {t("navbar.contact")}
                </a>
                <span className="text-gray-400">|</span>

                <a href="#download" className="navbar-link text-[var(--color-text-muted)] font-medium text-[1.3rem]">
                  {t("navbar.download")}
                </a>

                <LanguageSwitcher />
              </div>

              {/* Mobile Hamburger */}
              <div className="md:hidden flex items-center">
                <LanguageSwitcher />
                <button onClick={openMenu} className="text-[var(--color-text-muted)] focus:outline-none">
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
        className={`slide-menu fixed top-0 right-0 h-full w-64 bg-primary shadow-2xl z-50 ${
          menuOpen ? "open" : ""
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeMenu} className="text-[var(--color-text-muted)] text-3xl">&times;</button>
        </div>

        <div className="flex flex-col px-6 py-4 space-y-5">
          <a href="#project" className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700">
            {t("navbar.project")}
          </a>
          <a href="#about-us" className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700">
            {t("navbar.about")}
          </a>
          <a href="#contact" className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700">
            {t("navbar.contact")}
          </a>
          <a href="#download" className="navbar-link text-[var(--color-text-muted)] font-medium text-lg py-2 border-b border-gray-700">
            {t("navbar.download")}
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
