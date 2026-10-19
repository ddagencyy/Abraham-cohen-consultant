'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  PieChart,
  Users,
  BarChart3,
  Briefcase,
  Building2,
  PhoneCall,
  FileText,
  Menu,
  X,
  Mail,
  Linkedin,
  Search,
  Check,
  Percent,
  Calculator,
  Compass,
  Clock,
  ChevronRight,
  Quote
} from 'lucide-react';

/* ==========================================================================
   TECHNICAL NOTE:
   Define BOOKING_LINK in one central place, used for every booking button.
   ========================================================================== */
const BOOKING_LINK = 'https://calendly.com/your-link';
const LINKEDIN_URL = 'https://www.linkedin.com/in/coachabrahamcohen/';
const GMAIL_ADDRESS = 'Accoaching123@gmail.com';

/* ==========================================================================
   CASE STUDIES DATA (5 Clients with Timeframes & Detailed Deep Dives)
   All numbers and text kept in this single object for easy editing.
   ========================================================================== */
interface CaseStudy {
  id: string;
  slug: string;
  niche: string;
  title: string;
  cardHeadline: string;
  startingRevenue: string;
  currentRevenue: string;
  timeframe: string;
  timeframeBadge: string;
  isCurrent?: boolean;
  challenge: string;
  whatWeFound: string;
  whatIDid: string[];
  resultsNote?: string;
  focusAreas?: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  } | null;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'residential-roofing',
    slug: 'residential-roofing',
    niche: 'Residential Roofing Company',
    title: 'Residential Roofing: Scaling from $500K to $2M Profitably',
    cardHeadline: '$500K → $2M in 18 months',
    startingRevenue: '$500K',
    currentRevenue: '$2M',
    timeframe: '18 months',
    timeframeBadge: '18 Months',
    challenge:
      'The company experienced fast top-line growth, but net profit lagged far behind revenue and cash flow felt constantly tight. Despite selling more roofs each month, bank reserves were not accumulating.',
    whatWeFound:
      'Rapid scaling without job costing meant unseen overhead burden and crew labor variances were quietly eating away margins before cash ever hit the bank.',
    whatIDid: [
      'Mapped true cost per job and tracked actual net margin after overhead burden.',
      'Corrected project pricing models to protect margin on every roofing square.',
      'Instituted strict overhead tracking and material waste controls.',
      'Built a rolling 13-week cash flow plan to eliminate payroll pinches.'
    ],
    resultsNote: '$500K → $2M in 18 months',
    testimonial: null // Can paste quote, author, role here later
  },
  {
    id: 'construction',
    slug: 'construction',
    niche: 'Construction Company',
    title: 'Construction Company: Stabilizing Bidding & Revenue Growth',
    cardHeadline: '$50K → $250K in 12 months',
    startingRevenue: '$50K',
    currentRevenue: '$250K',
    timeframe: '12 months',
    timeframeBadge: '12 Months',
    challenge:
      'The owner struggled with inconsistent monthly income and had zero visibility into real job profitability. He spent long days on active job sites without knowing which contracts were making money.',
    whatWeFound:
      'Bids were prepared using rough rules-of-thumb rather than true hourly burden and change-order costs, creating major profit leaks on large builds.',
    whatIDid: [
      'Implemented standardized unit job costing across all active projects.',
      'Rebuilt the bidding and pricing strategy based on verified overhead rates.',
      'Established a straightforward, reliable weekly cash tracking system.',
      'Filtered out loss-leader job categories to focus crews on high-profit work.'
    ],
    resultsNote: '$50K → $250K in 12 months',
    testimonial: null
  },
  {
    id: 'roofing-2',
    slug: 'roofing-2',
    niche: 'Roofing Company (Second Client)',
    title: 'Roofing Company: Restructuring Pay to Protect $900K Growth',
    cardHeadline: '$130K → $900K in 14 months',
    startingRevenue: '$130K',
    currentRevenue: '$900K',
    timeframe: '14 months',
    timeframeBadge: '14 Months',
    challenge:
      'Strong incoming customer demand and rapid lead flow were overshadowed by volatile job margins and constantly creeping expenses that wiped out month-end profits.',
    whatWeFound:
      'Sales commissions and crew bonuses were calculated strictly on paper gross revenue, leaving the business owner with all overhead overrun and material escalation risks.',
    whatIDid: [
      'Audited operations and identified critical profit leaks in crew pay and material waste.',
      'Restructured salesperson pay and crew incentives around collected net margin.',
      'Realigned job pricing to factor in material escalation and direct costs.',
      'Deployed clear executive financial reporting for simple weekly visibility.'
    ],
    resultsNote: '$130K → $900K in 14 months',
    testimonial: null
  },
  {
    id: 'landscaping',
    slug: 'landscaping',
    niche: 'Landscaping Company',
    title: 'Landscaping Company: Eliminating Underpricing to Hit $170K',
    cardHeadline: '$30K → $170K in 10 months',
    startingRevenue: '$30K',
    currentRevenue: '$170K',
    timeframe: '10 months',
    timeframeBadge: '10 Months',
    challenge:
      'Underpricing and untracked operating costs were choking business cash flow despite long hours, intense physical labor, and strong client demand.',
    whatWeFound:
      'Commercial maintenance contracts were priced without factoring in equipment depreciation, travel time, crew overtime, and rising disposal fees.',
    whatIDid: [
      'Rebuilt the entire pricing model to reflect real hourly crew burden and equipment costs.',
      'Instituted per-job expense and material tracking protocols.',
      'Renegotiated or phased out underpriced legacy maintenance accounts.',
      'Implemented structured cash flow forecasting to manage seasonal shifts.'
    ],
    resultsNote: '$30K → $170K in 10 months',
    testimonial: null
  },
  {
    id: 'it-company',
    slug: 'it-company',
    niche: 'IT Company',
    title: 'IT Company: Laying the Financial Foundation for Scale',
    cardHeadline: 'Started this month, in progress',
    startingRevenue: 'Onboarding',
    currentRevenue: 'In Progress',
    timeframe: 'Started this month',
    timeframeBadge: 'Started This Month',
    isCurrent: true,
    challenge:
      'The company has a growing technology client base and technical team, but lacked systematic financial visibility and structured pricing models needed to expand sustainably.',
    whatWeFound:
      'Service agreements and technical project scopes were sold without clear gross-to-net margin allocations, and fixed operating overhead had not been systematically modeled.',
    whatIDid: [
      'Initiating financial visibility audit across recurring and project billing.',
      'Restructuring service pricing tiers to safeguard target net profitability.',
      'Developing a customized rolling cash flow and working capital forecast.',
      'Formulating a disciplined growth plan for sustainable technical team hiring.'
    ],
    focusAreas: [
      'Financial Visibility & Reporting',
      'Scope-Based Pricing Strategy',
      'Sustainable Growth & Cash Flow Plan'
    ],
    testimonial: null
  }
];

