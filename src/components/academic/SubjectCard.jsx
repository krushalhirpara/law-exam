"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, Layers, CheckCircle2, ArrowRight, Award } from 'lucide-react';

export default function SubjectCard({ subject }) {
  if (!subject) return null;

  const {
    id,
    code,
    title,
    marks = 100,
    unitsCount = 4,
    topicsCount = 0,
    completedCount = 0,
    completionPercentage = 0,
    category = 'Core Law',
    credits = 5
  } = subject;

  return (
    <div className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              {code}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {category}
            </span>
          </div>

          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {marks} Marks &bull; {credits} Credits
          </span>
        </div>

        {/* Subject Name */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition tracking-tight mb-3">
          <Link href={`/academic/subject/${id}`}>
            {title}
          </Link>
        </h3>

        {/* Units & Topics Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-4 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span><strong className="text-slate-200 font-semibold">{unitsCount}</strong> Units</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span><strong className="text-slate-200 font-semibold">{topicsCount}</strong> Topics</span>
          </div>
        </div>
      </div>

      <div>
        {/* Student Progress Bar */}
        <div className="pt-3 border-t border-slate-800/80 mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Student Progress
            </span>
            <span className="font-bold text-slate-200">
              {completionPercentage}% <span className="text-slate-500 font-normal">({completedCount}/{topicsCount})</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, completionPercentage))}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/academic/subject/${id}`}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 font-semibold text-xs text-slate-200 flex items-center justify-center gap-2 transition duration-200 group-hover:bg-amber-500 group-hover:text-slate-950"
        >
          <span>{completionPercentage > 0 ? 'Continue Subject' : 'Start Subject'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
