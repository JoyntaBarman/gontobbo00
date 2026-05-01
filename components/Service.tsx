// components/home/ServicesSection.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Clock, FileQuestion, GraduationCap } from "lucide-react";

const services = [
  {
    icon: FileQuestion,
    title: "MCQ Practice",
    description:
      "Thousands of multiple-choice questions with instant feedback and detailed explanations.",
  },
  {
    icon: Clock,
    title: "Custom Exams",
    description:
      "Set your own time limits, marks, and difficulty levels. Full control over your tests.",
  },
  {
    icon: GraduationCap,
    title: "Short Questions (CQ)",
    description:
      "Practice constructive questions and learn structured answering techniques.",
  },
  {
    icon: BookOpen,
    title: "Blog Learning",
    description:
      "Read expert blogs, apply for topics, and contribute your knowledge to the community.",
  },
];

export function Services() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Core Learning Features
        </h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to master your subjects in one place.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border"
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
