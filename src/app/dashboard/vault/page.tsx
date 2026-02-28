"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Search,
    MoreHorizontal,
    Plus,
    KeyRound,
    Filter,
    Eye,
    EyeOff,
    Copy,
    Clock
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock Data
const vaultItems = [
    { id: "sec_1", name: "STRIPE_API_KEY", env: "Production", lastModified: "2 hours ago", author: "Alice W.", status: "Active" },
    { id: "sec_2", name: "DATABASE_URL", env: "Production", lastModified: "12 days ago", author: "System", status: "Active" },
    { id: "sec_3", name: "AWS_ACCESS_KEY", env: "Staging", lastModified: "1 month ago", author: "Bob S.", status: "Needs Rotation" },
    { id: "sec_4", name: "SENDGRID_TOKEN", env: "Development", lastModified: "5 hours ago", author: "Alice W.", status: "Active" },
    { id: "sec_5", name: "REDIS_CONN_STR", env: "Production", lastModified: "3 months ago", author: "System", status: "Stale" },
]

export default function VaultPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredItems = vaultItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.env.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            case "Needs Rotation": return "bg-orange-500/10 text-orange-500 border-orange-500/20"
            case "Stale": return "bg-destructive/10 text-destructive border-destructive/20"
            default: return "bg-muted text-muted-foreground"
        }
    }

    const getEnvColor = (env: string) => {
        switch (env) {
            case "Production": return "bg-purple-500/10 text-purple-400 border-purple-500/20"
            case "Staging": return "bg-blue-500/10 text-blue-400 border-blue-500/20"
            case "Development": return "bg-slate-500/10 text-slate-400 border-slate-500/20"
            default: return "bg-muted text-muted-foreground"
        }
    }

    return (
        <div className="space-y-6 pt-4 pb-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vault Secrets</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Manage and rotate your encrypted environment variables.</p>
                </div>
                <Button className="h-9 gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    <Plus className="h-4 w-4" />
                    Add Secret
                </Button>
            </div>

            <div className="glass-card rounded-xl border border-border/50 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/40">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search secrets by name or environment..."
                            className="pl-9 bg-background/50 border-border/50 h-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="h-9 bg-background/50 text-muted-foreground">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 bg-background/50 text-muted-foreground hidden sm:flex">
                            Environment: All
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-background/40">
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead className="w-[300px]">Secret Name</TableHead>
                                <TableHead>Environment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Modified</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-white/5 border-border/50 transition-colors group">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                    <KeyRound className="h-4 w-4" />
                                                </div>
                                                <span className="truncate max-w-[200px] text-foreground font-mono text-sm">{item.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getEnvColor(item.env)}>
                                                {item.env}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getStatusColor(item.status)}>
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-sm text-foreground flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                                    {item.lastModified}
                                                </span>
                                                <span className="text-xs text-muted-foreground">by {item.author}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-[160px]">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>Edit Value</DropdownMenuItem>
                                                        <DropdownMenuItem>View History</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">Delete Secret</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No secrets found matching "{searchTerm}".
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="p-4 border-t border-border/50 text-xs text-muted-foreground flex justify-between items-center bg-background/40">
                    <span>Showing {filteredItems.length} of {vaultItems.length} secrets</span>
                </div>
            </div>
        </div>
    )
}
