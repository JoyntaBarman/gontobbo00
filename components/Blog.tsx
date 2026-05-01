'use client'
// components/home/BlogSection.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, User } from "lucide-react";
import Link from "next/link";

// Mock data - in real app, fetch from MongoDB
async function getLatestPosts() {
  // Simulate DB fetch
  return [
    {
      id: "1",
      title: "10 Tips to Master MCQ Exams",
      excerpt:
        "Learn effective strategies to ace multiple-choice questions and improve your test scores.",
      author: "Dr. Sarah Johnson",
      date: "2024-02-15",
      slug: "tips-master-mcq",
    },
    {
      id: "2",
      title: "How to Create Effective Custom Quizzes",
      excerpt:
        "Design personalized exams that target your weak areas and boost retention.",
      author: "Prof. Michael Chen",
      date: "2024-02-10",
      slug: "create-custom-quizzes",
    },
    {
      id: "3",
      title: "Understanding Short Questions: CQ Guide",
      excerpt:
        "Master constructive questions with our comprehensive guide and examples.",
      author: "Emily Rodriguez",
      date: "2024-02-05",
      slug: "cq-guide",
    },
  ];
}

export async function Blog() {
  const posts = await getLatestPosts();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="outline">Latest from Blog</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Insights & Learning Tips
        </h2>
        <p className="text-muted-foreground text-lg">
          Read expert articles, guides, and apply to become a contributor.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="flex flex-col h-full group hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href={`/blog/${post.slug}`}>Read More →</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button variant="outline" asChild>
          <Link href="/blog">Explore All Blogs</Link>
        </Button>
        <Button asChild>
          <Link href="/blog/apply">Apply to Write →</Link>
        </Button>
      </div>
    </div>
  );
}
