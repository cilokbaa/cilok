"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Loader2, CheckCircle2, AlertCircle, Copy } from "lucide-react"

interface OrderData {
  depositId: string
  qrImageUrl: string
  amount: number
  plan: string
  expiredAt: string
}

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const depositId = searchParams.get("id")

  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [status, setStatus] = useState<"pending" | "success" | "expired">("pending")
  const [timeLeft, setTimeLeft] = useState<number>(900)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const savedOrder = localStorage.getItem("currentOrder")
    if (savedOrder) {
      const data = JSON.parse(savedOrder)
      setOrderData(data)
      if (data.expiredAt) {
        const expiry = new Date(data.expiredAt).getTime()
        const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000))
        setTimeLeft(remaining)
      }
    } else if (!depositId) {
      router.push("/plans")
    }
  }, [depositId, router])

  useEffect(() => {
    if (status !== "pending" || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus("expired")
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [status, timeLeft])

  const checkPaymentStatus = useCallback(async () => {
    if (!depositId || status !== "pending") return
    try {
      const res = await fetch(`/api/status/${depositId}`)
      const data = await res.json()
      if (data.status === "success") {
        setStatus("success")
        localStorage.removeItem("currentOrder")
        setTimeout(() => router.push(`/done?id=${depositId}`), 2000)
      } else if (data.status === "expired") {
        setStatus("expired")
      }
    } catch (error) {
      console.error("Status check error:", error)
    }
  }, [depositId, status, router])

  useEffect(() => {
    if (status !== "pending") return
    const interval = setInterval(checkPaymentStatus, 5000)
    return () => clearInterval(interval)
  }, [checkPaymentStatus, status])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount)

  const copyDepositId = () => {
    if (depositId) {
      navigator.clipboard.writeText(depositId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getPlanName = (plan: string) =>
    ({ starter: "Starter Plan", medium: "Medium Plan", premium: "Premium Plan" })[plan] || plan

  return (
    <div className="grid-pattern min-h-screen bg-background">
      <Navbar />
      <div className="fixed top-20 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="fixed bottom-20 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <main className="relative flex min-h-screen items-center justify-center px-4 pt-16">
        <Card className="w-full max-w-md animate-fade-in border-border/50 bg-card/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Selesaikan Pembayaran</CardTitle>
            <CardDescription>Scan QR code di bawah dengan aplikasi e-wallet Anda</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {status === "pending" && (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-warning/10 p-3 text-warning">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Menunggu pembayaran...</span>
              </div>
            )}
            {status === "success" && (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-success/10 p-3 text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Pembayaran berhasil!</span>
              </div>
            )}
            {status === "expired" && (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Pembayaran kedaluwarsa</span>
              </div>
            )}

            <div className="flex justify-center">
              <div className="rounded-2xl bg-white p-4">
                <img
                  src={orderData?.qrImageUrl || "/placeholder.svg?height=200&width=200&query=QRIS payment QR code"}
                  alt="QRIS Payment"
                  className="h-48 w-48 object-contain"
                />
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-border/50 bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="font-medium">{orderData?.plan ? getPlanName(orderData.plan) : "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className="text-xl font-bold text-primary">
                  {orderData?.amount ? formatCurrency(orderData.amount) : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Deposit ID</span>
                <button
                  onClick={copyDepositId}
                  className="flex items-center gap-1 text-sm font-mono text-muted-foreground hover:text-foreground"
                >
                  {depositId?.slice(0, 12)}...
                  {copied ? <CheckCircle2 className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
            </div>

            {status === "pending" && (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Expires in</span>
                <span className="font-mono text-lg font-bold text-foreground">{formatTime(timeLeft)}</span>
              </div>
            )}

            {status === "expired" && (
              <Button onClick={() => router.push("/plans")} className="w-full bg-primary">
                Buat Order Baru
              </Button>
            )}
            {status === "success" && (
              <Button
                onClick={() => router.push(`/done?id=${depositId}`)}
                className="w-full bg-success hover:bg-success/90"
              >
                Lihat Detail Server
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  )
}
