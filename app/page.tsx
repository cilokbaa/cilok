import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Server, Shield, Zap, Clock, Headphones } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const plans = [
    {
      name: "Starter",
      price: "Rp 5.000",
      period: "/bulan",
      description: "Perfect untuk pemula",
      features: ["5 GB RAM", "5 GB Disk", "Unlimited CPU", "1 Server", "Basic Support"],
      popular: false,
    },
    {
      name: "Medium",
      price: "Rp 15.000",
      period: "/bulan",
      description: "Untuk server menengah",
      features: ["10 GB RAM", "15 GB Disk", "Unlimited CPU", "3 Server", "Priority Support"],
      popular: true,
    },
    {
      name: "Premium",
      price: "Rp 35.000",
      period: "/bulan",
      description: "Untuk server profesional",
      features: ["20 GB RAM", "50 GB Disk", "Unlimited CPU", "10 Server", "24/7 Premium Support"],
      popular: false,
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Performa Tinggi",
      description: "Server dengan hardware terbaru dan SSD NVMe untuk performa maksimal.",
    },
    {
      icon: Shield,
      title: "DDoS Protection",
      description: "Proteksi serangan DDoS terintegrasi untuk menjaga server Anda tetap online.",
    },
    {
      icon: Clock,
      title: "Uptime 99.9%",
      description: "Jaminan uptime tinggi dengan infrastruktur yang handal dan redundan.",
    },
    {
      icon: Headphones,
      title: "Support 24/7",
      description: "Tim support siap membantu Anda kapan saja melalui live chat dan ticket.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="grid-pattern relative overflow-hidden pt-32 pb-20">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="animate-fade-in space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
              </span>
              <span className="text-muted-foreground">All servers operational</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="gradient-text">Game Hosting Panel</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Deploy game server Anda dalam hitungan detik. Minecraft, Rust, ARK, dan game lainnya dengan performa
              tinggi dan harga terjangkau.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/plans">
                <Button size="lg" className="glow-blue bg-primary px-8 hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
              <Link href="#plans">
                <Button size="lg" variant="outline">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "10K+", label: "Active Servers" },
              { value: "99.9%", label: "Uptime" },
              { value: "50ms", label: "Avg. Latency" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Mengapa Memilih Kami?</h2>
            <p className="mt-4 text-muted-foreground">Fitur-fitur unggulan yang membuat hosting Anda lebih mudah</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Pilih Plan Anda</h2>
            <p className="mt-4 text-muted-foreground">Harga terjangkau dengan fitur lengkap untuk setiap kebutuhan</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Card
                key={i}
                className={`relative border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 ${plan.popular ? "border-primary glow-blue" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/login" className="block">
                    <Button
                      className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Server className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Siap Memulai?</h2>
          <p className="mt-4 text-muted-foreground">Buat server game Anda sekarang dan rasakan performa terbaik.</p>
          <Link href="/login">
            <Button size="lg" className="glow-blue mt-8 bg-primary px-8 hover:bg-primary/90">
              Mulai Sekarang
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
