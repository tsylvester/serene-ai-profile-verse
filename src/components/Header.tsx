
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">SaaS Framework</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link to="/features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link to="/docs" className="text-sm font-medium transition-colors hover:text-primary">
              Documentation
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/signup">Get Started</Link>
            </Button>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
