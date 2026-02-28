import { Lock, Key, Eye, History } from 'lucide-react'

const features = [
  {
    icon: Lock,
    title: 'End-to-end encryption',
    description: 'Your secrets are encrypted before they leave your browser. We never see your plaintext data.',
  },
  {
    icon: Key,
    title: 'Secure authentication',
    description: 'OAuth support, JWT tokens with rotation, and session management to keep your account safe.',
  },
  {
    icon: Eye,
    title: 'Audit logs',
    description: 'Every access and change is logged. Know exactly who viewed what and when.',
  },
  {
    icon: History,
    title: 'Version history',
    description: 'Track changes to your secrets and revert if needed. (Coming soon)',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Everything you need to stay secure
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105"
            >
              <feature.icon className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}