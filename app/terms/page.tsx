import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString("id-ID")}</p>

          <div className="prose prose-invert mt-8 max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="mt-2 text-muted-foreground">
                By accessing or using GameHost Panel services, you agree to be bound by these Terms of Service.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">2. Service Description</h2>
              <p className="mt-2 text-muted-foreground">
                GameHost Panel provides game server hosting services including Minecraft, Rust, ARK, and other supported
                games.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>You must be at least 13 years old to use our services</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You agree not to use our services for any illegal or unauthorized purpose</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold">4. Payment Terms</h2>
              <p className="mt-2 text-muted-foreground">
                All payments are processed through QRIS. Services are activated upon successful payment confirmation.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">5. Contact</h2>
              <p className="mt-2 text-muted-foreground">
                For questions about these Terms of Service, please contact us at support@gamehost.id
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
