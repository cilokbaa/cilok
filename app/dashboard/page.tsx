"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, CreditCard, Clock, Plus, ExternalLink, Cpu, HardDrive, MemoryStick, Activity } from "lucide-react"

interface ServerData {
  id: string
  name: string
  plan: string
  status: "online" | "offline" | "starting"
  ram: string
  disk: string
  cpu: string
  panelUrl: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [servers, setServers] = useState<ServerData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    fetchServers()
  }, [router])

  async function fetchServers() {
    try {
      const res = await fetch("/api/servers")
      const data = await res.json()
      if (data.success) setServers(data.servers)
    } catch (error) {
      console.error("Fetch servers error:", error)
      setServers([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) =>
    ({ online: "bg-success", offline: "bg-destructive", starting: "bg-warning" })[status] || "bg-muted"

  const stats = [
    { icon: Server, label: "Total Servers", value: servers.length.toString() },
    { icon: Activity, label: "Active Now", value: servers.filter((s) => s.status === "online").length.toString() },
    { icon: CreditCard, label: "This Month", value: "Rp 0" },
    { icon: Clock, label: "Uptime", value: "99.9%" },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Welcome back, <span className="gradient-text">{user.name}</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Kelola server game Anda dari satu tempat</p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i} className="border-border/50 bg-card/50">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Servers</h2>
            <Link href="/plans">
              <Button className="gap-2 bg-primary">
                <Plus className="h-4 w-4" />
                Order New Server
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : servers.length === 0 ? (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Server className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Belum ada server</h3>
                <p className="mt-2 text-center text-muted-foreground">
                  Anda belum memiliki server. Order sekarang untuk memulai!
                </p>
                <Link href="/plans" className="mt-4">
                  <Button className="bg-primary">Order Server</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {servers.map((server) => (
                <Card key={server.id} className="border-border/50 bg-card/50 transition-all hover:border-primary/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{server.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${getStatusColor(server.status)}`} />
                        <span className="text-xs capitalize text-muted-foreground">{server.status}</span>
                      </div>
                    </div>
                    <CardDescription>{server.plan}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MemoryStick className="h-3 w-3" />
                        <span>{server.ram}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <HardDrive className="h-3 w-3" />
                        <span>{server.disk}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Cpu className="h-3 w-3" />
                        <span>{server.cpu}</span>
                      </div>
                    </div>
                    <a href={server.panelUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
                        <ExternalLink className="h-4 w-4" />
                        Manage Server
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/history">
              <Card className="border-border/50 bg-card/50 transition-all hover:border-primary/50">
                <CardContent className="flex items-center gap-4 p-6">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Order History</h3>
                    <p className="text-sm text-muted-foreground">Lihat riwayat pembelian Anda</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/plans">
              <Card className="border-border/50 bg-card/50 transition-all hover:border-primary/50">
                <CardContent className="flex items-center gap-4 p-6">
                  <CreditCard className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-semibold">Upgrade Plan</h3>
                    <p className="text-sm text-muted-foreground">Tingkatkan resource server Anda</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
