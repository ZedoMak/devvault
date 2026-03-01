"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
    Lock,
    LayoutDashboard,
    KeyRound,
    ShieldAlert,
    History,
    Users,
    Settings
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"

const mainNav = [
    {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Vault Secrets",
        url: "/dashboard/vault",
        icon: KeyRound,
    },
    {
        title: "Active Sessions",
        url: "/dashboard/sessions",
        icon: ShieldAlert,
    },
]

const adminNav = [
    {
        title: "Audit Logs",
        url: "/dashboard/audit",
        icon: History,
    },
    {
        title: "User Management",
        url: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r border-border/40 bg-zinc-950/50 backdrop-blur-xl" collapsible="icon" {...props}>
            <SidebarHeader className="h-16 flex justify-center px-4 border-b border-border/40">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 shadow-sm shadow-indigo-500/20 text-white">
                                    <Lock className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none pl-2">
                                    <span className="font-semibold text-lg hover:text-primary transition-colors">DevVault</span>
                                    <span className="text-xs text-muted-foreground mr-1">Admin Panel</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="gap-0 py-4 custom-scrollbar">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Vault Services</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNav.map((item) => {
                                const isActive = pathname === item.url || pathname?.startsWith(`${item.url}/`) && item.url !== '/dashboard'
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`h-9 hover:bg-white/5 transition-all ${isActive ? 'bg-primary/10 text-primary hover:bg-primary/20 font-medium relative after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-1 after:bg-primary after:rounded-r-md' : 'text-muted-foreground'}`}
                                            tooltip={item.title}
                                        >
                                            <a href={item.url} className="flex items-center gap-3">
                                                <item.icon className={`size-4 ${isActive ? 'text-primary' : ''}`} />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-6">
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Administration</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminNav.map((item) => {
                                const isActive = pathname === item.url || pathname?.startsWith(`${item.url}/`)
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`h-9 hover:bg-white/5 transition-all ${isActive ? 'bg-primary/10 text-primary hover:bg-primary/20 font-medium relative after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-1 after:primary after:rounded-r-md' : 'text-muted-foreground'}`}
                                            tooltip={item.title}
                                        >
                                            <a href={item.url} className="flex items-center gap-3">
                                                <item.icon className={`size-4 ${isActive ? 'text-primary' : ''}`} />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/40 p-4">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-sm font-semibold mb-1 text-foreground">Vault Status</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        All systems nominal
                    </div>
                </div>
            </SidebarFooter>
            <SidebarRail className="hover:after:bg-primary/20" />
        </Sidebar>
    )
}
