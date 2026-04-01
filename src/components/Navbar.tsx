import { Link } from "react-router-dom";
import ZonixLogo from "./ZonixLogo";
import { Button } from "./ui/button";

const Navbar = () => (
  <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
    <div className="container flex h-14 items-center justify-between">
      <Link to="/" className="flex items-center">
        <ZonixLogo size="sm" />
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </Link>
        <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Support
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/auth?tab=signup">Get started free</Link>
          </Button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
