export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} DevVault. All rights reserved.
      </div>
    </footer>
  )
}