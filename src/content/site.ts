export const site = {
  name: "FieldBourne Digital",
  tagline: "Run your jobs. Not your inbox.",
  bookingUrl: "https://fieldbournedigital.com.au/#contact",
  email: "admin@fieldbournedigital.com.au",
  abn: "22 324 219 568",
  location: "Beaudesert, QLD",
  caseStudyUrl: "https://fieldbournedigital.com.au/tvmagic.html",
  aboutUrl: "https://fieldbournedigital.com.au/about.html",
};

export const nav = [
  { label: "Home", to: "/" as const },
  { label: "How it works", to: "/how-it-works" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export const heroStats = [
  { value: "3", label: "new leads today" },
  { value: "12", label: "open jobs" },
  { value: "1-click", label: "assign tech" },
];

export const problemStats = [
  {
    value: "3+",
    label: "apps to manage one job",
    body: "Calendar for bookings, messages for updates, spreadsheet for billing. None of it connected, all of it manual.",
  },
  {
    value: "Hours",
    label: "lost every week to admin",
    body: "Chasing confirmations, updating job sheets, copying info from one place to another. Every week, the same grind.",
  },
  {
    value: "Leads",
    label: "that fall through the cracks",
    body: "An enquiry comes in while you're on the tools. By the time you see it, they've called someone else.",
  },
];

export const paths = [
  {
    tag: "Path A",
    title: "Solo or small team",
    body: "Just you, or you plus one apprentice. You want leads captured, fewer double-handled jobs, and less admin at 9pm.",
    bullets: [
      "Never lose a lead again",
      "Stop typing things twice",
      "Self-serve tier launching soon",
    ],
    cta: { label: "Join self-serve waitlist", href: "https://fieldbournedigital.com.au/?path=solo#contact" },
  },
  {
    tag: "Path B",
    title: "Team or franchise",
    body: "Multiple techs or sites. You need one board, not five group chats, and relevant reporting.",
    bullets: [
      "One board, not five group chats",
      "Multi-site reporting",
      "Done-for-you implementation",
    ],
    cta: { label: "Book a free chat", href: "https://fieldbournedigital.com.au/?path=team#contact" },
  },
];

export const steps = [
  {
    n: "01",
    title: "We learn how your business runs today",
    body: "A free 20-minute conversation about your jobs, your team, and where things fall through the cracks. No tech jargon.",
  },
  {
    n: "02",
    title: "We connect your tools",
    body: "SMS, email, phone, calendar, and payments. We wire up the apps you already use so data feeds in automatically. No starting from scratch.",
  },
  {
    n: "03",
    title: "We configure modules for your trade",
    body: "Lead capture, job board, team view, and automations, all shaped around your workflow, not a generic template.",
  },
  {
    n: "04",
    title: "The busywork runs itself",
    body: "New enquiry → job created → tech assigned → follow-up sent. Set the rules once. Works from your phone on the road.",
  },
];

export const outcomes = [
  {
    n: "01",
    title: "Never lose a lead again",
    body: "Missed call on Tuesday. Text on Saturday. Email at midnight. They all land in the same place, so none of them get forgotten.",
  },
  {
    n: "02",
    title: "One board, not five group chats",
    body: "See who's doing what, where, and whether it's done, without texting four techs to find out.",
  },
  {
    n: "03",
    title: "Stop typing things twice",
    body: "Job becomes invoice. Booking becomes a calendar entry. No copy-pasting between apps at 9pm.",
  },
  {
    n: "04",
    title: "Set it once, forget it",
    body: "The follow-up text, the review request, the reminder. They go out whether you remember or not.",
  },
];

export const integrations = [
  { name: "SMS & phone", sub: "Twilio", icon: "MessageSquare" },
  { name: "Email", sub: "Any provider", icon: "Mail" },
  { name: "Calendar", sub: "Google · Apple", icon: "Calendar" },
  { name: "Payments", sub: "Stripe", icon: "CreditCard" },
  { name: "Facebook & Instagram", sub: "Meta lead ads", icon: "Share2" },
  { name: "Google", sub: "Business & Ads", icon: "Search" },
  { name: "Xero", sub: "Soon", icon: "Receipt", soon: true },
  { name: "MYOB", sub: "Soon", icon: "BarChart3", soon: true },
];

export const pricingIncludes = {
  services: [
    "We connect your tools",
    "We streamline your workflow around how you already work",
    "We train you and your team on the system",
  ],
  features: [
    "Unlimited tool connections",
    "Advanced automation and alerts",
    "Team and technician management",
    "Custom job dashboard",
    "Priority support and onboarding",
  ],
};

export const tradeTypes = [
  "TV / antenna service",
  "Electrical",
  "Plumbing",
  "Solar & renewables",
  "HVAC",
  "Franchise head office",
  "Other field service",
];
