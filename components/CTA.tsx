import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="relative py-16 px-6 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Start Practicing Today
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          Join thousands of learners who are improving their skills daily with
          smart practice tools.
        </p>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/get-started">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
