// components/home/FeatureHighlight.tsx
import { Badge } from "@/components/ui/badge";
import { Settings, Target, Mic, PenTool } from "lucide-react";

const featuresList = [
  {
    title: "Create Your Own Exam",
    description:
      "Design custom exams with your preferred time limits, marks distribution, and question sets.",
    icon: Settings,
    bullets: ["Time configuration", "Marks per question", "Save templates"],
    image: (
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border">
        <div className="space-y-3">
          <div className="h-2 w-20 bg-primary/40 rounded" />
          <div className="h-8 w-full bg-muted rounded" />
          <div className="h-8 w-3/4 bg-muted rounded" />
          <div className="flex justify-between pt-2">
            <div className="h-6 w-16 bg-primary/20 rounded" />
            <div className="h-6 w-16 bg-primary/20 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Real-Time Scoring & Analytics",
    description:
      "Get instant results, track your progress, and identify weak areas with detailed analytics.",
    icon: Target,
    bullets: ["Instant feedback", "Performance metrics", "Progress tracking"],
    image: (
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border">
        <div className="flex justify-between items-center">
          <div className="h-16 w-16 rounded-full bg-primary/20" />
          <div className="space-y-2 flex-1 ml-4">
            <div className="h-3 w-full bg-muted rounded" />
            <div className="h-3 w-3/4 bg-muted rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="h-12 bg-primary/10 rounded" />
          <div className="h-12 bg-primary/10 rounded" />
        </div>
      </div>
    ),
  },
  {
    title: "Answer Explanations",
    description:
      "Comprehensive explanations for each question to deepen your understanding.",
    icon: Mic,
    bullets: ["Step-by-step solutions", "Concept links", "Reference materials"],
    image: (
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border space-y-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-11/12 bg-muted rounded" />
        <div className="h-4 w-4/5 bg-muted rounded" />
        <div className="mt-3 h-6 w-24 bg-primary/20 rounded" />
      </div>
    ),
  },
  {
    title: "Rich Text Editor (Tiptap)",
    description:
      "Write blogs, create questions, and format content with a powerful WYSIWYG editor.",
    icon: PenTool,
    bullets: ["Formatting tools", "Media embedding", "Code blocks"],
    image: (
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border">
        <div className="flex gap-1 border-b pb-2">
          <div className="h-5 w-5 bg-muted rounded" />
          <div className="h-5 w-5 bg-muted rounded" />
          <div className="h-5 w-5 bg-muted rounded" />
        </div>
        <div className="h-16 w-full mt-3 bg-muted/30 rounded" />
      </div>
    ),
  },
];

export function Features() {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-sm">
          Powerful Features
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Designed for effective learning
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Everything you need to create, practice, and master your subjects.
        </p>
      </div>

      <div className="space-y-24">
        {featuresList.map((feature, idx) => (
          <div
            key={idx}
            className={`grid md:grid-cols-2 gap-12 items-center ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="space-y-4 order-2 md:order-1">
              <div className="inline-flex h-12 w-12 rounded-lg bg-primary/10 items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <ul className="space-y-2 pt-2">
                {feature.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">{feature.image}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
