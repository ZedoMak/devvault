import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/40 pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">Experience liftoff</h3>
            <p className="text-muted-foreground text-sm">The premier vault for your development secrets and configuration.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-3 lg:pl-16">
            <div className="flex flex-col space-y-3">
              <h4 className="font-medium text-sm">Product</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Download</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Enterprise</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Changelog</Link>
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="font-medium text-sm">Resources</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API Reference</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link>
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="font-medium text-sm">Company</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Press</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Massive DevVault Text */}
        <div className="flex justify-center items-center w-full mb-12 select-none pointer-events-none">
          <h1 className="text-[17vw] leading-[0.8] font-bold tracking-tighter text-foreground/90 mix-blend-normal">
            DevVault
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/40 gap-4">
          <div className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-blue-600">
              <Lock className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-muted-foreground">DevVault</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">About DevVault</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}