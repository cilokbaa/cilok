import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="grid-pattern flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="fixed top-20 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="fixed bottom-20 right-1/4 h-96 w-96 rounded-full bg-destructive/10 blur-3xl" />

      <div className="relative text-center">
        <div className="mb-8">
          <h1 className="text-[150px] font-bold leading-none text-foreground/10 sm:text-[200px]">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Gamepad2 className="h-24 w-24 text-primary sm:h-32 sm:w-32" />
          </div>
        </div>

        <h2 className="text-2xl font-bold sm:text-3xl">Page Not Found</h2>
        <p className="mt-4 max-w-md text-muted-foreground">Oops! Halaman yang Anda cari tidak ditemukan.</p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button className="gap-2 bg-primary">
              <Home className="h-4 w-4" />
              Kembali ke Home
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Halaman Sebelumnya
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
