import { Lock, Fingerprint, Users, Activity } from 'lucide-react'

const features = [
  {
    icon: Lock,
    title: 'Military-Grade Encryption',
    description: 'Your secrets are encrypted before they leave your browser using AES-GCM. We never see your plaintext data or encryption keys.',
  },
  {
    icon: Fingerprint,
    title: 'JWT Authentication',
    description: 'Secure, stateless authentication. Featuring automatic token rotation, refresh mechanisms, and strict session management.',
  },
  {
    icon: Users,
    title: 'Role-Based Access (RBAC)',
    description: 'Granular permissions. Control exactly who can view, edit, or manage specific environment variables and vault items.',
  },
  {
    icon: Activity,
    title: 'Comprehensive Audit Logs',
    description: 'Complete visibility. Every access, modification, and login attempt is immutably logged for compliance and security reviews.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Built for uncompromising security
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to secure your developer infrastructure, built right in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl glass-card hover:bg-card/80 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}