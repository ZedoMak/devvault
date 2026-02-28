"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Laptop,
    Smartphone,
    Globe,
    MapPin,
    Clock,
    ShieldX
} from "lucide-react"

// Mock Data
const sessions = [
    { id: "sess_1", device: "MacBook Pro M2", os: "macOS 14.2", browser: "Chrome 122", ip: "192.168.1.1", location: "San Francisco, US", time: "Current Session", isCurrent: true, type: "desktop" },
    { id: "sess_2", device: "iPhone 15 Pro", os: "iOS 17.3", browser: "Safari Mobile", ip: "10.0.0.5", location: "San Francisco, US", time: "2 hours ago", isCurrent: false, type: "mobile" },
    { id: "sess_3", device: "ThinkPad X1", os: "Windows 11", browser: "Edge 120", ip: "203.0.113.42", location: "London, UK", time: "3 days ago", isCurrent: false, type: "desktop" },
]

export default function SessionsPage() {

    const getDeviceIcon = (type: string) => {
        switch (type) {
            case "desktop": return <Laptop className="h-5 w-5" />
            case "mobile": return <Smartphone className="h-5 w-5" />
            default: return <Globe className="h-5 w-5" />
        }
    }

    return (
        <div className="space-y-6 pt-4 pb-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Active Sessions</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Manage devices and browsers currently signed into your account.</p>
                </div>
                <Button variant="destructive" className="h-9 gap-2 shadow-lg shadow-destructive/20 hover:scale-105 transition-all">
                    <ShieldX className="h-4 w-4" />
                    Revoke All Other Sessions
                </Button>
            </div>

            <div className="glass-card rounded-xl border border-border/50 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-background/40">
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead className="w-[300px]">Device & Browser</TableHead>
                                <TableHead>Location Details</TableHead>
                                <TableHead>Last Activity</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessions.map((session) => (
                                <TableRow key={session.id} className="hover:bg-white/5 border-border/50 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${session.isCurrent ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                {getDeviceIcon(session.type)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium flex items-center gap-2">
                                                    {session.device}
                                                    {session.isCurrent && (
                                                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase h-5 font-semibold">
                                                            This Device
                                                        </Badge>
                                                    )}
                                                </span>
                                                <span className="text-xs text-muted-foreground">{session.os} • {session.browser}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col space-y-1 text-sm">
                                            <span className="flex items-center gap-1.5 text-foreground">
                                                <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                                                {session.location}
                                            </span>
                                            <span className="text-xs text-muted-foreground font-mono">{session.ip}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-foreground flex items-center gap-1.5">
                                            <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                                            {session.time}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {!session.isCurrent && (
                                            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                                Revoke Session
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
