// components/home/HowItWorks.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, PenTool, BookOpen } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Choose topic or create quiz",
    description:
      "Select from thousands of topics or design your own custom quiz with preferred settings.",
    step: "01",
  },
  {
    icon: PenTool,
    title: "Practice or take exam",
    description:
      "Answer questions, track time, and submit your responses for evaluation.",
    step: "02",
  },
  {
    icon: BookOpen,
    title: "Review answers with explanation",
    description:
      "Get detailed explanations and see where you can improve after each attempt.",
    step: "03",
  },
];

export function HowItWorks() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          How It Works
        </h2>
        <p className="text-muted-foreground text-lg">
          Three simple steps to start mastering your learning journey.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="relative border-2 hover:border-primary/30 transition-colors"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/20">
                  {step.step}
                </span>
              </div>
              <CardTitle className="text-xl pt-4">{step.title}</CardTitle>
              <CardDescription className="text-sm">
                {step.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  →
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
