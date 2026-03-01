import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, Github } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[75vh]">
      {/* Background radial gradient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Enterprise-grade security by default</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <span className="block text-foreground">Secure Your Secrets.</span>
            <span className="block gradient-text mt-2">Control Your Access.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            The high-trust developer vault built for modern teams. Store API keys, database credentials, and env variables with encrypted RBAC & OAuth integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#demo" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base bg-background/50 backdrop-blur-md hover:bg-accent border-border/50 transition-all hover:-translate-y-0.5">
                <Github className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </Link>
          </div>

        </div>
      </div>

      {/* Decorative tech grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </section>
  )
}