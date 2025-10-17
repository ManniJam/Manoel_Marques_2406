import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Car, Users, Shield, Zap, Star, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Joyze Livery</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-black transition-colors">How it works</a>
            <a href="#safety" className="text-gray-600 hover:text-black transition-colors">Safety</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Go anywhere with<br />Joyze Livery
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Request a ride, hop in, and go. Or drive and earn on your schedule.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-xl transition-all transform hover:scale-105"
            onClick={() => navigate('/rider/login')}
          >
            <Users className="mr-2 h-5 w-5" />
            Ride with us
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-black hover:bg-gray-50 px-8 py-6 text-lg rounded-xl transition-all transform hover:scale-105"
            onClick={() => navigate('/driver/login')}
          >
            <Car className="mr-2 h-5 w-5" />
            Drive & Earn
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why choose us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow border-0 bg-white">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast & Reliable</h3>
              <p className="text-gray-600">Get a ride in minutes with our extensive network of drivers available 24/7.</p>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow border-0 bg-white">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
              <p className="text-gray-600">All drivers are verified. Track your ride in real-time and share your trip with friends.</p>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow border-0 bg-white">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Affordable Prices</h3>
              <p className="text-gray-600">Transparent pricing with no hidden fees. Compare options and choose what fits your budget.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10M+</div>
              <div className="text-gray-600 text-lg">Happy Riders</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500K+</div>
              <div className="text-gray-600 text-lg">Active Drivers</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <span className="text-5xl font-bold">4.9</span>
                <Star className="w-8 h-8 fill-yellow-400 text-yellow-400 ml-2" />
              </div>
              <div className="text-gray-600 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                <span className="text-white font-semibold">Hermes Voiture</span> has been revolutionizing transportation since <span className="text-white font-semibold">November 2017</span>. What started as a vision to provide reliable, affordable rides has grown into a trusted platform serving millions of riders and drivers.
              </p>
              <p>
                In <span className="text-white font-semibold">May 2021</span>, we expanded our operations to the Sunshine State, bringing our exceptional service to <span className="text-white font-semibold">Florida</span>. Since then, we've been committed to connecting communities, creating earning opportunities, and making every journey safe and comfortable.
              </p>
              <p className="text-xl text-white font-medium mt-8">
                Proudly serving Florida communities since 2021
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-xl font-bold">Hermes & Eshu</div>
                <div className="text-xs text-gray-400">A Hermes Voiture Company</div>
              </div>
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              <div>© 2025 Hermes Voiture. All rights reserved.</div>
              <div className="text-xs mt-1">In operation since November 2017 • Florida since May 2021</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;