/* FAQ Questions */
const FAQ_ITEMS = [
  {
    q: 'Who is this for?',
    a: 'This consulting is specifically engineered for owners of roofing, construction, landscaping, and home-service businesses who want their bank balance and take-home profits to finally match their high sales volume.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'We pinpoint primary profit leaks and cash flow leaks within the first 14 days. The complete pricing overhaul, commission alignment, and weekly tracking systems are fully operational within 60 to 90 days.',
  },
  {
    q: 'Do I need new accounting software?',
    a: 'No special software is needed. Whether you use QuickBooks, JobNimbus, AccuLynx, ServiceTitan, or Jobber, we work directly with your existing software and bookkeeping setup. We fix the strategy, numbers, and accountability—not sell software.',
  },
  {
    q: 'What does it cost?',
    a: 'Engagements are structured as flat, transparent project fees or predictable monthly retainers based on your revenue tier. Every engagement is designed to deliver a multiple ROI in recovered net profit and cash flow stability.',
  },
  {
    q: 'Is the first call free?',
    a: 'Yes, 100% free and strictly confidential. It is a focused 30-minute discovery conversation to review your numbers, diagnose your primary cash bottleneck, and determine if our framework is the right fit for your operation.',
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCaseSlug, setActiveCaseSlug] = useState<string | null>(null);

  // Quick Profit Leak Calculator State
  const [annualRevenue, setAnnualRevenue] = useState(2500000);
  const [currentNetMargin, setCurrentNetMargin] = useState(6);
  const targetNetMargin = 16;
  const currentNetProfit = Math.round(annualRevenue * (currentNetMargin / 100));
  const targetNetProfit = Math.round(annualRevenue * (targetNetMargin / 100));
  const profitLeak = Math.max(0, targetNetProfit - currentNetProfit);

  // Hash-based routing listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/case/')) {
        const slug = hash.replace('#/case/', '').trim();
        setActiveCaseSlug(slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveCaseSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Find active case study if on detail page
  const currentCase = activeCaseSlug
    ? CASE_STUDIES.find((c) => c.slug === activeCaseSlug) || null
    : null;

  const currentCaseIndex = currentCase
    ? CASE_STUDIES.findIndex((c) => c.slug === currentCase.slug)
    : -1;

  const prevCase =
    currentCaseIndex > 0 ? CASE_STUDIES[currentCaseIndex - 1] : null;
  const nextCase =
    currentCaseIndex >= 0 && currentCaseIndex < CASE_STUDIES.length - 1
      ? CASE_STUDIES[currentCaseIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#C5A059]/25 selection:text-[#0B1F3A]">
      
      {/* ====================================================================
          TOP BAR (Gmail Only - Clean & Authoritative)
          ==================================================================== */}
      <div className="bg-[#071527] text-slate-300 text-xs py-2.5 px-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-200">Abraham Cohen Consulting</span>
            <span className="text-slate-500 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline text-slate-400">Roofing & Home-Service Financial Advisory</span>
          </div>

          <div>
            <a
              href={`mailto:${GMAIL_ADDRESS}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 hover:text-[#C5A059] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{GMAIL_ADDRESS}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ====================================================================
          STICKY TOP NAVIGATION
          ==================================================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#/"
            className="flex flex-col group cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B1F3A] group-hover:text-[#15325B] transition-colors">
              Abraham Cohen
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Profit & Growth Consulting
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a
              href="#how-i-help"
              className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors"
            >
              How I Help
            </a>
            <a
              href="#how-i-scale"
              className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors"
            >
              How I Scale You
            </a>
            <a
              href="#process"
              className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors"
            >
              Process
            </a>
            <a
              href="#case-studies"
              className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors"
            >
              Case Studies
            </a>
            <a
              href="#why-me"
              className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors"
            >
              Why Me
            </a>
            <a
              href="#faq"
              className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b59048] text-[#0B1F3A] font-extrabold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4 text-[#0B1F3A]" />
              <span className="hidden sm:inline">Book a Free Call</span>
              <span className="sm:hidden">Book Call</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#0B1F3A] rounded-md focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top duration-200">
            <a
              href="#how-i-help"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-[#C5A059] py-1"
            >
              How I Help
            </a>
            <a
              href="#how-i-scale"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-[#C5A059] py-1"
            >
              How I Scale You
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-[#C5A059] py-1"
            >
              Process
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-[#C5A059] py-1"
            >
              Case Studies
            </a>
            <a
              href="#why-me"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-[#C5A059] py-1"
            >
              Why Work With Me
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-[#C5A059] py-1"
            >
              FAQ
            </a>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#C5A059] hover:bg-[#b59048] text-[#0B1F3A] font-bold text-sm py-3 rounded-lg mt-2 shadow-sm"
            >
              Book a Free Strategy Call &rarr;
            </a>
          </div>
        )}
      </header>

      {/* ====================================================================
          PAGE ROUTING:
          If activeCaseSlug is set, show SEPARATE CASE STUDY DETAIL PAGE.
          Otherwise, show FULL MAIN SALES LANDING PAGE.
          ==================================================================== */}
      {currentCase ? (
        /* ==================================================================
           SEPARATE DETAIL PAGE FOR CASE STUDY
           ================================================================== */
        <div className="animate-in fade-in duration-300">
          {/* Top Banner (Navy) */}
          <div className="bg-[#0B1F3A] text-white pt-14 pb-16 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C5A059] hover:text-[#e0bb6b] transition-colors mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>&larr; Back to all case studies</span>
              </a>

              <div className="inline-block bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
                {currentCase.niche}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                {currentCase.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl">
                A surgical breakdown of financial restructuring, job costing, and profit margin discipline.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
            {/* Snapshot Bar (4 small stat boxes) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 -mt-20 mb-12 relative z-20">
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Client Type
                </span>
                <span className="text-sm font-extrabold text-[#0B1F3A] block truncate">
                  {currentCase.niche}
                </span>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Starting Revenue
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[#0B1F3A] block">
                  {currentCase.startingRevenue}
                </span>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Current Revenue
                </span>
                <span className="text-base sm:text-lg font-extrabold text-emerald-600 block">
                  {currentCase.currentRevenue}
                </span>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Timeframe
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[#C5A059] block">
                  {currentCase.timeframe}
                </span>
              </div>
            </div>

            {/* The Challenge */}
            <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>The Challenge</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">
                What Was Holding the Business Back
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                {currentCase.challenge}
              </p>
            </section>

            {/* What We Found */}
            <section className="mb-12 bg-[#F3F6FA] rounded-2xl p-8 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider mb-3">
                <Search className="w-4 h-4 text-[#C5A059]" />
                <span>What We Found</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">
                The Hidden Cause Behind the Problem
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                {currentCase.whatWeFound}
              </p>
            </section>

            {/* What I Did (Numbered 4 Steps) */}
            <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-wider mb-3">
                <Check className="w-4 h-4" />
                <span>Strategic Implementation</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
                What I Did (Step-by-Step Action Plan)
              </h2>
              <div className="space-y-4">
                {currentCase.whatIDid.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0B1F3A] text-[#C5A059] font-extrabold text-sm flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="text-slate-800 text-base font-medium pt-0.5">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* The Results (Or IT in-progress view) */}
            {currentCase.isCurrent ? (
              <section className="mb-12 bg-amber-50/60 rounded-2xl p-8 border border-amber-200 shadow-xs">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Currently Working Together</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-3">
                  Engagement in Progress
                </h2>
                <p className="text-slate-700 mb-6">
                  We are actively building the financial visibility foundation for this client. Results coming soon.
                </p>

                <div className="bg-white rounded-xl p-5 border border-amber-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Active Focus Areas:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentCase.focusAreas?.map((area, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-semibold text-[#0B1F3A]">
                        <Check className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <section className="mb-12 bg-[#0B1F3A] text-white rounded-2xl p-8 sm:p-10 shadow-lg text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-2">
                  Verified Outcome
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                  The Results
                </h2>
                <div className="inline-block bg-white/10 px-8 py-5 rounded-2xl border border-white/15 my-3">
                  <div className="text-3xl sm:text-5xl font-black text-[#C5A059] tracking-tight">
                    {currentCase.resultsNote}
                  </div>
                </div>
                <p className="text-slate-300 text-sm mt-3">
                  Before &rarr; After revenue and timeframe documented under direct financial consulting.
                </p>
              </section>
            )}

            {/* Client Testimonial (Optional box, hidden if empty) */}
            {currentCase.testimonial && currentCase.testimonial.quote && (
              <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-xs relative">
                <Quote className="w-10 h-10 text-[#C5A059]/20 absolute top-6 right-6" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Client Feedback
                </h3>
                <p className="text-lg italic text-slate-800 mb-4 leading-relaxed">
                  &ldquo;{currentCase.testimonial.quote}&rdquo;
                </p>
                <div className="font-bold text-[#0B1F3A] text-sm">
                  {currentCase.testimonial.author}
                </div>
                <div className="text-xs text-slate-500">
                  {currentCase.testimonial.role}
                </div>
              </section>
            )}

            {/* Call To Action Box */}
            <div className="bg-[#F3F6FA] rounded-2xl p-8 sm:p-10 border border-slate-200 text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] mb-3">
                Want results like this?
              </h2>
              <p className="text-slate-600 max-w-lg mx-auto mb-6">
                Let&apos;s evaluate your current job costing, find your leaks, and map a clear plan to scale your profit.
              </p>
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b59048] text-[#0B1F3A] font-extrabold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span>Book a Free Strategy Call</span>
                <ArrowRight className="w-5 h-5 text-[#0B1F3A]" />
              </a>
            </div>

            {/* Next / Previous Case Study Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              {prevCase ? (
                <a
                  href={`#/case/${prevCase.slug}`}
                  className="w-full sm:w-auto inline-flex items-center gap-2 text-sm font-bold text-[#0B1F3A] hover:text-[#C5A059] transition-colors p-3 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: {prevCase.niche}</span>
                </a>
              ) : (
                <div />
              )}

              {nextCase ? (
                <a
                  href={`#/case/${nextCase.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-end gap-2 text-sm font-bold text-[#0B1F3A] hover:text-[#C5A059] transition-colors p-3 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <span>Next: {nextCase.niche}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ==================================================================
           FULL SALES LANDING PAGE (Client sees & finds every answer)
           ================================================================== */
        <main>
          {/* ================================================================
              1. HERO SECTION (High-converting sales headline & alignment)
              ================================================================ */}
          <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-white via-slate-50/60 to-[#F3F6FA]">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#C5A059]/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#0B1F3A]/5 blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 bg-[#C5A059]/15 border border-[#C5A059]/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-[#0B1F3A] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                <span>Financial Strategy for Roofing & Home-Service Owners ($500K - $15M)</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1F3A] tracking-tight leading-[1.12] mb-6">
                Your Revenue Is Growing. <br className="hidden sm:inline" />
                <span className="text-[#C5A059]">Is Your Profit?</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
                I help roofing and home-service owners find hidden profit leaks, fix cash flow, and scale without becoming a cash-eating monster.
              </p>

              {/* Two Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C5A059] hover:bg-[#b59048] text-[#0B1F3A] font-extrabold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>Book a Free Strategy Call</span>
                  <ArrowRight className="w-5 h-5 text-[#0B1F3A]" />
                </a>

                <a
                  href="#case-studies"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0B1F3A] border border-slate-300 font-bold text-base px-8 py-4 rounded-xl shadow-xs hover:border-slate-400 transition-all"
                >
                  <span>See Case Studies</span>
                </a>
              </div>

              {/* Trust Strip Underneath */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Track Record</div>
                    <div className="text-sm sm:text-base font-extrabold text-[#0B1F3A]">
                      Helped scale a roofing company from $500K to $2M
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-slate-200" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Core Focus</div>
                    <div className="text-sm sm:text-base font-extrabold text-[#0B1F3A]">
                      Cash Flow &bull; Pricing &bull; Net Margin
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              2. THE PROBLEM ("Sound familiar?")
              ================================================================ */}
          <section className="py-20 md:py-28 bg-[#F3F6FA] border-y border-slate-200/60" id="problem">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full mb-3">
                  The Problem
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-4">
                  Sound familiar?
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Most contractors work 70-hour weeks believing that more sales volume will solve their cash crunches. But if your foundation is leaking, more revenue just speeds up the leak.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all border-l-4 border-l-rose-500">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-2.5">
                    Top-of-market pricing, but net profit isn&apos;t growing
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    You charge premium rates and your crews are booked weeks in advance, yet your retained earnings at month-end barely budge.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all border-l-4 border-l-rose-500">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-2.5">
                    You know gross margin per job, but not true net margin after overhead
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Your software says a job made 35% gross. But after factoring in shop overhead, vehicles, insurance, rework, and unbillable crew time, you might have broken even.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all border-l-4 border-l-rose-500">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-2.5">
                    Commissions and crew pay based on gross margin, so costs quietly climb
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Sales reps and estimators collect high commissions on projected paper profits, while you as the owner absorb material increases and job delays.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all border-l-4 border-l-rose-500">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-2.5">
                    Expenses keep rising and cash feels tight even in busy months
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Record volume during peak season, yet vendor bills, tax installments, and bi-weekly payroll create constant stress.
                  </p>
                </div>
              </div>

              {/* Quick Profit Leak Tool */}
              <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                      <Calculator className="w-4 h-4" />
                      <span>Instant Benchmark Calculator</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A]">
                      Estimate Your Annual &ldquo;Hidden Profit Leak&rdquo;
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      See what bringing your net margin up to the benchmark 16% delivers to your personal equity.
                    </p>
                  </div>

                  <div className="bg-[#F3F6FA] px-4 py-2.5 rounded-xl text-right shrink-0">
                    <span className="text-xs font-semibold text-slate-500 block">Recoverable Cash / Year</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                      +${profitLeak.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Annual Company Revenue:
                      </label>
                      <span className="text-sm font-extrabold text-[#0B1F3A]">
                        ${annualRevenue.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="500000"
                      max="10000000"
                      step="100000"
                      value={annualRevenue}
                      onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                      className="w-full accent-[#C5A059] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>$500K</span>
                      <span>$5M</span>
                      <span>$10M+</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Current Estimated Net Margin:
                      </label>
                      <span className="text-sm font-extrabold text-[#0B1F3A]">
                        {currentNetMargin}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="14"
                      step="1"
                      value={currentNetMargin}
                      onChange={(e) => setCurrentNetMargin(Number(e.target.value))}
                      className="w-full accent-[#C5A059] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>2% (Dangerous)</span>
                      <span>8% (Industry Avg)</span>
                      <span>14% (Solid)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              3. HOW I HELP (6 Service Cards with Icons)
              ================================================================ */}
          <section className="py-20 md:py-28 bg-white" id="how-i-help">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full mb-3">
                  Core Capabilities
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-4">
                  How I Help Your Business Profit
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Practical financial engineering built specifically for roofing and residential contractor operations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-lg hover:border-[#C5A059]/60 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-6">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                      Profit Leak Audit
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Comprehensive diagnostic of your P&L, balance sheet, and job reports to pinpoint exactly where dollars disappear between invoicing and cash in the bank.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                    Full 360&deg; Diagnostic
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-lg hover:border-[#C5A059]/60 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-6">
                      <PieChart className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                      Job Costing & Net Margin Tracking
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Track the true cost per job after commissions, direct labor, unbilled crew overtime, insurance burden, equipment wear, and overhead allocation.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                    True Net Per Job
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-lg hover:border-[#C5A059]/60 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-6">
                      <Percent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                      Pricing Strategy
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Replace gut-feel markup with margin-driven pricing models. Price every square and change order to protect your bottom line against material spikes.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                    Margin-First Pricing
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-lg hover:border-[#C5A059]/60 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-6">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                      Cash Flow Forecasting & Management
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Implement a reliable 13-week rolling cash flow model so you always know your exact liquidity weeks in advance—never get caught short on payroll.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                    13-Week Cash Radar
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-lg hover:border-[#C5A059]/60 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-6">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                      Pay Structure & Commission Redesign
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Align sales and crew incentives to actual net margins without disrupting what already works or demotivating top producers.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                    Net-Tied Incentives
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-lg hover:border-[#C5A059]/60 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-6">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">
                      Financial Dashboards & Clear Reporting
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Replace 40-page accounting reports with a 1-page executive scorecard showing your 4 vital numbers every Monday morning.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                    Weekly CEO Dashboard
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              4. HOW I SCALE YOUR BUSINESS (4-Stage Framework)
              ================================================================ */}
          <section className="py-20 md:py-28 bg-[#F3F6FA] border-y border-slate-200/60" id="how-i-scale">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full mb-3">
                  Growth Framework
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-4">
                  How I Scale Your Business
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  A visual 4-stage growth framework that ensures every dollar of new revenue delivers predictable net income.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-300" />
                  <div>
                    <div className="text-xs font-extrabold text-[#C5A059] uppercase tracking-widest mb-1">
                      Stage 01
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0B1F3A] mb-4 flex items-center justify-between">
                      <span>Visibility</span>
                      <Compass className="w-5 h-5 text-slate-400" />
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>True job costing mapped across materials, labor, and overhead</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Hidden profit leaks exposed and categorized by severity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Baseline metrics established on actual cash collected</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5A059]" />
                  <div>
                    <div className="text-xs font-extrabold text-[#C5A059] uppercase tracking-widest mb-1">
                      Stage 02
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0B1F3A] mb-4 flex items-center justify-between">
                      <span>Profitability</span>
                      <DollarSign className="w-5 h-5 text-[#C5A059]" />
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Pricing adjusted to secure target net margins on every job</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Sales commissions realigned to net profit, not gross revenue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Unprofitable service lines and customer profiles eliminated</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
                  <div>
                    <div className="text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-1">
                      Stage 03
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0B1F3A] mb-4 flex items-center justify-between">
                      <span>Stability</span>
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>13-week rolling cash flow forecast protects against crunches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Working capital reserves built for seasonal down periods</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Accounts receivable collection cycle cut in half</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600" />
                  <div>
                    <div className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest mb-1">
                      Stage 04
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0B1F3A] mb-4 flex items-center justify-between">
                      <span>Scale</span>
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Reinvest retained earnings safely into sales and crews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Executive dashboards keep leadership in total control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Predictable, bankable profits ready for regional expansion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-[#0B1F3A] text-white py-6 px-8 rounded-2xl text-center max-w-2xl mx-auto shadow-md">
                <p className="text-lg sm:text-xl font-bold tracking-tight">
                  &ldquo;Growth without profit is just a{' '}
                  <span className="text-[#C5A059] underline decoration-[#C5A059]/40 underline-offset-4">
                    bigger problem
                  </span>
                  .&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ================================================================
              5. MY PROCESS (Timeline)
              ================================================================ */}
          <section className="py-20 md:py-28 bg-white" id="process">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full mb-3">
                  Step-by-Step Timeline
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-4">
                  My Consulting Process
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  A disciplined, non-disruptive implementation path designed to produce cash flow improvements within the first 30 days.
                </p>
              </div>

              <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-200 space-y-10 ml-4 sm:ml-8">
                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-10 h-10 rounded-full bg-white border-4 border-[#0B1F3A] text-[#0B1F3A] font-extrabold text-sm flex items-center justify-center group-hover:bg-[#0B1F3A] group-hover:text-[#C5A059] group-hover:border-[#C5A059] transition-all shadow-xs">
                    1
                  </div>
                  <div className="bg-[#F3F6FA] p-6 rounded-2xl border border-slate-200/80 group-hover:border-slate-300 transition-all">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      Step 1: Free Strategy Call
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      We discuss your numbers, current revenue goals, and immediate cash flow pain points to verify mutual fit.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-10 h-10 rounded-full bg-white border-4 border-[#0B1F3A] text-[#0B1F3A] font-extrabold text-sm flex items-center justify-center group-hover:bg-[#0B1F3A] group-hover:text-[#C5A059] group-hover:border-[#C5A059] transition-all shadow-xs">
                    2
                  </div>
                  <div className="bg-[#F3F6FA] p-6 rounded-2xl border border-slate-200/80 group-hover:border-slate-300 transition-all">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      Step 2: Financial Deep-Dive
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      Map cost per job, overhead burden rates, true gross vs. net margins, and historic cash flow leaks.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-10 h-10 rounded-full bg-white border-4 border-[#0B1F3A] text-[#0B1F3A] font-extrabold text-sm flex items-center justify-center group-hover:bg-[#0B1F3A] group-hover:text-[#C5A059] group-hover:border-[#C5A059] transition-all shadow-xs">
                    3
                  </div>
                  <div className="bg-[#F3F6FA] p-6 rounded-2xl border border-slate-200/80 group-hover:border-slate-300 transition-all">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      Step 3: Find the Leaks
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      Identify exactly where profit is being squeezed—from unbilled customer extras and sub overruns to inaccurate sales commissions.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-10 h-10 rounded-full bg-white border-4 border-[#0B1F3A] text-[#0B1F3A] font-extrabold text-sm flex items-center justify-center group-hover:bg-[#0B1F3A] group-hover:text-[#C5A059] group-hover:border-[#C5A059] transition-all shadow-xs">
                    4
                  </div>
                  <div className="bg-[#F3F6FA] p-6 rounded-2xl border border-slate-200/80 group-hover:border-slate-300 transition-all">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      Step 4: Build the Strategy
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      Engineer your customized pricing framework, pay structure redesign, and rolling 13-week cash management protocol.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-10 h-10 rounded-full bg-white border-4 border-[#0B1F3A] text-[#0B1F3A] font-extrabold text-sm flex items-center justify-center group-hover:bg-[#0B1F3A] group-hover:text-[#C5A059] group-hover:border-[#C5A059] transition-all shadow-xs">
                    5
                  </div>
                  <div className="bg-[#F3F6FA] p-6 rounded-2xl border border-slate-200/80 group-hover:border-slate-300 transition-all">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      Step 5: Implement & Track
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      Deploy clear executive dashboards, train leadership on vital KPIs, and run weekly/monthly financial cadence reviews.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-10 h-10 rounded-full bg-white border-4 border-[#0B1F3A] text-[#0B1F3A] font-extrabold text-sm flex items-center justify-center group-hover:bg-[#0B1F3A] group-hover:text-[#C5A059] group-hover:border-[#C5A059] transition-all shadow-xs">
                    6
                  </div>
                  <div className="bg-[#F3F6FA] p-6 rounded-2xl border border-slate-200/80 group-hover:border-slate-300 transition-all">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                      Step 6: Scale With Confidence
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      Grow top-line revenue on a rock-solid, profitable foundation where each new crew and territory increases retained cash.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-14 text-center">
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#C5A059] hover:bg-[#b59048] text-[#0B1F3A] font-extrabold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <span>Schedule Your Free Discovery Call</span>
                  <ArrowRight className="w-5 h-5 text-[#0B1F3A]" />
                </a>
              </div>
            </div>
          </section>

          {/* ================================================================
              6. CASE STUDIES (With Timeframe Badges & Clickable Detail Pages)
              ================================================================ */}
          <section className="py-20 md:py-28 bg-[#F3F6FA] border-y border-slate-200/60" id="case-studies">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full mb-3">
                  Proven Results
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-4">
                  Client Case Studies
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Real operational challenges solved with disciplined financial restructuring. Click any story to see the full step-by-step breakdown.
                </p>
              </div>

              {/* Grid of 5 Case Studies */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CASE_STUDIES.map((study, idx) => (
                  <a
                    key={study.id}
                    href={`#/case/${study.slug}`}
                    className={`bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-xl hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between group ${
                      idx === 0 ? 'lg:col-span-2' : ''
                    }`}
                  >
                    <div>
                      {/* Niche Tag & Timeframe Badge Row */}
                      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                          {study.niche}
                        </span>

                        {/* TIMEFRAME BADGE NEXT TO RESULT */}
                        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0B1F3A] bg-[#C5A059]/20 border border-[#C5A059]/40 px-3 py-1 rounded-full">
                          <Clock className="w-3 h-3 text-[#C5A059]" />
                          <span>{study.timeframeBadge}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] mb-3 group-hover:text-[#15325B] transition-colors">
                        {study.cardHeadline}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {study.challenge}
                      </p>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider group-hover:underline">
                        Read full story &rarr;
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#C5A059] text-slate-600 group-hover:text-[#0B1F3A] flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 text-center text-xs text-slate-400 italic">
                * Results shown are illustrative samples. Individual results vary based on contractor implementation and market conditions.
              </div>
            </div>
          </section>

          {/* ================================================================
              7. WHY WORK WITH ME
              ================================================================ */}
          <section className="py-20 md:py-28 bg-white" id="why-me">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Bio Card */}
                <div className="lg:col-span-5">
                  <div className="bg-[#F3F6FA] border border-slate-200/90 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl" />

                    {/* Profile Photo */}
                    <div className="relative mx-auto w-40 h-40 rounded-full bg-gradient-to-tr from-[#0B1F3A] via-[#1E3A8A] to-[#C5A059] p-1 shadow-xl mb-6 flex items-center justify-center">
                      <Image
                        src="/assets/aistudio/image_9ebc9828.png"
                        alt="Abraham Cohen - Profit & Growth Consultant"
                        width={160}
                        height={160}
                        priority
                        className="w-full h-full rounded-full object-cover object-top"
                      />
                      <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#C5A059] border-2 border-white flex items-center justify-center text-[#0B1F3A] shadow-md" title="Verified Financial Consultant">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-extrabold text-[#0B1F3A]">
                      Abraham Cohen
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">
                      Profit & Growth Consultant
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      I help roofing and home-service business owners fix cash flow, uncover hidden profit leaks, set smarter pricing, and scale profitably. No theoretical jargon—just field-tested financial strategy.
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-full">
                      <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Specialized in Trades ($500K - $15M)</span>
                    </div>
                  </div>
                </div>

                {/* 4 Points */}
                <div className="lg:col-span-7">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full mb-3">
                    Why Work With Me
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-8">
                    Practical Financial Strategy Built For Contractors
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C5A059]/60 shadow-xs transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-4">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-[#0B1F3A] mb-1.5">
                        Roofing-Industry Focused
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        I understand square footage pricing, sub-crew bonuses, insurance claims, supplement disputes, and supplier rebates. No generic advice.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C5A059]/60 shadow-xs transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-4">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-[#0B1F3A] mb-1.5">
                        Plain-English Financials
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        No confusing accounting jargon. I deliver clear dashboards and simple action steps you and your team can execute immediately.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C5A059]/60 shadow-xs transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-4">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-[#0B1F3A] mb-1.5">
                        Practical, Not Theoretical
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Everything is built to work in the field. Systems your project managers and office staff can run without dragging down job production.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#C5A059]/60 shadow-xs transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-4">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-[#0B1F3A] mb-1.5">
                        Results-Driven
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        We gauge success on bank balance growth, higher net margin percentage, and owner peace of mind—not the number of slide decks produced.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              8. FAQ (ACCORDION)
              ================================================================ */}
          <section className="py-20 md:py-28 bg-[#F3F6FA] border-y border-slate-200/60" id="faq">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full mb-3">
                  Answers to Everything
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Straightforward answers about how we work together.
                </p>
              </div>

              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#0B1F3A] hover:text-[#C5A059] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#C5A059]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ================================================================
              9. BOOK A CALL (FINAL CTA - Calendar Removed, High Impact)
              ================================================================ */}
          <section className="py-24 md:py-32 bg-[#0B1F3A] text-white relative overflow-hidden" id="book-call">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/20 px-3.5 py-1 rounded-full mb-4">
                Take Action Today
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                Ready to Know Your True Profit Per Job?
              </h2>

              <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Stop guessing your margins and stressing over seasonal payroll. Book your confidential, 30-minute Profit & Growth Strategy Call with Abraham Cohen today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#b59048] text-[#0B1F3A] font-extrabold text-lg px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <span>Book Your Free Strategy Call</span>
                  <ArrowRight className="w-5 h-5 text-[#0B1F3A]" />
                </a>
              </div>

              <div className="mt-8 text-xs text-slate-400">
                Direct 1-on-1 strategy session &bull; 100% confidential &bull; No high-pressure sales pitch
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ====================================================================
          10. FOOTER (Updated LinkedIn & Clean Contact)
          ==================================================================== */}
      <footer className="bg-[#071527] text-slate-400 pt-16 pb-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-2">
              <span className="text-xl font-extrabold text-white tracking-tight block">
                Abraham Cohen
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] block mb-4">
                Profit & Growth Consulting
              </span>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6">
                Helping roofing and home-service owners find hidden profit leaks, fix cash flow, set smarter pricing, and scale profitably.
              </p>
              <div className="text-xs text-slate-500">
                Serving Roofing & Home-Service Contractors Nationwide
              </div>
            </div>

            {/* Nav */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#how-i-help"
                    className="hover:text-[#C5A059] transition-colors"
                  >
                    How I Help
                  </a>
                </li>
                <li>
                  <a
                    href="#how-i-scale"
                    className="hover:text-[#C5A059] transition-colors"
                  >
                    How I Scale You
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    className="hover:text-[#C5A059] transition-colors"
                  >
                    Consulting Process
                  </a>
                </li>
                <li>
                  <a
                    href="#case-studies"
                    className="hover:text-[#C5A059] transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-[#C5A059] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
                Connect
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${GMAIL_ADDRESS}`}
                    className="hover:text-[#C5A059] transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#C5A059]" />
                    <span>{GMAIL_ADDRESS}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C5A059] transition-colors flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4 text-[#C5A059]" />
                    <span>Coach Abraham Cohen on LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; 2026 Abraham Cohen Consulting. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>Roofing &bull; Construction &bull; Landscaping &bull; Home Services</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
