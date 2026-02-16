export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Sparkles } from "lucide-react";

const plans = [
    {
        name: "FREE",
        displayName: "Free",
        price: "₹0",
        period: "",
        features: ["3 bookings total", "Basic support", "Standard delivery"],
        gradient: "from-slate-600 to-slate-500",
    },
    {
        name: "KARIGAR",
        displayName: "Karigar",
        price: "₹99",
        period: "/month",
        features: ["5 bookings/month", "Basic support", "Standard delivery", "Order tracking"],
        gradient: "from-blue-600 to-cyan-500",
    },
    {
        name: "USTAD",
        displayName: "Ustad",
        price: "₹199",
        period: "/month",
        features: ["15 bookings/month", "Priority support", "Express delivery", "AI body scan", "Order tracking"],
        popular: true,
        gradient: "from-purple-600 to-pink-500",
    },
    {
        name: "MEHER",
        displayName: "Meher",
        price: "₹399",
        period: "/month",
        features: ["Unlimited bookings", "24/7 support", "Free delivery", "All AI features", "Priority matching"],
        gradient: "from-amber-600 to-orange-500",
    },
    {
        name: "SHAHI",
        displayName: "Shahi",
        price: "₹799",
        period: "/month",
        features: ["Everything in Meher", "Personal stylist", "Premium tailors only", "VIP support", "Exclusive designs"],
        gradient: "from-yellow-500 to-amber-400",
    },
];

export default async function SubscriptionPage() {
    const session = await auth();
    if (!session) redirect("/auth/signin");

    const currentPlan = session.user.subscriptionPlan;

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-10">
                    <Crown className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                    <h1 className="text-3xl font-bold text-white mb-2">Subscription Plans</h1>
                    <p className="text-slate-400">Choose the plan that best fits your needs</p>
                    <Badge variant="outline" className="mt-3 border-purple-500/50 text-purple-300">
                        Current Plan: {currentPlan}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`relative bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all ${plan.popular ? "border-purple-500 shadow-xl shadow-purple-500/10 lg:scale-105" : ""
                                } ${currentPlan === plan.name ? "ring-2 ring-green-500/50" : ""}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-semibold text-white flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" /> Popular
                                </div>
                            )}
                            <CardContent className="p-5">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-3`}>
                                    <Crown className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white">{plan.displayName}</h3>
                                <div className="flex items-baseline gap-1 mt-1 mb-4">
                                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                                    <span className="text-sm text-slate-500">{plan.period}</span>
                                </div>
                                <ul className="space-y-2 mb-5">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                                            <Check className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full ${currentPlan === plan.name
                                        ? "bg-green-600/20 text-green-400 border border-green-500/30 cursor-default"
                                        : plan.popular
                                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                            : "bg-slate-800 hover:bg-slate-700 text-white"
                                        }`}
                                    size="sm"
                                    disabled={currentPlan === plan.name}
                                >
                                    {currentPlan === plan.name ? "Current Plan" : "Upgrade"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
