"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, ExternalLink, Loader2, User, Key, Globe } from "lucide-react"

interface PanelData {
  username: string
  password: string
  panelUrl: string
  serverId: string
  plan: string
}

function DoneContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")

  const [panelData, setPanelData] = useState<PanelData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const fetchOrderData = useCallback(async () => {
    if (!orderId) return
    try {
      const res = await fetch(`/api/order/${orderId}`)
      const data = await res.json()
      if (data.success && data.panel) {
        setPanelData(data.panel)
        setLoading(false)
      }
    } catch (error) {
      console.error("Fetch order error:", error)
    }
  }, [orderId])

  useEffect(() => {
    if (!orderId) {
      router.push("/plans")
      return
    }
    fetchOrderData()
  }, [orderId, fetchOrderData, router])

  useEffect(() => {
    if (!loading || !orderId) return
    const interval = setInterval(fetchOrderData, 3000)
    return () => clearInterval(interval)
  }, [loading, orderId, fetchOrderData])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getPlanName = (plan: string) =>
    ({ starter: "Starter Plan", medium: "Medium Plan", premium: "Premium Plan" })[plan] || plan

  return (
    <div className="grid-pattern min-h-screen bg-background">
      <Navbar />
      <div className="fixed top-20 left-1/4 h-96 w-96 rounded-full bg-success/10 blur-3xl" />
      <div className="fixed bottom-20 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <main className="relative flex min-h-screen items-center justify-center px-4 pt-16">
        <Card className="w-full max-w-lg animate-fade-in border-border/50 bg-card/80 backdrop-blur-xl">
          {loading ? (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <CardTitle className="text-2xl">Menunggu Setup...</CardTitle>
                <CardDescription>Mohon tunggu, admin sedang menyiapkan panel Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Waiting admin to assign panel...</span>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Proses ini biasanya memakan waktu 1-5 menit.
                  </p>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="text-2xl">Pembayaran Berhasil!</CardTitle>
                <CardDescription>Akun panel Anda siap digunakan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Paket yang dibeli</p>
                  <p className="text-lg font-bold text-primary">
                    {panelData?.plan ? getPlanName(panelData.plan) : "-"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Akun Panel Kamu Siap</h3>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Username</p>
                        <p className="font-mono font-medium">{panelData?.username}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(panelData?.username || "", "username")}
                    >
                      {copiedField === "username" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Password</p>
                        <p className="font-mono font-medium">{panelData?.password}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(panelData?.password || "", "password")}
                    >
                      {copiedField === "password" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Login URL</p>
                        <p className="font-mono text-sm font-medium text-primary">{panelData?.panelUrl}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(panelData?.panelUrl || "", "url")}>
                      {copiedField === "url" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <a href={panelData?.panelUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                      <ExternalLink className="h-4 w-4" />
                      Login ke Panel
                    </Button>
                  </a>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    Ke Dashboard
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  Simpan kredensial ini dengan aman. Anda juga dapat melihatnya di halaman riwayat order.
                </p>
              </CardContent>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}

export default function DonePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <DoneContent />
    </Suspense>
  )
}
