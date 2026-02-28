import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ShieldCheck,
  KeyRound,
  Users,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { headers } from 'next/headers'

export default async function DashboardPage() {
  const headersList = headers()
  const userId = (await headersList).get('x-user-id') || "user_123"
  const userRole = (await headersList).get('x-user-role') || "admin"

  return (
    <div className="space-y-6 pt-4 pb-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor your vault security and access metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9">Export Report</Button>
          <Button className="h-9 gap-2">
            <KeyRound className="h-4 w-4" />
            New Secret
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Secrets</CardTitle>
            <KeyRound className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="font-medium mr-1 text-foreground">3</span> Admin devices
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="font-medium mr-1 text-foreground">2</span> pending invitations
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card bg-primary/5 hover:bg-primary/10 border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Security Status</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Optimal</div>
            <p className="text-xs text-primary/80 flex items-center mt-1">
              No vulnerabilities detected
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest audit log events across your organization.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:flex text-xs h-8">View all</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              {[
                { action: "Secret accessed", details: "PROD_DATABASE_URL", user: "Alice Walker", time: "2 mins ago", icon: KeyRound, bg: "bg-blue-500/10 text-blue-500" },
                { action: "New login", details: "From IP 192.168.1.1 (SF, US)", user: "Admin", time: "1 hour ago", icon: Activity, bg: "bg-emerald-500/10 text-emerald-500" },
                { action: "Permission changed", details: "Added Alice to 'Production' group", user: "Admin", time: "3 hours ago", icon: ShieldAlert, bg: "bg-orange-500/10 text-orange-500" },
                { action: "Secret created", details: "STRIPE_API_KEY", user: "Bob Smith", time: "Yesterday", icon: KeyRound, bg: "bg-purple-500/10 text-purple-500" },
              ].map((event, i) => (
                <div key={i} className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${event.bg}`}>
                    <event.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{event.action}</p>
                    <p className="text-xs text-muted-foreground">{event.details}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="outline" className="text-[10px] bg-background font-normal">{event.user}</Badge>
                    <div className="flex items-center text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 glass-card">
          <CardHeader className="pb-2">
            <CardTitle>Vault Health</CardTitle>
            <CardDescription>Security overview of stored secrets.</CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Total Encrypted</span>
                  <span className="text-primary font-medium">100%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-emerald-500">Rotated &lt; 30 days</span>
                  <span className="text-emerald-500 font-medium">85%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[85%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-orange-500">Stale &gt; 90 days</span>
                  <span className="text-orange-500 font-medium">15%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[15%]" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500/90 text-sm">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <p className="leading-tight">
                  <span className="font-semibold text-orange-500 mr-1">Alert:</span>
                  3 production keys haven't been rotated in over 6 months.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}