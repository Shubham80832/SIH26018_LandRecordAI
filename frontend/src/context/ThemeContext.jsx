import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("landrecord-theme")

    return savedTheme || "dark"
  })

  useEffect(() => {
    // Save selected theme
    localStorage.setItem("landrecord-theme", theme)

    // Add / remove light class from <html>
    document.documentElement.classList.toggle(
      "light",
      theme === "light"
    )

    // Direct body styling
    if (theme === "light") {
      document.body.style.backgroundColor = "#ffffff"
      document.body.style.color = "#111827"

      // // Temporary testing
      // document.title = "LIGHT MODE"
    } else {
      document.body.style.backgroundColor = "#FFFFFF"
      document.body.style.color = "#111827"

      // // Temporary testing
      // document.title = "DARK MODE"
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      return currentTheme === "dark"
        ? "light"
        : "dark"
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    )
  }

  return context
}