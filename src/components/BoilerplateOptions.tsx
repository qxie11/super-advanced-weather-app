"use client";

import type { Dispatch, SetStateAction } from "react";
import { Dog, Folders, Loader2 } from "lucide-react";
import {
  EslintIcon,
  PrettierIcon,
  ReduxIcon,
  TailwindCssIcon,
  TypeScriptIcon,
} from "@/components/tech-icons";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { Option, Options } from "@/types";

const techOptions: Option[] = [
  {
    id: "typescript",
    name: "TypeScript",
    description: "Strongly typed programming language that builds on JavaScript.",
    icon: <TypeScriptIcon className="size-8" />,
    disabled: true,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development.",
    icon: <TailwindCssIcon className="size-8" />,
  },
  {
    id: "eslint",
    name: "ESLint",
    description: "Statically analyzes your code to quickly find problems.",
    icon: <EslintIcon className="size-8" />,
  },
  {
    id: "prettier",
    name: "Prettier",
    description: "An opinionated code formatter for consistent code style.",
    icon: <PrettierIcon className="size-8" />,
  },
  {
    id: "husky",
    name: "Husky",
    description: "Improve your commits with Git hooks for quality assurance.",
    icon: <Dog className="size-8 text-muted-foreground" />,
  },
  {
    id: "reduxToolkitQuery",
    name: "RTK Query",
    description: "Powerful data fetching and caching tool for Redux.",
    icon: <ReduxIcon className="size-8" />,
  },
  {
    id: "featureSlicedDesign",
    name: "Feature-Sliced",
    description: "Architectural methodology for scaling frontend projects.",
    icon: <Folders className="size-8 text-muted-foreground" />,
  },
];

interface BoilerplateOptionsProps {
  options: Options;
  setOptions: Dispatch<SetStateAction<Options>>;
}

export function BoilerplateOptions({
  options,
  setOptions,
}: BoilerplateOptionsProps) {
  const handleOptionChange = (id: keyof Options, value: boolean) => {
    setOptions((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {techOptions.map((option) => (
        <Card
          key={option.id}
          className={cn(
            "flex flex-col justify-between transition-all duration-300",
            options[option.id] && "border-primary ring-1 ring-primary",
            option.disabled
              ? "cursor-not-allowed bg-muted/50"
              : "cursor-pointer hover:shadow-md"
          )}
          onClick={() =>
            !option.disabled &&
            handleOptionChange(option.id, !options[option.id])
          }
        >
          <CardHeader className="flex-row gap-4 items-start pb-4">
            <div className="w-8 h-8 flex-shrink-0">{option.icon}</div>
            <div className="flex-grow">
              <CardTitle className="text-lg">{option.name}</CardTitle>
              <CardDescription className="mt-1">
                {option.description}
              </CardDescription>
            </div>
            <Switch
              checked={options[option.id]}
              onCheckedChange={(checked) =>
                handleOptionChange(option.id, checked)
              }
              disabled={option.disabled}
              aria-label={`Toggle ${option.name}`}
              className="mt-1"
              onClick={(e) => e.stopPropagation()}
            />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
