import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Shield, Zap, TrendingUp, Clock } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="px-6 py-4 bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">InsureGig AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
            <Button variant="outline" onClick={() => navigate("/auth")}>Login</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-blue-900 mb-6">
              AI Insurance for Delivery Partners
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Protecting every delivery, every week.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Protect your weekly income instantly with AI-powered insurance designed for delivery workers from Swiggy, Zomato, and more.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => navigate("/auth")} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1759692071706-55a314b169f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHdvcmtlciUyMHJhaW4lMjBtb3RvcmN5Y2xlfGVufDF8fHx8MTc3MzczMDg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Delivery worker in rain"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivery workers lose income during heavy rain, pollution, and other disruptions. 
              Traditional insurance is slow and complicated. We make it instant and automatic.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Quick registration with your delivery platform details</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Plan</h3>
              <p className="text-gray-600">Select Normal or Premium coverage based on your needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">AI Monitors</h3>
              <p className="text-gray-600">Our AI tracks weather, AQI, and demand in real-time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Auto Payout</h3>
              <p className="text-gray-600">Instant compensation when disruptions are detected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Detection</h3>
              <p className="text-gray-600">
                Advanced AI monitors weather, pollution, and delivery demand to automatically detect disruptions
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <Clock className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Claims</h3>
              <p className="text-gray-600">
                No paperwork, no waiting. Claims are automatically triggered and processed in minutes
              </p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Earnings Protection</h3>
              <p className="text-gray-600">
                Protect up to ₹3000/week with our Premium plan and keep your income stable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Income?</h2>
          <p className="text-xl mb-8">Join thousands of delivery workers who trust InsureGig AI</p>
          <Button size="lg" onClick={() => navigate("/auth")} className="bg-white text-blue-600 hover:bg-gray-100">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2026 InsureGig AI. Protecting delivery workers with AI.</p>
        </div>
      </footer>
    </div>
  );
}
