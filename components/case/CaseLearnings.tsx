"use client";

import { CheckCircle } from "lucide-react";

interface CaseLearningsProps {
  learnings: string[];
  title: string;
}

export function CaseLearnings({ learnings, title }: CaseLearningsProps) {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
          {title}
        </p>

        <div className="space-y-4 md:max-w-3xl">
          {learnings.map((learning, index) => (
            <div
              key={index}
              className="flex gap-4"
            >
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" />
              <p className="text-base text-foreground/90 leading-relaxed md:text-lg">
                {learning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
