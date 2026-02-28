import { Shield, Key, Container } from 'lucide-react'

const steps = [
    {
        step: '01',
        title: 'Create Your Vault',
        description: 'Set up your secure environment. Define your organization and connect your development tools.',
        icon: Container,
    },
    {
        step: '02',
        title: 'Add & Encrypt Secrets',
        description: 'Store API keys, database URLs, and certificates. Everything is client-side encrypted before uploading.',
        icon: Shield,
    },
    {
        step: '03',
        title: 'Manage Access',
        description: 'Assign roles to your team members. Connect via our CLI or SDKs to inject secrets directly into your build process.',
        icon: Key,
    },
]

export default function HowItWorks() {
    return (
        <section className="py-24 bg-secondary/30 relative">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                        How DevVault Works
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        A seamless flow from secret creation to secure deployment.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
                    {/* Connector Line for Desktop */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

                    {steps.map((item, index) => (
                        <div key={item.step} className="relative flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6 relative z-10 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500">
                                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/30">
                                    {item.step}
                                </span>
                                <item.icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
