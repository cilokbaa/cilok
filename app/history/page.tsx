"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle, Loader2, ExternalLink, Copy, Eye, EyeOff } from "lucide-react"

interface OrderHistory {
  id: string
  plan: string
  amount: number
  status: "pending" | "success" | "failed" | "expired"
  createdAt: string
  panel?: { username: string; password: string; panelUrl: string }
}

export default function HistoryPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<OrderHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }
    fetchOrders()
  }, [router])

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders")
      const data = await res.json()
      if (data.success) setOrders(data.orders)
    } catch (error) {
      console.error("Fetch orders error:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getStatusBadge = (status: string) => {
    if (status === "success")
      return (
        <Badge className="bg-success/20 text-success hover:bg-success/30">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Success
        </Badge>
      )
    if (status === "pending")
      return (
        <Badge className="bg-warning/20 text-warning hover:bg-warning/30">
          <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Pending
        </Badge>
      )
    return (
      <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">
        <XCircle className="mr-1 h-3 w-3" /> {status === "failed" ? "Failed" : "Expired"}
      </Badge>
    )
  }

  const getPlanName = (plan: string) =>
    ({ starter: "Starter Plan", medium: "Medium Plan", premium: "Premium Plan" })[plan] || plan
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount)
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              <span className="gradient-text">Order History</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Lihat riwayat pembelian dan detail panel Anda</p>
          </div>

          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Belum ada order</h3>
                <p className="mt-2 text-center text-muted-foreground">Anda belum memiliki riwayat order.</p>
                <Button className="mt-4 bg-primary" onClick={() => router.push("/plans")}>
                  Order Sekarang
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-lg">{getPlanName(order.plan)}</CardTitle>
                        <CardDescription className="mt-1">Order ID: {order.id}</CardDescription>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Amount: </span>
                        <span className="font-semibold">{formatCurrency(order.amount)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date: </span>
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    {order.status === "success" && order.panel && (
                      <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                        <h4 className="mb-3 text-sm font-semibold">Panel Credentials</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Username:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono">{order.panel.username}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyToClipboard(order.panel!.username, `user-${order.id}`)}
                              >
                                {copiedField === `user-${order.id}` ? (
                                  <CheckCircle2 className="h-3 w-3 text-success" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Password:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono">
                                {showPassword === order.id ? order.panel.password : "••••••••"}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => setShowPassword(showPassword === order.id ? null : order.id)}
                              >
                                {showPassword === order.id ? (
                                  <EyeOff className="h-3 w-3" />
                                ) : (
                                  <Eye className="h-3 w-3" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyToClipboard(order.panel!.password, `pass-${order.id}`)}
                              >
                                {copiedField === `pass-${order.id}` ? (
                                  <CheckCircle2 className="h-3 w-3 text-success" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Panel URL:</span>
                            <a
                              href={order.panel.panelUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline"
                            >
                              {order.panel.panelUrl}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
