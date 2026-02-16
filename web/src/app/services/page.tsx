import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Filter, Search } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Men's Wear", "Women's Wear", "Alterations", "Embroidery", "Designer Wear", "Festive"];

const servicesList = [
    { id: 1, name: "Men's Formal Suit", category: "Men's Wear", price: "₹2,500 – ₹5,000", rating: 4.8, tailors: 45, image: "👔" },
    { id: 2, name: "Bridal Lehenga", category: "Women's Wear", price: "₹8,000 – ₹25,000", rating: 4.9, tailors: 28, image: "👗" },
    { id: 3, name: "Trouser Alteration", category: "Alterations", price: "₹150 – ₹400", rating: 4.7, tailors: 120, image: "✂️" },
    { id: 4, name: "Embroidery Work", category: "Embroidery", price: "₹500 – ₹3,000", rating: 4.6, tailors: 35, image: "🧵" },
    { id: 5, name: "Sherwani", category: "Men's Wear", price: "₹3,500 – ₹12,000", rating: 4.8, tailors: 22, image: "🎩" },
    { id: 6, name: "Salwar Kameez", category: "Women's Wear", price: "₹1,200 – ₹4,000", rating: 4.7, tailors: 55, image: "👘" },
    { id: 7, name: "Kurta Pajama", category: "Men's Wear", price: "₹800 – ₹2,500", rating: 4.6, tailors: 65, image: "🧥" },
    { id: 8, name: "Blouse Stitching", category: "Women's Wear", price: "₹300 – ₹1,500", rating: 4.8, tailors: 90, image: "👚" },
    { id: 9, name: "Designer Gown", category: "Designer Wear", price: "₹5,000 – ₹20,000", rating: 4.9, tailors: 15, image: "🎨" },
    { id: 10, name: "Festival Kurta", category: "Festive", price: "₹1,500 – ₹5,000", rating: 4.7, tailors: 40, image: "🪔" },
    { id: 11, name: "Jacket Tailoring", category: "Men's Wear", price: "₹2,000 – ₹6,000", rating: 4.5, tailors: 30, image: "🧳" },
    { id: 12, name: "Anarkali Suit", category: "Women's Wear", price: "₹2,000 – ₹8,000", rating: 4.8, tailors: 38, image: "💃" },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Services</h1>
                <p className="text-slate-400 mb-6">Browse and book tailoring services</p>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input placeholder="Search services..." className="pl-10 bg-slate-900 border-slate-700 text-white" />
                    </div>
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        <Filter className="h-4 w-4 mr-2" /> Filters
                    </Button>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    {categories.map((cat) => (
                        <Badge
                            key={cat}
                            variant="outline"
                            className="cursor-pointer whitespace-nowrap border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-300 transition-all px-4 py-1.5"
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {servicesList.map((s) => (
                        <Link key={s.id} href="/booking">
                            <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all cursor-pointer group h-full">
                                <CardContent className="p-5">
                                    <div className="text-4xl mb-3">{s.image}</div>
                                    <Badge variant="outline" className="border-slate-700 text-slate-500 text-xs mb-2">{s.category}</Badge>
                                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">{s.name}</h3>
                                    <p className="text-sm text-purple-400 font-medium mt-1">{s.price}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm text-white">{s.rating}</span>
                                        </div>
                                        <span className="text-xs text-slate-500">{s.tailors} tailors</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
