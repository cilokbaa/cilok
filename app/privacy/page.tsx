import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString("id-ID")}</p>

          <div className="prose prose-invert mt-8 max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold">1. Information We Collect</h2>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Account information (name, email address from Google OAuth)</li>
                <li>Payment information (processed securely through our payment gateway)</li>
                <li>Usage data and server logs</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send related information</li>
                <li>To improve our services and develop new features</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold">3. Data Security</h2>
              <p className="mt-2 text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized
                access.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">4. Contact Us</h2>
              <p className="mt-2 text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@gamehost.id
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
