"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    MapPin,
    Search,
    ShoppingCart,
    User,
    Menu,
    LayoutDashboard,
    Package,
    LogOut,
    Scissors,
    ChevronDown,
} from "lucide-react";

export default function Header() {
    const { data: session } = useSession();
    const [location, setLocation] = useState("Select Location");

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left section */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Scissors className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
                            Stitchera
                        </span>
                    </Link>

                    <button className="hidden md:flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors border border-slate-800 rounded-lg px-3 py-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="max-w-[120px] truncate">{location}</span>
                        <ChevronDown className="h-3 w-3" />
                    </button>
                </div>

                {/* Center search */}
                <div className="hidden md:flex flex-1 max-w-md mx-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="w-full rounded-xl bg-slate-800/50 border border-slate-700 pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-2">
                    <Link href="/orders" className="hidden sm:flex">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                            <Package className="h-4 w-4 mr-1.5" />
                            <span className="hidden lg:inline">Orders</span>
                        </Button>
                    </Link>

                    <Link href="/cart">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800 relative">
                            <ShoppingCart className="h-4 w-4" />
                        </Button>
                    </Link>

                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">
                                            {session.user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden lg:inline text-sm">{session.user?.name?.split(" ")[0]}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-slate-900 border-slate-700">
                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white" asChild>
                                    <Link href="/dashboard">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white" asChild>
                                    <Link href="/orders">
                                        <Package className="mr-2 h-4 w-4" />
                                        My Orders
                                    </Link>
                                </DropdownMenuItem>
                                {session.user?.role === "ADMIN" && (
                                    <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white" asChild>
                                        <Link href="/admin">
                                            <User className="mr-2 h-4 w-4" />
                                            Admin Panel
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator className="bg-slate-700" />
                                <DropdownMenuItem
                                    className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/auth/signin">
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20">
                                Sign In
                            </Button>
                        </Link>
                    )}

                    {/* Mobile menu */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="sm" className="text-slate-400">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-slate-900 border-slate-800">
                            <div className="flex flex-col gap-4 mt-8">
                                <Link href="/services" className="text-slate-300 hover:text-white py-2">Services</Link>
                                <Link href="/ai" className="text-slate-300 hover:text-white py-2">AI Tools</Link>
                                <Link href="/subscription" className="text-slate-300 hover:text-white py-2">Pricing</Link>
                                <Link href="/orders" className="text-slate-300 hover:text-white py-2">My Orders</Link>
                                <Link href="/dashboard" className="text-slate-300 hover:text-white py-2">Dashboard</Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
