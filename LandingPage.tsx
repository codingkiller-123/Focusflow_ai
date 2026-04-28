import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Brain, BarChart2, Shield, Download, ArrowRight, Focus } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-orange-500/30 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Focus className="text-white w-5 h-5" />
             </div>
             <span className="font-bold text-xl tracking-tight">Focus.ai</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-orange-400 transition-colors">Log In</Link>
            <Button asChild className="rounded-full rounded-md px-6">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Focus Mode 2.0 is Here
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8">
              Reclaim your time.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Master your focus.
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              AI-powered app blocking, deep work timers, and behavior analysis 
              to help you break distractions and do your best work.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 h-14 text-base w-full sm:w-auto">
                <Link to="/login">
                  Start Focusing Free <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 w-full sm:w-auto border-white/10 hover:bg-white/5">
                <Download className="w-5 h-5 mr-2" /> Install Desktop App
              </Button>
            </div>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto w-full max-w-4xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-2xl relative overflow-hidden">
               <div className="aspect-video bg-zinc-900 rounded-xl flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                 {/* Fake UI */}
                 <div className="relative z-10 w-full h-full p-8 flex gap-6">
                    <div className="w-64 bg-zinc-950 rounded-lg border border-white/10 p-4">
                      <div className="h-6 w-32 bg-white/10 rounded mb-8"/>
                      <div className="space-y-4">
                        {[1,2,3,4].map(i => <div key={i} className="h-4 w-full bg-white/5 rounded"/>)}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/5 rounded-2xl border border-orange-500/20 flex items-center justify-center">
                        <div className="text-center">
                           <div className="text-4xl font-bold font-mono">45:00</div>
                           <div className="text-sm text-orange-400">Deep Work Session</div>
                        </div>
                      </div>
                      <div className="flex-1 bg-zinc-950 rounded-2xl border border-white/10 p-6">
                        <div className="h-full flex items-end gap-2">
                          {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                             <div key={i} className="flex-1 bg-white/10 rounded-t-sm transition-all" style={{height: `${h}%`}} />
                          ))}
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to focus.</h2>
            <p className="text-zinc-400 text-lg">Powerful tools designed to combat modern distractions.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Smart App Blocking", desc: "Category-based blocking with strict modes that prevent you from cheating." },
              { icon: Brain, title: "AI Behavior Analysis", desc: "Learn your peak productivity hours and get personalized tips from our AI assistant." },
              { icon: Target, title: "Automated Focus", desc: "Auto-starts Focus Mode based on your calendar or location." },
              { icon: BarChart2, title: "Deep Analytics", desc: "Track screen time, focus streaks, and productivity score over time." },
            ].map((f, i) => (
              <div key={i} className="bg-black border border-white/5 p-8 rounded-2xl hover:border-orange-500/30 transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                  <f.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed disabled">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="py-12 border-t border-white/5 text-center text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Focus.ai Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
