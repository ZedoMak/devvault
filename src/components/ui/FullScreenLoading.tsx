"use client"

import { Lock } from 'lucide-react'

export function FullScreenLoading({ message = "Redirecting..." }: { message?: string }) {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-2xl border-t-2 border-primary animate-spin" />
                <div className="absolute inset-2 rounded-xl border-r-2 border-indigo-500 animate-[spin_1.5s_linear_infinite_reverse]" />
                <div className="absolute inset-4 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-600/20 animate-pulse" />
                <Lock className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground/90 animate-pulse">{message}</h2>
        </div>
    )
}
