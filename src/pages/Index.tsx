import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ZonixLogo from "@/components/ZonixLogo";
import { Cloud, Shield, Zap, Users } from "lucide-react";

const features = [
  { icon: Cloud, title: "Cloud Storage", desc: "Store files securely with up to 100GB of space." },
  { icon: Zap, title: "AI Powered", desc: "Smart file organization and AI assistance built in." },
  { icon: Shield, title: "Secure", desc: "Enterprise-grade security for all your data." },
  { icon: Users, title: "Collaborate", desc: "Share files and folders with your team." },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    {/* Hero */}
    <section className="container py-24 text-center animate-fade-in">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex justify-center mb-6">
          <ZonixLogo size="lg" showText={false} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Your files, <span className="zonix-gradient-text">everywhere</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Zonix Cloud gives you secure cloud storage with AI-powered file management. Access your files from anywhere, anytime.
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <Button size="lg" asChild>
            <Link to="/auth?tab=signup">Get started free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/pricing">View plans</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="container py-20">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
            <f.icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <ZonixLogo size="sm" />
        <p>© 2026 Zonix Cloud. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

export default Index;
