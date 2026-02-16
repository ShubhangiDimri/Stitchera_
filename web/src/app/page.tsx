import Header from "@/components/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Truck, Sparkles, Star, Crown, Brain, ArrowRight, Users, Shield, Zap } from "lucide-react";

const services = [
  { name: "Men's Tailoring", image: "👔", count: "250+ Tailors" },
  { name: "Women's Tailoring", image: "👗", count: "180+ Tailors" },
  { name: "Alterations", image: "✂️", count: "300+ Tailors" },
  { name: "Embroidery", image: "🧵", count: "120+ Tailors" },
  { name: "Designer Wear", image: "🎨", count: "90+ Tailors" },
  { name: "Festive Collection", image: "🪔", count: "150+ Tailors" },
];

const topTailors = [
  { name: "Ravi Kumar", rating: 4.9, reviews: 312, speciality: "Men's Suits", location: "Delhi" },
  { name: "Priya Sharma", rating: 4.8, reviews: 278, speciality: "Bridal Wear", location: "Mumbai" },
  { name: "Anil Verma", rating: 4.8, reviews: 245, speciality: "Alterations", location: "Bangalore" },
  { name: "Meera Patel", rating: 4.7, reviews: 198, speciality: "Embroidery", location: "Jaipur" },
  { name: "Suresh Gupta", rating: 4.7, reviews: 187, speciality: "Designer Wear", location: "Hyderabad" },
];

const plans = [
  { name: "Karigar", price: "₹99/mo", features: ["5 bookings/mo", "Basic support", "Standard delivery"] },
  { name: "Ustad", price: "₹199/mo", features: ["15 bookings/mo", "Priority support", "Express delivery", "AI body scan"], popular: true },
  { name: "Meher", price: "₹399/mo", features: ["Unlimited bookings", "24/7 support", "Free delivery", "All AI features"] },
  { name: "Shahi", price: "₹799/mo", features: ["Everything in Meher", "Personal stylist", "Premium tailors", "VIP support"] },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Tailoring Platform
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Perfect Stitching,
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Delivered to You
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Connect with expert tailors, get AI body type analysis, and receive perfectly
            stitched garments at your doorstep. Your one-stop tailoring solution.
          </p>

          {/* 3 Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/booking">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105"
              >
                <Scissors className="mr-2 h-5 w-5" />
                Book Your Stitch
              </Button>
            </Link>
            <Link href="/auth/register?role=TAILOR">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg rounded-2xl transition-all hover:scale-105"
              >
                <Scissors className="mr-2 h-5 w-5" />
                Register as Tailor — ₹199
              </Button>
            </Link>
            <Link href="/auth/register?role=DELIVERY">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-pink-500/50 text-pink-300 hover:bg-pink-500/10 px-8 py-6 text-lg rounded-2xl transition-all hover:scale-105"
              >
                <Truck className="mr-2 h-5 w-5" />
                Join as Delivery — ₹79
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">10K+</p>
              <p className="text-sm text-slate-500">Happy Customers</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-slate-500">Expert Tailors</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-slate-500">Cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stitchera?
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Revolutionizing the tailoring industry with technology</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "AI-Powered", desc: "Know your body type and get perfect garment matches with our AI tools" },
              { icon: Shield, title: "Trusted Tailors", desc: "Verified and rated tailors ensuring quality craftsmanship" },
              { icon: Zap, title: "Fast Delivery", desc: "Doorstep delivery with real-time tracking and dedicated partners" },
            ].map((f) => (
              <Card key={f.title} className="bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all group">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                    <f.icon className="h-7 w-7 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Our Services</h2>
              <p className="text-slate-400 mt-1">Browse our range of tailoring services</p>
            </div>
            <Link href="/services">
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((s) => (
              <Link key={s.name} href="/services">
                <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-all cursor-pointer group">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-3">{s.image}</div>
                    <h3 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">{s.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{s.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 border-t border-slate-800/50 bg-gradient-to-b from-slate-950 to-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Assistance</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Smart tools powered by AI to enhance your tailoring experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/ai/body-type">
              <Card className="bg-slate-900/80 border-slate-800 hover:border-purple-500/30 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shrink-0">
                      <Users className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">Know Your Body Type</h3>
                      <p className="text-sm text-slate-400 mt-1">Enter your measurements and get AI-powered body type analysis with a 3D preview</p>
                      <p className="text-xs text-purple-400 mt-2">₹10 for 3 uses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/ai/matching">
              <Card className="bg-slate-900/80 border-slate-800 hover:border-pink-500/30 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="h-6 w-6 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-pink-300 transition-colors">AI Matching Garments</h3>
                      <p className="text-sm text-slate-400 mt-1">Get personalized garment suggestions based on brand, price, color, and delivery time</p>
                      <p className="text-xs text-pink-400 mt-2">₹19 for 3 uses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Tailors */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Top Best Tailors</h2>
          <p className="text-slate-400 mb-10">Highest rated tailors across locations</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topTailors.map((t, i) => (
              <Card key={t.name} className="bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      #{i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.location}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{t.speciality}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-white">{t.rating}</span>
                    <span className="text-xs text-slate-500">({t.reviews} reviews)</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-20 border-t border-slate-800/50 bg-gradient-to-b from-slate-950 to-purple-950/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <Crown className="inline-block h-8 w-8 text-yellow-400 mr-2" />
              Subscription Plans
            </h2>
            <p className="text-slate-400">3 free bookings, then choose a plan that fits</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={`relative bg-slate-900/50 border-slate-800 hover:border-purple-500/30 transition-all ${p.popular ? "border-purple-500 shadow-xl shadow-purple-500/10 scale-105" : ""
                  }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    {p.price}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/subscription">
                    <Button
                      className={`w-full mt-6 ${p.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                        }`}
                      size="sm"
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Scissors className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Stitchera
                </span>
              </div>
              <p className="text-sm text-slate-500">AI-powered tailoring platform for everyone.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/services" className="hover:text-purple-400 transition-colors">Browse Services</Link></li>
                <li><Link href="/booking" className="hover:text-purple-400 transition-colors">Book a Stitch</Link></li>
                <li><Link href="/ai/body-type" className="hover:text-purple-400 transition-colors">Body Type AI</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition-colors">Careers</Link></li>
                <li><Link href="/chat" className="hover:text-purple-400 transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-sm text-slate-600">
            © 2026 Stitchera. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
