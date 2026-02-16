export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Clock, CheckCircle, ShoppingCart } from "lucide-react";

export default async function OrdersPage() {
    const session = await auth();
    if (!session) redirect("/auth/signin");

    const role = session.user.role;

    const customerTabs = [
        { id: "active", label: "Active", icon: Clock },
        { id: "cart", label: "Cart", icon: ShoppingCart },
        { id: "completed", label: "Previous", icon: CheckCircle },
    ];

    const tailorTabs = [
        { id: "incoming", label: "Incoming", icon: Package },
        { id: "accepted", label: "Accepted", icon: Clock },
        { id: "completed", label: "Completed", icon: CheckCircle },
    ];

    const deliveryTabs = [
        { id: "assigned", label: "Assigned", icon: Package },
        { id: "completed", label: "Completed", icon: CheckCircle },
    ];

    const tabs = role === "TAILOR" ? tailorTabs : role === "DELIVERY" ? deliveryTabs : customerTabs;

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">My Orders</h1>

                <Tabs defaultValue={tabs[0].id} className="w-full">
                    <TabsList className="bg-slate-900 border border-slate-800 mb-6">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                            >
                                <tab.icon className="h-4 w-4 mr-1.5" />
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map((tab) => (
                        <TabsContent key={tab.id} value={tab.id}>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-12 text-center">
                                    <div className="mx-auto w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                        <tab.icon className="h-8 w-8 text-slate-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-400">No {tab.label.toLowerCase()} orders</h3>
                                    <p className="text-sm text-slate-600 mt-1">Orders will appear here when available</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </main>
        </div>
    );
}
