import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto rounded-3xl glass-card border border-primary/20 p-8 md:p-16 text-center relative overflow-hidden">
                    {/* Inner ambient glow */}
                    <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />
                    <div className="absolute bottom-0 left-0 p-32 bg-indigo-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-foreground relative z-10">
                        Ready to secure your infrastructure?
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
                        Join forward-thinking teams that trust DevVault to manage their most critical secrets and environment variables.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link href="/register">
                            <Button size="lg" className="h-14 px-8 text-base group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105">
                                Start for free
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 hover:bg-accent border-border/50 backdrop-blur-sm transition-all hover:scale-105">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
