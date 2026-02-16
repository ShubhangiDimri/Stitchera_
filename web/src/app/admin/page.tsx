export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Package, CreditCard, Star, Crown, Brain, Shield } from "lucide-react";

export default async function AdminPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/");

    const stats = [
        { label: "Total Users", value: "0", icon: Users, color: "purple" },
        { label: "Total Orders", value: "0", icon: Package, color: "pink" },
        { label: "Revenue", value: "₹0", icon: CreditCard, color: "green" },
        { label: "Active Subs", value: "0", icon: Crown, color: "yellow" },
        { label: "Avg Rating", value: "—", icon: Star, color: "orange" },
        { label: "AI Usage", value: "0", icon: Brain, color: "blue" },
    ];

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="h-7 w-7 text-purple-400" />
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {stats.map((s) => (
                        <Card key={s.label} className="bg-slate-900/50 border-slate-800">
                            <CardContent className="p-4 text-center">
                                <s.icon className={`h-6 w-6 mx-auto mb-2 text-${s.color}-400`} />
                                <p className="text-xl font-bold text-white">{s.value}</p>
                                <p className="text-xs text-slate-500">{s.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Management Tabs */}
                <Tabs defaultValue="users" className="w-full">
                    <TabsList className="bg-slate-900 border border-slate-800 mb-6">
                        <TabsTrigger value="users" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <Users className="h-4 w-4 mr-1.5" /> Users
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <Package className="h-4 w-4 mr-1.5" /> Orders
                        </TabsTrigger>
                        <TabsTrigger value="payments" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <CreditCard className="h-4 w-4 mr-1.5" /> Payments
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                            <Star className="h-4 w-4 mr-1.5" /> Reviews
                        </TabsTrigger>
                    </TabsList>

                    {["users", "orders", "payments", "reviews"].map((tab) => (
                        <TabsContent key={tab} value={tab}>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-12 text-center">
                                    <div className="mx-auto w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                        <Package className="h-8 w-8 text-slate-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-400">No {tab} data yet</h3>
                                    <p className="text-sm text-slate-600 mt-1">Data will populate as the platform grows</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </main>
        </div>
    );
}
