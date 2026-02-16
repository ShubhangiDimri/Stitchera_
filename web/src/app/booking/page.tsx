"use client";

import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Scissors, MapPin, Clock, CreditCard, AlertCircle, Info } from "lucide-react";

const services: Record<string, { name: string; price: number }> = {
    suit: { name: "Men's Formal Suit", price: 2500 },
    kurta: { name: "Kurta Pajama", price: 1500 },
    alteration: { name: "Trouser Alteration", price: 300 },
    blouse: { name: "Blouse Stitching", price: 500 },
    saree: { name: "Saree Draping", price: 800 },
    lehenga: { name: "Bridal Lehenga", price: 8000 },
    sherwani: { name: "Sherwani", price: 3500 },
    salwar: { name: "Salwar Kameez", price: 1200 },
    gown: { name: "Designer Gown", price: 5000 },
    jacket: { name: "Jacket Tailoring", price: 2000 },
    embroidery: { name: "Embroidery Work", price: 500 },
    anarkali: { name: "Anarkali Suit", price: 2000 },
};

export default function BookingPage() {
    const [service, setService] = useState("");
    const [distance, setDistance] = useState("5");
    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const selectedService = services[service];
    const servicePrice = selectedService?.price ?? 0;
    const handlingCharge = servicePrice > 0 ? 18 : 0;
    const currentHour = new Date().getHours();
    const surgeCharge = currentHour >= 22 || currentHour < 6 ? 10 : 0;
    const dist = parseFloat(distance) || 0;
    const deliveryCharge = dist * 25;
    const subtotal = servicePrice + handlingCharge + surgeCharge + deliveryCharge;
    const commissionRate = servicePrice <= 500 ? 0.15 : 0.30;
    const commission = servicePrice * commissionRate;
    const total = subtotal;

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Book Your Stitch</h1>
                <p className="text-slate-400 mb-8">Fill in the details to place your order</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Scissors className="h-5 w-5 text-purple-400" /> Service Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-300">Select Service</Label>
                                    <Select value={service} onValueChange={setService}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue placeholder="Choose a service" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-700">
                                            {Object.entries(services).map(([key, s]) => (
                                                <SelectItem key={key} value={key}>
                                                    {s.name} — ₹{s.price.toLocaleString()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-slate-500 flex items-center gap-1"><Info className="h-3 w-3" /> AI suggests this based on your measurements</p>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-300">Special Instructions</Label>
                                    <Input placeholder="Any specific requirements..." className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-pink-400" /> Delivery Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-300">Delivery Address</Label>
                                    <Input placeholder="Enter your full address" className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-300">Approximate Distance (km)</Label>
                                    <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-green-400" /> Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {["UPI", "COD"].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setPaymentMethod(m)}
                                            className={`p-4 rounded-xl border transition-all text-center ${paymentMethod === m
                                                ? "border-purple-500 bg-purple-500/10 text-purple-300"
                                                : "border-slate-700 text-slate-400 hover:border-slate-600"
                                                }`}
                                        >
                                            <span className="font-medium">{m === "UPI" ? "📱 UPI" : "💵 Cash on Delivery"}</span>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="bg-slate-900/50 border-slate-800 sticky top-20">
                            <CardHeader>
                                <CardTitle className="text-white">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {!selectedService ? (
                                    <p className="text-sm text-slate-500 text-center py-4">Select a service to see pricing</p>
                                ) : (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">{selectedService.name}</span>
                                            <span className="text-white">₹{servicePrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Handling Charge</span>
                                            <span className="text-white">₹{handlingCharge}</span>
                                        </div>
                                        {surgeCharge > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-orange-400 flex items-center gap-1">
                                                    <Clock className="h-3 w-3" /> Surge (late hours)
                                                </span>
                                                <span className="text-orange-400">₹{surgeCharge}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Delivery ({dist} km × ₹25)</span>
                                            <span className="text-white">₹{deliveryCharge.toLocaleString()}</span>
                                        </div>
                                        <Separator className="bg-slate-700" />
                                        <div className="flex justify-between font-bold">
                                            <span className="text-white">Total</span>
                                            <span className="text-purple-400">₹{total.toLocaleString()}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 bg-slate-800/50 rounded-lg p-2">
                                            <p>Platform commission: {commissionRate * 100}% (₹{commission.toFixed(0)})</p>
                                            <p>Tailor receives: ₹{(servicePrice - commission).toLocaleString()}</p>
                                        </div>
                                    </>
                                )}
                                <Button
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!selectedService}
                                >
                                    Place Order
                                </Button>
                                <p className="text-xs text-center text-slate-500">A review is mandatory after order completion</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
