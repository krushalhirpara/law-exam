"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronRight,
  Search,
  CheckCircle2,
  Sparkles,
  Award,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Calendar,
  FileText,
  HelpCircle,
  ExternalLink,
  Filter
} from 'lucide-react';

export default function CurriculumExplorerPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState({ '220301': true });
  const [expandedUnits, setExpandedUnits] = useState({ 'su-sem3-220301-u1': true });
  const [expandedTopics, setExpandedTopics] = useState({});

  useEffect(() => {
    fetchCurriculum(selectedSemester);
  }, [selectedSemester]);

  async function fetchCurriculum(semesterNum) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/curriculum?university=SU&course=LLB-3Y&semester=${semesterNum}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to load official curriculum');
      }
      setData(json.hierarchy);
      // Automatically expand first subject and first unit
      if (json.hierarchy?.subjects?.[0]) {
        const firstSubj = json.hierarchy.subjects[0];
        setExpandedSubjects(prev => ({ ...prev, [firstSubj.code]: true }));
        if (firstSubj.units?.[0]) {
          setExpandedUnits(prev => ({ ...prev, [firstSubj.units[0].id]: true }));
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const toggleSubject = (code) => {
    setExpandedSubjects(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const toggleUnit = (unitId) => {
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const filteredSubjects = data?.subjects?.filter(subj => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchesSubject = subj.title.toLowerCase().includes(query) || subj.code.toLowerCase().includes(query);
    const matchesUnit = subj.units.some(u => 
      u.title.toLowerCase().includes(query) || 
      (u.description && u.description.toLowerCase().includes(query)) ||
      u.topics.some(t => 
        t.title.toLowerCase().includes(query) || 
        (t.description && t.description.toLowerCase().includes(query)) ||
        t.subtopics.some(st => st.title.toLowerCase().includes(query) || (st.content && st.content.toLowerCase().includes(query)))
      )
    );
    return matchesSubject || matchesUnit;
  }) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & University Badge */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          <Link href="/" className="hover:text-amber-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/universities/su" className="hover:text-amber-400 transition">Saurashtra University</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-300">LL.B. 3 Years</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400">Semester {selectedSemester} Curriculum</span>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Official Syllabus &bull; Academic Year 2026-27
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                <span>Saurashtra University</span>
                <span className="text-slate-500 font-light text-2xl">/</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">LL.B. Semester 3</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                Official CBCS syllabus and verified academic structure. Browse complete course codes, units, syllabus topics, and granular sub-topics prescribed by the Faculty of Law.
              </p>
            </div>

            {/* University Stats Card */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 backdrop-blur">
              <div className="px-3 border-r border-slate-800 text-center">
                <span className="block text-2xl font-black text-amber-400">5</span>
                <span className="text-xs text-slate-400 font-medium uppercase">Subjects</span>
              </div>
              <div className="px-3 border-r border-slate-800 text-center">
                <span className="block text-2xl font-black text-cyan-400">20</span>
                <span className="text-xs text-slate-400 font-medium uppercase">Units</span>
              </div>
              <div className="px-3 border-r border-slate-800 text-center">
                <span className="block text-2xl font-black text-emerald-400">25</span>
                <span className="text-xs text-slate-400 font-medium uppercase">Credits</span>
              </div>
              <div className="px-3 text-center">
                <span className="block text-2xl font-black text-purple-400">500</span>
                <span className="text-xs text-slate-400 font-medium uppercase">Marks</span>
              </div>
            </div>
          </div>

          {/* Semester Selector Bar */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Select Semester:</span>
              <div className="flex items-center gap-1.5 ml-2">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => setSelectedSemester(num)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedSemester === num
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                    }`}
                  >
                    Sem {num} {num === 3 && '★'}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Choice Based Credit System (CBCS) Pattern</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search subject code, unit, topic, or statute..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => {
                if (data?.subjects) {
                  const allSubjs = {};
                  const allUnits = {};
                  data.subjects.forEach(s => {
                    allSubjs[s.code] = true;
                    s.units.forEach(u => { allUnits[u.id] = true; });
                  });
                  setExpandedSubjects(allSubjs);
                  setExpandedUnits(allUnits);
                }
              }}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded bg-slate-800/80 hover:bg-slate-800 transition"
            >
              Expand All
            </button>
            <button
              onClick={() => {
                setExpandedSubjects({});
                setExpandedUnits({});
                setExpandedTopics({});
              }}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded bg-slate-800/80 hover:bg-slate-800 transition"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Main Hierarchy Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="p-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-sm font-medium">Loading verified Saurashtra University academic structure...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-red-950/20 border border-red-800/40 rounded-2xl text-red-300">
            <p className="text-base font-semibold mb-2">Failed to load curriculum</p>
            <p className="text-sm opacity-80">{error}</p>
            <button
              onClick={() => fetchCurriculum(selectedSemester)}
              className="mt-4 px-4 py-2 bg-red-800/40 hover:bg-red-800/60 rounded-lg text-xs font-semibold text-white transition"
            >
              Retry
            </button>
          </div>
        ) : filteredSubjects.length === 0 ? (
          <div className="p-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="text-base font-semibold text-slate-300 mb-1">No subjects match your search</p>
            <p className="text-sm text-slate-500">Try searching for a different keyword or reset the search filter.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSubjects.map((subj, sIdx) => {
              const isSubjExpanded = !!expandedSubjects[subj.code];
              return (
                <div
                  key={subj.id}
                  className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all"
                >
                  {/* Subject Header Card */}
                  <div
                    onClick={() => toggleSubject(subj.code)}
                    className="p-5 sm:p-6 cursor-pointer hover:bg-slate-850/60 transition flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-base shadow-md shrink-0">
                        {subj.code}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                            Paper {sIdx + 1} &bull; Code: {subj.code}
                          </span>
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {subj.category}
                          </span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            {subj.credits} Credits &bull; {subj.marks} Marks
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {subj.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2 max-w-3xl">
                          {subj.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs text-slate-400 block font-medium">{subj.unitsCount} Units</span>
                        <span className="text-xs text-slate-500 block">{subj.topicsCount} Topics &bull; {subj.subtopicsCount} Sub-topics</span>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
                        {isSubjExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Units Container */}
                  {isSubjExpanded && (
                    <div className="border-t border-slate-800/80 bg-slate-950/40 p-4 sm:p-6 space-y-4">
                      {subj.units.map((unit) => {
                        const isUnitExpanded = !!expandedUnits[unit.id];
                        return (
                          <div
                            key={unit.id}
                            className="bg-slate-900/90 rounded-xl border border-slate-800/90 overflow-hidden"
                          >
                            {/* Unit Row Header */}
                            <div
                              onClick={() => toggleUnit(unit.id)}
                              className="p-4 cursor-pointer hover:bg-slate-850/50 transition flex items-center justify-between gap-4 select-none"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                                  U{unit.unitNumber}
                                </span>
                                <div>
                                  <h3 className="text-sm sm:text-base font-bold text-slate-100">
                                    Unit {unit.unitNumber}: {unit.title}
                                  </h3>
                                  {unit.description && (
                                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                                      {unit.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-xs text-slate-400 hidden sm:inline">
                                  {unit.topics.length} Topics
                                </span>
                                <div className="w-6 h-6 rounded bg-slate-800/60 flex items-center justify-center text-slate-400">
                                  {isUnitExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </div>
                              </div>
                            </div>

                            {/* Topics & Subtopics Grid */}
                            {isUnitExpanded && (
                              <div className="border-t border-slate-800/60 bg-slate-950/60 p-4 divide-y divide-slate-800/50">
                                {unit.topics.map((topic) => {
                                  const isTopicExpanded = !!expandedTopics[topic.id];
                                  return (
                                    <div key={topic.id} className="py-3.5 first:pt-1 last:pb-1">
                                      <div
                                        onClick={() => toggleTopic(topic.id)}
                                        className="cursor-pointer group flex items-start justify-between gap-3"
                                      >
                                        <div className="flex items-start gap-2.5">
                                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-semibold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                            {topic.topicNumber}
                                          </span>
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition">
                                                {topic.title}
                                              </h4>
                                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-medium">
                                                {topic.status}
                                              </span>
                                            </div>
                                            {topic.description && (
                                              <p className="text-xs text-slate-400 mt-0.5">
                                                {topic.description}
                                              </p>
                                            )}
                                          </div>
                                        </div>

                                        {topic.subtopics && topic.subtopics.length > 0 && (
                                          <div className="flex items-center gap-1.5 shrink-0 text-slate-400 group-hover:text-slate-300">
                                            <span className="text-[11px]">{topic.subtopics.length} Sub-topics</span>
                                            {isTopicExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                          </div>
                                        )}
                                      </div>

                                      {/* Sub-topics details */}
                                      {isTopicExpanded && topic.subtopics && topic.subtopics.length > 0 && (
                                        <div className="mt-3 ml-7 pl-3 border-l-2 border-amber-500/30 space-y-2">
                                          {topic.subtopics.map((st) => (
                                            <div key={st.id} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                                              <div className="flex items-center gap-2">
                                                <span className="w-4 h-4 rounded bg-slate-800 text-[10px] text-amber-400 font-bold flex items-center justify-center">
                                                  {st.orderIndex}
                                                </span>
                                                <span className="text-xs font-medium text-slate-200">{st.title}</span>
                                              </div>
                                              {st.content && (
                                                <p className="text-[11px] text-slate-400 mt-1 pl-6 leading-relaxed">
                                                  {st.content}
                                                </p>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation Links */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Source: Saurashtra University Faculty of Law CBCS Syllabus</span>
          <span>&bull;</span>
          <a
            href="https://saurashtrauniversity.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline flex items-center gap-1"
          >
            Official University Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/subjects" className="hover:text-white transition">
            Browse All Subjects
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Student Dashboard
          </Link>
          <Link href="/admin" className="hover:text-white transition">
            Admin Console
          </Link>
        </div>
      </div>
    </div>
  );
}
