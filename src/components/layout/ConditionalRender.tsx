"use client"

import { usePathname } from 'next/navigation'

export function ConditionalRender({
    children,
    hideOnRoutes
}: {
    children: React.ReactNode
    hideOnRoutes: string[]
}) {
    const pathname = usePathname()
    if (hideOnRoutes.some(route => pathname?.startsWith(route))) {
        return null
    }
    return <>{children}</>
}
