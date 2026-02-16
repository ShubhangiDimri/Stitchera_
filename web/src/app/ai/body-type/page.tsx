"use client";

import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Ruler, ArrowRight } from "lucide-react";

const bodyTypes = [
    { type: "Ectomorph", desc: "Lean and long build with narrow shoulders. Best suited for layered outfits and well-fitted shirts.", color: "purple" },
    { type: "Mesomorph", desc: "Athletic and muscular build. Most clothing styles work. Fitted clothing highlights physique.", color: "pink" },
    { type: "Endomorph", desc: "Wider build with soft features. A-line and vertical patterns elongate the silhouette.", color: "blue" },
];

export default function BodyTypePage() {
    const [measurements, setMeasurements] = useState({ chest: "", waist: "", hip: "", height: "", weight: "" });
    const [result, setResult] = useState<null | typeof bodyTypes[0]>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        setLoading(true);
        setTimeout(() => {
            // Simulated AI response
            const idx = Math.floor(Math.random() * bodyTypes.length);
            setResult(bodyTypes[idx]);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="text-center mb-8">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                        <Users className="h-7 w-7 text-purple-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Know Your Body Type</h1>
                    <p className="text-slate-400">Enter your measurements for AI-powered body type analysis</p>
                    <Badge variant="outline" className="mt-2 border-purple-500/50 text-purple-300">₹10 for 3 uses</Badge>
                </div>

                <Card className="bg-slate-900/50 border-slate-800 mb-6">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Ruler className="h-5 w-5 text-purple-400" />
                            Enter Measurements
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(measurements).map(([key, val]) => (
                                <div key={key} className="space-y-1.5">
                                    <Label className="text-slate-300 capitalize">{key} {key === "height" ? "(cm)" : key === "weight" ? "(kg)" : "(inches)"}</Label>
                                    <Input
                                        type="number"
                                        value={val}
                                        onChange={(e) => setMeasurements((p) => ({ ...p, [key]: e.target.value }))}
                                        placeholder={`Enter ${key}`}
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                </div>
                            ))}
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            onClick={handleAnalyze}
                            disabled={loading}
                        >
                            {loading ? "Analyzing..." : "Analyze Body Type"}
                        </Button>
                    </CardContent>
                </Card>

                {result && (
                    <Card className="bg-slate-900/50 border-purple-500/30 animate-in fade-in duration-500">
                        <CardContent className="p-6">
                            <div className="text-center">
                                <div className="w-24 h-32 mx-auto bg-gradient-to-b from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/20">
                                    <span className="text-4xl">🧍</span>
                                </div>
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-3">{result.type}</Badge>
                                <h3 className="text-xl font-bold text-white mb-2">You are a {result.type}!</h3>
                                <p className="text-slate-400 text-sm">{result.desc}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
