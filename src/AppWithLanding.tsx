// src/AppWithLanding.tsx
import { useEffect, useState } from "react"
import App from "./App"
import { LandingPage } from "./pages/LandingPage"

export default function AppWithLanding() {
  const [showLanding, setShowLanding] = useState(false)

  useEffect(() => {
    const hasShown = sessionStorage.getItem("landingShown")
    if (!hasShown) {
      setShowLanding(true)
      sessionStorage.setItem("landingShown", "true")
    }
  }, [])

  return showLanding ? (
    <LandingPage onFinish={() => setShowLanding(false)} />
  ) : (
    <App />
  )
}
