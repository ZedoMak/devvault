import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">DevVault</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/login" passHref>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors">Log in</Button>
          </Link>
          <Link href="/register" passHref>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">Sign up</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}