
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Database, Layers, Lock, Palette, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Modern SaaS Framework</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          A comprehensive starter template for building scalable SaaS applications with authentication, payments, and AI capabilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/auth/signup">
              Get Started <ArrowRight size={18} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/auth/login">
              Sign In
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Lock />}
            title="Authentication"
            description="Complete user authentication flow with Supabase, including sign up, login, password reset, and account management."
          />
          <FeatureCard 
            icon={<Database />}
            title="Database & Storage"
            description="Structured database with row-level security, migrations, and optimized queries for user profiles and app data."
          />
          <FeatureCard 
            icon={<Zap />}
            title="Stripe Integration"
            description="Seamless subscription management with Stripe, supporting multiple plans and usage-based billing."
          />
          <FeatureCard 
            icon={<Layers />}
            title="API Architecture"
            description="Multi-layer microservices architecture with strict separation of concerns and RESTful endpoints."
          />
          <FeatureCard 
            icon={<Code />}
            title="TypeScript & Redux"
            description="Type-safe development with TypeScript and state management with Redux toolkit."
          />
          <FeatureCard 
            icon={<Palette />}
            title="Theming & UI"
            description="Built-in light/dark mode, theme customization, and responsive UI components powered by shadcn/ui."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">Ready to Start Building?</CardTitle>
            <CardDescription className="text-center text-lg">
              Launch your SaaS product in record time with our comprehensive framework.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pb-8">
            <Button asChild size="lg" className="gap-2">
              <Link to="/auth/signup">
                Create Your Account <ArrowRight size={18} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Index;
