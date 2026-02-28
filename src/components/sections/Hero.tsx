import { Button } from '@/components/ui/button'
import { ArrowRight, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Shield className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-blue-500">Secure by default</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Your secure vault for developer resources
          </h1>
          
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Store API keys, database credentials, and environment variables with enterprise-grade encryption. Access them anywhere, securely.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}