"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Scissors, Truck, User } from "lucide-react";

const roles = [
    { value: "CUSTOMER", label: "Customer", icon: User, description: "Book tailoring services" },
    { value: "TAILOR", label: "Tailor", icon: Scissors, description: "Offer your tailoring skills" },
    { value: "DELIVERY", label: "Delivery Partner", icon: Truck, description: "Deliver orders" },
];

function RegisterForm() {
    const searchParams = useSearchParams();
    const preselectedRole = searchParams.get("role") || "";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(preselectedRole);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!role) {
            setError("Please select a role");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registration failed");
                setLoading(false);
                return;
            }

            // Auto sign in after registration
            const signInResult = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (signInResult?.ok) {
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            setError("Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 px-4 py-8">
            <Card className="w-full max-w-md border-purple-500/20 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Join Stitchera
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Create your account and select your role
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Role Selection */}
                        <div className="space-y-2">
                            <Label className="text-slate-300">I am a...</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {roles.map((r) => (
                                    <button
                                        key={r.value}
                                        type="button"
                                        onClick={() => setRole(r.value)}
                                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${role === r.value
                                            ? "border-purple-500 bg-purple-500/10 text-purple-300 shadow-lg shadow-purple-500/10"
                                            : "border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-300"
                                            }`}
                                    >
                                        <r.icon className="h-5 w-5" />
                                        <span className="text-xs font-medium">{r.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-slate-800 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-slate-800 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Min 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="bg-slate-800 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all shadow-lg shadow-purple-500/25"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="justify-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
                <div className="text-slate-400">Loading...</div>
            </div>
        }>
            <RegisterForm />
        </Suspense>
    );
}
