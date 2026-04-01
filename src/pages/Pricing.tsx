import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic cloud storage",
    features: ["5 GB storage", "2 GB upload limit", "AI assistant (50 daily uses)", "Basic file management", "Web access"],
    cta: "Get started",
    href: "/auth?tab=signup",
    popular: false,
  },
  {
    name: "Student",
    price: "Free",
    period: "with verification",
    description: "Enhanced storage for verified students",
    features: ["50 GB storage", "20 GB upload limit", "Full AI assistant", "AI file organization", "Priority support", "Collaboration tools"],
    cta: "Apply as student",
    href: "/student-apply",
    popular: true,
  },
  {
    name: "Premium",
    price: "$4.99",
    period: "/month",
    description: "Full power for professionals",
    features: ["100 GB storage", "50 GB upload limit", "All AI features", "AI file organization", "Priority support", "Advanced sharing", "Version history"],
    cta: "Upgrade to Premium",
    href: "/auth?tab=signup&plan=premium",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for your organization",
    features: ["Unlimited storage", "Custom upload limits", "All AI features", "Dedicated support", "Admin console", "Azure integration", "SSO & compliance"],
    cta: "Contact support",
    href: "mailto:gassetrashed454@gmail.com",
    popular: false,
  },
];

const Pricing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="container py-20 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
          Simple, transparent pricing
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Choose the plan that fits your needs. Upgrade or downgrade anytime.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col relative ${tier.popular ? "border-primary shadow-lg ring-1 ring-primary" : ""}`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full zonix-gradient px-3 py-0.5 text-xs font-medium text-primary-foreground">
                Most popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="pt-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground text-sm ml-1">{tier.period}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild>
                <Link to={tier.href}>{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  </div>
);

export default Pricing;
