export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Star, Crown, Scissors, Truck, Brain, Activity, Users, CreditCard } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();
    if (!session) redirect("/auth/signin");

    const role = session.user.role;
    const plan = session.user.subscriptionPlan;
    const freeLeft = Math.max(0, 3 - session.user.freeBookingsUsed);

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8">
                {/* Welcome */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{session.user.name}</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-300">{role}</Badge>
                            <Badge variant="outline" className="border-slate-700 text-slate-400">{plan} Plan</Badge>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {role === "CUSTOMER" && (
                        <>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <Package className="h-5 w-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Active Orders</p>
                                        <p className="text-xl font-bold text-white">0</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                                        <Scissors className="h-5 w-5 text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Free Bookings Left</p>
                                        <p className="text-xl font-bold text-white">{freeLeft}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                                        <Crown className="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Subscription</p>
                                        <p className="text-xl font-bold text-white">{plan}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <Brain className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">AI Uses</p>
                                        <p className="text-xl font-bold text-white">0</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                    {role === "TAILOR" && (
                        <>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <Package className="h-5 w-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Incoming Orders</p>
                                        <p className="text-xl font-bold text-white">0</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                        <Activity className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Completed</p>
                                        <p className="text-xl font-bold text-white">0</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                                        <Star className="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Rating</p>
                                        <p className="text-xl font-bold text-white">—</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Earnings</p>
                                        <p className="text-xl font-bold text-white">₹0</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                    {role === "DELIVERY" && (
                        <>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <Truck className="h-5 w-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Assigned</p>
                                        <p className="text-xl font-bold text-white">0</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                        <Activity className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Completed</p>
                                        <p className="text-xl font-bold text-white">0</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Earnings</p>
                                        <p className="text-xl font-bold text-white">₹0</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {role === "CUSTOMER" && (
                        <>
                            <Link href="/booking">
                                <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all cursor-pointer group">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <Scissors className="h-8 w-8 text-purple-400 group-hover:text-purple-300" />
                                        <div>
                                            <h3 className="font-semibold text-white">Book a Stitch</h3>
                                            <p className="text-sm text-slate-400">Find a tailor and place an order</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href="/ai/body-type">
                                <Card className="bg-slate-900/50 border-slate-800 hover:border-pink-500/30 transition-all cursor-pointer group">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <Brain className="h-8 w-8 text-pink-400 group-hover:text-pink-300" />
                                        <div>
                                            <h3 className="font-semibold text-white">AI Body Type</h3>
                                            <p className="text-sm text-slate-400">Know your body type with AI</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href="/subscription">
                                <Card className="bg-slate-900/50 border-slate-800 hover:border-yellow-500/30 transition-all cursor-pointer group">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <Crown className="h-8 w-8 text-yellow-400 group-hover:text-yellow-300" />
                                        <div>
                                            <h3 className="font-semibold text-white">Upgrade Plan</h3>
                                            <p className="text-sm text-slate-400">Get unlimited bookings</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </>
                    )}
                    {role === "TAILOR" && (
                        <Link href="/orders">
                            <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all cursor-pointer group">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <Package className="h-8 w-8 text-purple-400 group-hover:text-purple-300" />
                                    <div>
                                        <h3 className="font-semibold text-white">View Orders</h3>
                                        <p className="text-sm text-slate-400">Manage your incoming orders</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}
                    {role === "DELIVERY" && (
                        <Link href="/orders">
                            <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all cursor-pointer group">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <Truck className="h-8 w-8 text-purple-400 group-hover:text-purple-300" />
                                    <div>
                                        <h3 className="font-semibold text-white">Deliveries</h3>
                                        <p className="text-sm text-slate-400">Manage assigned deliveries</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
}
