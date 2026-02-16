"use client";

import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Star } from "lucide-react";

const garments = [
    { name: "Classic Fit Suit", brand: "Raymond", price: "₹4,500", color: "Navy Blue", delivery: "5 days", rating: 4.8, image: "👔" },
    { name: "Designer Kurta", brand: "FabIndia", price: "₹2,200", color: "Maroon", delivery: "3 days", rating: 4.6, image: "🧥" },
    { name: "Silk Saree", brand: "Kanchipuram", price: "₹6,800", color: "Gold", delivery: "7 days", rating: 4.9, image: "👗" },
    { name: "Cotton Shirt", brand: "Van Heusen", price: "₹1,800", color: "White", delivery: "2 days", rating: 4.5, image: "👕" },
];

export default function MatchingPage() {
    const [brand, setBrand] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [color, setColor] = useState("");
    const [results, setResults] = useState<typeof garments | null>(null);
    const [loading, setLoading] = useState(false);

    const handleMatch = () => {
        setLoading(true);
        setTimeout(() => {
            setResults(garments);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="text-center mb-8">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                        <Sparkles className="h-7 w-7 text-pink-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">AI Matching Garments</h1>
                    <p className="text-slate-400">Get personalized garment suggestions</p>
                    <Badge variant="outline" className="mt-2 border-pink-500/50 text-pink-300">₹19 for 3 uses</Badge>
                </div>

                <Card className="bg-slate-900/50 border-slate-800 mb-6">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-pink-400" /> Preferences
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-slate-300">Brand</Label>
                                <Input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g., Raymond" className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-slate-300">Max Price (₹)</Label>
                                <Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="e.g., 5000" className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-slate-300">Preferred Color</Label>
                                <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g., Navy Blue" className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-slate-300">Delivery Time</Label>
                                <Select>
                                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-700">
                                        <SelectItem value="2">Within 2 days</SelectItem>
                                        <SelectItem value="5">Within 5 days</SelectItem>
                                        <SelectItem value="7">Within 7 days</SelectItem>
                                        <SelectItem value="any">Any</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white" onClick={handleMatch} disabled={loading}>
                            {loading ? "Finding matches..." : "Find Matching Garments"}
                        </Button>
                    </CardContent>
                </Card>

                {results && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-500">
                        {results.map((g) => (
                            <Card key={g.name} className="bg-slate-900/50 border-slate-800 hover:border-pink-500/30 transition-all">
                                <CardContent className="p-4">
                                    <div className="text-3xl mb-2">{g.image}</div>
                                    <h3 className="font-semibold text-white">{g.name}</h3>
                                    <p className="text-xs text-slate-500">{g.brand}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant="outline" className="border-slate-700 text-slate-400">{g.color}</Badge>
                                        <Badge variant="outline" className="border-slate-700 text-slate-400">{g.delivery}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-lg font-bold text-pink-400">{g.price}</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm text-white">{g.rating}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
