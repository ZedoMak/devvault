"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [strength, setStrength] = useState(0)
    const router = useRouter()

    // Password strength calculation
    useEffect(() => {
        let score = 0
        if (password.length > 7) score += 1
        if (/[A-Z]/.test(password)) score += 1
        if (/[0-9]/.test(password)) score += 1
        if (/[^A-Za-z0-9]/.test(password)) score += 1

        setStrength(score)
    }, [password])

    const getStrengthColor = () => {
        switch (strength) {
            case 0: return 'bg-border'
            case 1: return 'bg-destructive'
            case 2: return 'bg-orange-500'
            case 3: return 'bg-yellow-500'
            case 4: return 'bg-emerald-500'
            default: return 'bg-border'
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const firstName = formData.get('firstName') as string
        const lastName = formData.get('lastName') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    firstName, 
                    lastName, 
                    email, 
                    password,
                    confirmPassword: password // Since we don't have separate confirm field
                }),
            })

            if (response.ok) {
                const data = await response.json()
                toast.success('Account created successfully! Redirecting to dashboard...')
                
                // Redirect to dashboard after successful registration
                setTimeout(() => {
                    router.push('/dashboard')
                    router.refresh()
                }, 1000)
            } else {
                const errorData = await response.json()
                toast.error(errorData.error || 'Registration failed')
            }
        } catch (error) {
            console.error('Registration error:', error)
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 bg-background/95 -z-20" />
            <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-8 flex justify-center">
                    <Link href="/" className="inline-flex items-center gap-2 group hover:opacity-80 transition-opacity">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                            <Lock className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-foreground">DevVault</span>
                    </Link>
                </div>

                <Card className="glass-card border-border/40 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50" />

                    <CardHeader className="space-y-1 pb-6 relative z-10 pt-8">
                        <CardTitle className="text-2xl font-bold tracking-tight text-center">Create your vault</CardTitle>
                        <CardDescription className="text-center">
                            Start securing your environment safely
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-6 relative z-10">
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="bg-background/50 hover:bg-accent border-border/50 h-11" type="button">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="bg-background/50 hover:bg-accent border-border/50 h-11" type="button">
                                <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                                GitHub
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/50" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or register with
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input 
                                        id="firstName" 
                                        name="firstName"
                                        placeholder="John" 
                                        required 
                                        className="bg-background/50 border-border/50 h-11" 
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input 
                                        id="lastName" 
                                        name="lastName"
                                        placeholder="Doe" 
                                        required 
                                        className="bg-background/50 border-border/50 h-11" 
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="bg-background/50 border-border/50 focus-visible:ring-primary h-11"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative flex flex-col gap-2">
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="bg-background/50 border-border/50 focus-visible:ring-primary h-11 pr-10"
                                            placeholder="Create a strong password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent text-muted-foreground"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>

                                    {/* Password strength indicator */}
                                    <div className="flex gap-1 h-1.5 w-full mt-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={cn(
                                                    "h-full w-1/4 rounded-full transition-colors duration-300",
                                                    password.length === 0 ? "bg-muted" : strength >= level ? getStrengthColor() : "bg-muted"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Password must be at least 8 characters and contain a number and special character.
                                    </span>
                                </div>
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full h-11 bg-primary hover:bg-primary/90 mt-2 shadow-lg shadow-primary/20">
                                {isLoading ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                                ) : (
                                    "Create account"
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-center pb-8 pt-2 relative z-10">
                        <div className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium underline-offset-4">
                                Log in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}