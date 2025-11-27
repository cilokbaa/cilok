"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Gamepad2 } from "lucide-react"

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    window.location.href = "/"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Gamepad2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">GameHost</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/plans" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Plans
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link href="/history" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  History
                </Link>
              </>
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="glow-blue bg-primary hover:bg-primary/90">Login with Google</Button>
              </Link>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/50 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm text-muted-foreground">
                Home
              </Link>
              <Link href="/plans" className="text-sm text-muted-foreground">
                Plans
              </Link>
              {isLoggedIn && (
                <>
                  <Link href="/dashboard" className="text-sm text-muted-foreground">
                    Dashboard
                  </Link>
                  <Link href="/history" className="text-sm text-muted-foreground">
                    History
                  </Link>
                </>
              )}
              {isLoggedIn ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button className="w-full bg-primary">Login with Google</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
