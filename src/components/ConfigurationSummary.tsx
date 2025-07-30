"use client";

import { useState } from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Option, Options } from "@/types";

const allOptions: Omit<Option, "icon" | "description" | "disabled">[] = [
  { id: "typescript", name: "TypeScript" },
  { id: "tailwind", name: "Tailwind CSS" },
  { id: "eslint", name: "ESLint" },
  { id: "prettier", name: "Prettier" },
  { id: "husky", name: "Husky" },
  { id: "reduxToolkitQuery", name: "RTK Query" },
  { id: "featureSlicedDesign", name: "Feature-Sliced Design" },
];

interface ConfigurationSummaryProps {
  options: Options;
}

export function ConfigurationSummary({ options }: ConfigurationSummaryProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Project Generated!",
        description: "Your boilerplate zip file is ready for download.",
      });
      console.log("Generating project with options:", options);
    }, 2000);
  };

  const selectedOptions = allOptions.filter((opt) => options[opt.id]);

  return (
    <Card className="sticky top-8 shadow-lg">
      <CardHeader>
        <CardTitle>Your Configuration</CardTitle>
        <CardDescription>
          A summary of the tools you've selected.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {selectedOptions.map((option) => (
            <li key={option.id} className="flex items-center text-sm">
              <Check className="h-4 w-4 mr-2 text-primary" />
              <span>{option.name}</span>
            </li>
          ))}
          {selectedOptions.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Select some options to get started.
            </p>
          )}
        </ul>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleGenerate}
          disabled={isGenerating}
          variant="default"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--accent-foreground)',
          }}
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          {isGenerating ? "Generating..." : "Generate & Download"}
        </Button>
      </CardFooter>
    </Card>
  );
}
