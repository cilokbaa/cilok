"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Loader2 } from "lucide-react"

export default function PlansPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  async function orderPlan(plan: string) {
    setLoading(plan)
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem("currentOrder", JSON.stringify(data))
        router.push(`/pay?id=${data.depositId}`)
      } else {
        alert("Gagal membuat order: " + data.message)
      }
    } catch (error) {
      console.error("Order error:", error)
      alert("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      id: "starter",
      name: "Starter Plan",
      price: "Rp 5.000",
      period: "/bulan",
      description: "Perfect untuk pemula yang baru memulai",
      features: [
        "5 GB RAM",
        "5 GB Disk Storage",
        "Unlimited CPU",
        "1 Game Server",
        "Basic DDoS Protection",
        "Community Support",
      ],
      color: "border-border/50",
      buttonClass: "bg-muted hover:bg-muted/80 text-foreground",
    },
    {
      id: "medium",
      name: "Medium Plan",
      price: "Rp 15.000",
      period: "/bulan",
      description: "Untuk server dengan trafik menengah",
      features: [
        "10 GB RAM",
        "15 GB Disk Storage",
        "Unlimited CPU",
        "3 Game Servers",
        "Advanced DDoS Protection",
        "Priority Support",
        "Daily Backups",
      ],
      popular: true,
      color: "border-primary glow-blue",
      buttonClass: "bg-primary hover:bg-primary/90 text-primary-foreground",
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "Rp 35.000",
      period: "/bulan",
      description: "Untuk server profesional dan komunitas besar",
      features: [
        "20 GB RAM",
        "50 GB Disk Storage",
        "Unlimited CPU",
        "10 Game Servers",
        "Enterprise DDoS Protection",
        "24/7 Premium Support",
        "Hourly Backups",
        "Custom Domain",
        "API Access",
      ],
      color: "border-accent glow-cyan",
      buttonClass: "bg-accent hover:bg-accent/90 text-accent-foreground",
    },
  ]

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Pilih <span className="gradient-text">Plan</span> Anda
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Pilih paket yang sesuai dengan kebutuhan server game Anda
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col border-2 bg-card/50 backdrop-blur-sm transition-all hover:scale-[1.02] ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20">
                          <Check className="h-3 w-3 text-success" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-8 w-full ${plan.buttonClass}`}
                    size="lg"
                    onClick={() => orderPlan(plan.id)}
                    disabled={loading === plan.id}
                  >
                    {loading === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Order Now"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Semua plan termasuk: Panel Pterodactyl, Auto-restart, Free SSL, dan Setup Instan
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
