"use client";

import { useState } from "react";
import { BoilerplateOptions } from "@/components/BoilerplateOptions";
import { ConfigurationSummary } from "@/components/ConfigurationSummary";
import type { Options } from "@/types";

export default function Home() {
  const [options, setOptions] = useState<Options>({
    typescript: true,
    tailwind: true,
    eslint: true,
    prettier: true,
    husky: true,
    reduxToolkitQuery: false,
    featureSlicedDesign: false,
  });

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Boilerplate Booster
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
          Select your desired technologies and instantly generate a production-ready Next.js project.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 gap-8">
        <div className="lg:col-span-2">
          <BoilerplateOptions options={options} setOptions={setOptions} />
        </div>
        <div className="lg:col-span-1">
          <ConfigurationSummary options={options} />
        </div>
      </div>
    </main>
  );
}
