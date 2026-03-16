
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { toast } from "sonner";
import { DropdownType } from "@/types";

interface Props {
  id?: string;
}

interface MCQForm {
  _id?: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  tags: string;
  mark: number;
  negative_mark: number;
  is_multiple_correct: boolean;
  type: string;
  source: string;
  subject_id: string;
  subject_topic_id: string;
  difficulty: string;
  status: string;
}

const initialData = {
  _id : '',
  question: "",
  options: ["", "", "", ""],
  correct_answer: 0,
  explanation: "",
  tags: "",
  mark: 1,
  negative_mark: 0,
  is_multiple_correct: false,
  type: "MCQ",
  source: "",
  subject_id: "",
  subject_topic_id: "",
  difficulty: "",
  status: "698d65330f317b4bb998216e",
};

export default function MCQEditAndCreate({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

    const [subjects, setSubjects] = useState<DropdownType[]>([]);
    const [topics, setTopics] = useState<DropdownType[]>([]);
    const [difficulties, setDifficulties] = useState<DropdownType[]>([]);


  const [form, setForm] = useState<MCQForm>(initialData);


    const fetchData = async () => {
      try {
                setInitialLoading(true);
          const res = await fetch(`/api/mcq/${id}`);
          const data = await res.json();

          console.log("data : ", data)

          setForm({
            ...data?.data[0],
            tags: data?.data[0].tags?.join(", ") || "",
          });
      } catch (e: any) {
        console.log(e?.message || "Failed to fetch mcq data.");
      } finally{
        setInitialLoading(false)
      }
    };

    const fetchSubjects = async () => {
    
      try {
          const res = await fetch("/api/subject?page=0&limit=100");
          const data = await res.json();
          setSubjects(data?.data || []);
      } catch (e: any) {
        console.log(e?.message || "Failed to fetch subject data.");
      }
    };

    const fetchDifficulty = async () => {
       try {
           const res = await fetch("/api/defficulty-level?page=0&limit=100");
          const data = await res.json();
          setDifficulties(data?.data || []);
       } catch(e: any){
        console.log(e?.message || "Failed to fetch difficulty level data.");
       }
        };

    const fetchTopics = async (id : string) => {
              try {
                      const res = await fetch(
                        `/api/topic?subject=${id}&page=0&limit=100`,
                      );
                      const data = await res.json();
                      setTopics(data?.data || []);
              } catch (e: any) {
                console.log(e?.message || "Failed to fetch topic data.");
              }
            };

  // Fetch data for edit
  useEffect(() => {
            fetchSubjects().then();
            fetchDifficulty().then();

    if (!id) return;
    fetchData();

    

  }, [id]);


  useEffect(() => {
    if (!form?.subject_id) {
      toast?.error("please select a subject first");
      return;
    }
    fetchTopics(form?.subject_id).then();
  }, [form?.subject_id]);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
      };

      const res = await fetch(id ? `/api/mcq/${id}` : "/api/mcq", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data  = await res?.json();
      if (!res.ok) throw new Error(data?.message || "Failed");

      toast.success(
        id ? data.message || "MCQ Updated" : data.message || "MCQ Created",
      );
      setForm(initialData);
    } catch (err : any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  console.log("form : ", form);

  if (initialLoading) {
    return (
      <div>
        <div className="border-t w-10 h-10 border-primary rounded-full animate-spin"/>
      </div>
    )
  }
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{id ? "Edit MCQ" : "Create MCQ"}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <Label>Question</Label>
            <Textarea
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <Label>Options</Label>

            {form.options.map((opt, i) => (
              <Input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
              />
            ))}
          </div>

          {/* Correct Answer */}
          <div className="space-y-2">
            <Label>Correct Answer</Label>

            <Select
              value={form.correct_answer.toString()}
              onValueChange={(v) =>
                setForm({ ...form, correct_answer: Number(v) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select correct option" />
              </SelectTrigger>

              <SelectContent>
                {form.options.map((_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    Option {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Subject */}
            <div className="space-y-2 w-full">
              <Label>Subject</Label>

              <Select
                value={form.subject_id}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    subject_id: value,
                    subject_topic_id: "",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>

                <SelectContent className="w-full">
                  {subjects.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <Label>Topic</Label>

              <Select
                value={form.subject_topic_id}
                onValueChange={(value) =>
                  setForm({ ...form, subject_topic_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>

                <SelectContent className="w-full">
                  {topics.map((t) => (
                    <SelectItem key={t._id} value={t._id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <Label>Difficulty</Label>

              <Select
                value={form.difficulty}
                onValueChange={(value) =>
                  setForm({ ...form, difficulty: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>

                <SelectContent className="w-full">
                  {difficulties.map((d) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <Label>Explanation</Label>
            <Textarea
              value={form.explanation}
              onChange={(e) =>
                setForm({ ...form, explanation: e.target.value })
              }
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags (comma separated)</Label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>

          {/* Marks */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Mark</Label>
              <Input
                type="number"
                value={form.mark}
                onChange={(e) =>
                  setForm({ ...form, mark: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <Label>Negative Mark</Label>
              <Input
                type="number"
                value={form.negative_mark}
                onChange={(e) =>
                  setForm({
                    ...form,
                    negative_mark: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Question Type</Label>

            <Select
              value={form.type}
              onValueChange={(v) => setForm({ ...form, type: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="MCQ">MCQ</SelectItem>
                <SelectItem value="True/False">True/False</SelectItem>
                <SelectItem value="Multi Select">Multi Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Multiple Correct */}
          <div className="flex items-center gap-3">
            <Switch
              checked={form.is_multiple_correct}
              onCheckedChange={(v) =>
                setForm({ ...form, is_multiple_correct: v })
              }
            />
            <Label>Multiple Correct Answers</Label>
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label>Source URL</Label>
            <Input
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            />
          </div>

          {/* Submit */}
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Saving..." : id ? "Update MCQ" : "Create MCQ"}
          </Button>
        </CardContent>
      </Card>
    );
}