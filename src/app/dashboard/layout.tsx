import { AppSidebar } from '@/components/dashboard/AppSidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background selection:bg-primary/20">
                <AppSidebar />
                <SidebarInset className="flex flex-col flex-1 overflow-hidden w-full bg-background/95">
                    <DashboardHeader />
                    <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                        <div className="mx-auto w-full max-w-7xl">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
