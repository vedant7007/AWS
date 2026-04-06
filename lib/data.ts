// ============================================
// AWS Cloud Club VJIT — Centralized Data Store
// ============================================

// Navigation
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Feedback", href: "/feedback" },
] as const;

// Hero Stats
export const heroStats = [
  { value: 150, suffix: "+", label: "Members" },
  { value: 30, suffix: "+", label: "Events" },
  { value: 20, suffix: "+", label: "Certified" },
  { value: 15, suffix: "+", label: "Projects" },
] as const;

// Hero Typewriter Phrases
export const typewriterPhrases = [
  "Student-Led Cloud Community at VJIT, Hyderabad",
  "Hands-on AWS Workshops & Bootcamps",
  "Certification Prep & Career Growth",
  "Part of the Global AWS Cloud Club Network",
];

// Trust/Affiliation Logos
export const trustLogos = [
  { name: "Amazon Web Services", short: "AWS" },
  { name: "VJIT", short: "VJIT" },
  { name: "AWS Educate", short: "Educate" },
  { name: "AWS Cloud Club", short: "Cloud Club" },
];

// About Cards
export const aboutCards = [
  {
    icon: "⚡",
    title: "Workshops & Bootcamps",
    description:
      "Hands-on sessions covering EC2, Lambda, S3, DynamoDB, and more AWS services",
  },
  {
    icon: "🏗️",
    title: "Hackathons & Build Days",
    description:
      "48-hour cloud challenges with real AWS credits and mentorship",
  },
  {
    icon: "📜",
    title: "Certification Prep",
    description:
      "Study groups, mock exams, and voucher support for AWS certifications",
  },
  {
    icon: "🌐",
    title: "Community & Networking",
    description:
      "Connect with AWS Heroes, Community Builders, and professionals worldwide",
  },
];

// Timeline Milestones
export const timelineMilestones = [
  { year: "2022", label: "Club Founded" },
  { year: "2022", label: "First Event" },
  { year: "2023", label: "First Certification" },
  { year: "2023", label: "Hackathon Win" },
  { year: "2024", label: "50 Members" },
  { year: "2024", label: "Community Day" },
  { year: "2025", label: "100+ Members" },
  { year: "2026", label: "Present" },
];

// Benefits
export const benefits = [
  {
    icon: "🖥️",
    title: "Hands-on Skills",
    description: "Build real projects on AWS infrastructure",
    color: "#FF9900",
  },
  {
    icon: "📜",
    title: "AWS Certifications",
    description: "Get certified with group study & voucher support",
    color: "#4DA6FF",
  },
  {
    icon: "☁️",
    title: "Free AWS Credits",
    description: "Access AWS credits for personal projects",
    color: "#2DD4BF",
  },
  {
    icon: "🚀",
    title: "Career Boost",
    description: "Add AWS skills & club leadership to your resume",
    color: "#A78BFA",
  },
  {
    icon: "🌐",
    title: "Global Network",
    description: "Connect with 500+ AWS Cloud Clubs worldwide",
    color: "#F472B6",
  },
  {
    icon: "🎤",
    title: "Leadership",
    description: "Lead events, manage teams, develop soft skills",
    color: "#FBBF24",
  },
  {
    icon: "🎪",
    title: "Exclusive Events",
    description:
      "VIP access to AWS summits, Community Days, re:Invent watch parties",
    color: "#EF4444",
  },
  {
    icon: "🎁",
    title: "Swag & Recognition",
    description: "AWS swag, certificates, LinkedIn recommendations",
    color: "#10B981",
  },
];

// Achievements
export const achievements = [
  { icon: "🏆", value: 20, suffix: "+", label: "AWS Certifications" },
  { icon: "🎯", value: 5, suffix: "", label: "Hackathon Wins" },
  { icon: "🌍", value: 3800, suffix: "+", label: "Community Reach" },
];

// Marquee Items
export const marqueeItems = [
  "AWS Cloud Practitioner",
  "AWS Solutions Architect",
  "AWS Developer Associate",
  "HackWithAWS Winner",
  "Community Day Speaker",
  "AWS re:Invent Scholar",
  "Cloud Build Champion",
  "AWS Educate Partner",
];

// Testimonials
export const testimonials = [
  {
    quote:
      "AWS Cloud Club completely changed my career trajectory. I went from knowing nothing about cloud to getting my CCP certification in 3 months.",
    name: "Priya Sharma",
    role: "3rd Year CSE • AWS CCP Certified",
  },
  {
    quote:
      "The hackathons and workshops gave me real-world skills that no classroom could teach. Plus, the community is incredibly supportive.",
    name: "Rahul Verma",
    role: "4th Year IT • AWS SAA Certified",
  },
  {
    quote:
      "Being part of this club opened doors I didn't even know existed. From AWS credits to networking with industry professionals.",
    name: "Ananya Reddy",
    role: "2nd Year ECE • Cloud Enthusiast",
  },
  {
    quote:
      "The study groups helped me crack my certification on the first attempt. The mentorship here is unmatched.",
    name: "Karthik Nair",
    role: "3rd Year CSE • AWS DVA Certified",
  },
  {
    quote:
      "From hackathon newbie to hackathon winner — that's my Cloud Club journey. The team spirit here is incredible.",
    name: "Sneha Patel",
    role: "3rd Year IT • Hackathon Winner",
  },
];

// FAQ Items
export const faqItems = [
  {
    question: "Who can join the club?",
    answer:
      "Any VJIT student from any branch or year. No prior cloud experience needed — we welcome absolute beginners!",
  },
  {
    question: "Is there a membership fee?",
    answer:
      "No! It's completely free. AWS provides resources and credits for our members.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "Not at all. We have tracks for absolute beginners. Our workshops start from the basics and gradually build up.",
  },
  {
    question: "How do I get AWS credits?",
    answer:
      "Members get access through AWS Educate and club-specific programs. We'll guide you through the process.",
  },
  {
    question: "How often are events held?",
    answer:
      "We host 2-4 events per month including workshops, talks, and hackathons. Check our events page for the latest schedule.",
  },
  {
    question: "Can I get certified through the club?",
    answer:
      "Yes! We provide study groups, resources, and certification voucher support to help you earn AWS certifications.",
  },
];

// Events
export type EventType =
  | "Workshop"
  | "Hackathon"
  | "Guest Talk"
  | "Study Group"
  | "Community Day";
export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  level: DifficultyLevel;
  date: string;
  time: string;
  venue: string;
  totalSeats: number;
  registeredSeats: number;
  isFeatured?: boolean;
  isPast?: boolean;
}

export const events: Event[] = [
  {
    id: "evt-1",
    title: "Serverless Workshop: Build with Lambda & API Gateway",
    description:
      "Learn to build serverless applications using AWS Lambda and API Gateway. Deploy a fully functional REST API by the end of the session.",
    type: "Workshop",
    level: "Beginner",
    date: "2026-02-15",
    time: "10:00 AM - 1:00 PM",
    venue: "VJIT Seminar Hall A",
    totalSeats: 30,
    registeredSeats: 18,
    isFeatured: true,
  },
  {
    id: "evt-2",
    title: "Cloud Build Day: 24-Hour Hackathon",
    description:
      "A 24-hour hackathon where teams build innovative cloud solutions. Real AWS credits, mentorship, and prizes await!",
    type: "Hackathon",
    level: "Intermediate",
    date: "2026-02-22",
    time: "9:00 AM (24 hrs)",
    venue: "VJIT Innovation Lab",
    totalSeats: 50,
    registeredSeats: 35,
  },
  {
    id: "evt-3",
    title: "AWS Hero Fireside Chat",
    description:
      "An intimate fireside chat with an AWS Hero. Learn about career paths, cloud architecture, and industry insights.",
    type: "Guest Talk",
    level: "All Levels",
    date: "2026-03-01",
    time: "4:00 PM - 5:30 PM",
    venue: "VJIT Auditorium",
    totalSeats: 100,
    registeredSeats: 42,
  },
  {
    id: "evt-4",
    title: "CCP Certification Study Group (Week 1)",
    description:
      "Join our structured study group for the AWS Cloud Practitioner exam. Week 1 covers cloud concepts and AWS global infrastructure.",
    type: "Study Group",
    level: "Beginner",
    date: "2026-03-05",
    time: "5:00 PM - 6:30 PM",
    venue: "VJIT Room 301",
    totalSeats: 25,
    registeredSeats: 12,
  },
  {
    id: "evt-5",
    title: "Community Day Hyderabad Prep",
    description:
      "Preparation session for the upcoming AWS Community Day Hyderabad. Help us organize talks, workshops, and activities.",
    type: "Community Day",
    level: "All Levels",
    date: "2026-03-10",
    time: "3:00 PM - 5:00 PM",
    venue: "VJIT Conference Room",
    totalSeats: 40,
    registeredSeats: 15,
  },
  {
    id: "evt-6",
    title: "DevOps on AWS: CI/CD Pipeline Workshop",
    description:
      "Build an end-to-end CI/CD pipeline using AWS CodePipeline, CodeBuild, and CodeDeploy. Automate your deployments like a pro.",
    type: "Workshop",
    level: "Intermediate",
    date: "2026-03-15",
    time: "10:00 AM - 2:00 PM",
    venue: "VJIT Lab Block B",
    totalSeats: 30,
    registeredSeats: 22,
  },
];

// Event categories for filters
export const eventCategories = [
  "All",
  "Workshop",
  "Hackathon",
  "Guest Talk",
  "Study Group",
  "Community Day",
] as const;

// Team Data — Real members
export interface TeamSubMember {
  name: string;
  subRole?: string;
  social?: string;
}

export interface TeamLead {
  id: string;
  name: string;
  role: string;
  tagline: string;
  socials: { linkedin?: string; github?: string; twitter?: string };
  color: string;
  teamMembers: TeamSubMember[];
}

export interface TeamData {
  captain: {
    name: string;
    role: string;
    tagline: string;
    socials: { linkedin?: string; github?: string; twitter?: string };
    color: string;
  };
  leads: TeamLead[];
  recruitment: {
    isOpen: boolean;
    message: string;
    ctaText: string;
    ctaLink: string;
  };
}

export const teamData: TeamData = {
  captain: {
    name: "Devidi Ruthvik Reddy",
    role: "Club Captain",
    tagline:
      "Leading AWS Cloud Club VJIT\u2019s mission to build the next generation of cloud professionals",
    socials: { linkedin: "#", github: "#", twitter: "#" },
    color: "#FF9900",
  },
  leads: [
    {
      id: "tech",
      name: "Vedant M Idlgave",
      role: "Tech Lead",
      tagline: "Building the infrastructure and leading all technical initiatives",
      socials: { linkedin: "#", github: "#", twitter: "#" },
      color: "#4DA6FF",
      teamMembers: [
        { name: "Ananya Sharma", subRole: "Cloud Dev", social: "#" },
        { name: "Karthik Reddy", subRole: "Solutions Architect", social: "#" },
        { name: "Sneha Patel", subRole: "ML Engineer", social: "#" },
        { name: "Arjun Verma", subRole: "DevOps", social: "#" },
        { name: "Priya Rao", subRole: "Backend", social: "#" },
        { name: "Rahul Singh", subRole: "Cloud Security", social: "#" },
        { name: "Ishita Jain", subRole: "Data Engineer", social: "#" },
        { name: "Siddharth M", subRole: "SysAdmin", social: "#" },
        { name: "Tanu Shree", subRole: "Cloud Ops", social: "#" }
      ],
    },
    {
      id: "events",
      name: "Sai Srujan",
      role: "Event Management Lead",
      tagline: "Orchestrating workshops, hackathons, and community events",
      socials: { linkedin: "#", github: "#" },
      color: "#2DD4BF",
      teamMembers: [
        { name: "Vikram Shah", subRole: "Event Lead", social: "#" },
        { name: "Megha Gupta", subRole: "Logistics", social: "#" },
        { name: "Aman Gupta", subRole: "Outreach", social: "#" },
        { name: "Riya Sen", subRole: "Hospitality", social: "#" },
        { name: "Varun K", subRole: "Registrations", social: "#" },
        { name: "Kiran P", subRole: "Venue Mgmt", social: "#" },
        { name: "Saira Banu", subRole: "PR", social: "#" },
        { name: "Nitin R", subRole: "Sponsorship", social: "#" },
        { name: "Aditi S", subRole: "Volunteer Head", social: "#" }
      ],
    },
    {
      id: "production",
      name: "Jithendra",
      role: "Production Lead",
      tagline: "Managing content production, video, and event documentation",
      socials: { linkedin: "#", github: "#" },
      color: "#A78BFA",
      teamMembers: [
        { name: "Samit R", subRole: "Video Editor", social: "#" },
        { name: "Divya K", subRole: "Content Writer", social: "#" },
        { name: "Harsh V", subRole: "Cinematographer", social: "#" },
        { name: "Tanya M", subRole: "Social Media", social: "#" },
        { name: "Rohan J", subRole: "Photographer", social: "#" },
        { name: "Navya G", subRole: "Script Writer", social: "#" },
        { name: "Abhay D", subRole: "Audio Eng", social: "#" },
        { name: "Sanya L", subRole: "VFX", social: "#" },
        { name: "Manish T", subRole: "DOP", social: "#" }
      ],
    },
    {
      id: "design",
      name: "Sai Medha",
      role: "Design Lead",
      tagline: "Crafting the visual identity and creative direction of the club",
      socials: { linkedin: "#", github: "#" },
      color: "#F472B6",
      teamMembers: [
        { name: "Akash B", subRole: "UI Designer", social: "#" },
        { name: "Tanu S", subRole: "Graphics", social: "#" },
        { name: "Zoya R", subRole: "Illustrator", social: "#" },
        { name: "Kunal M", subRole: "UX Research", social: "#" },
        { name: "Shivani P", subRole: "Brand Designer", social: "#" },
        { name: "Arman K", subRole: "3D Artist", social: "#" },
        { name: "Mona L", subRole: "Motion Graphics", social: "#" },
        { name: "Deepak S", subRole: "Web Design", social: "#" },
        { name: "Esha V", subRole: "Typography", social: "#" }
      ],
    },
    {
      id: "marketing",
      name: "Sameera",
      role: "Marketing Lead",
      tagline: "Driving outreach, social media presence, and club visibility",
      socials: { linkedin: "#", github: "#" },
      color: "#FBBF24",
      teamMembers: [
        { name: "Tarun K", subRole: "Content Lead", social: "#" },
        { name: "Ishita J", subRole: "SM Manager", social: "#" },
        { name: "Yash G", subRole: "Campaign Lead", social: "#" },
        { name: "Barkha S", subRole: "Blogger", social: "#" },
        { name: "Pranav M", subRole: "Analytics", social: "#" },
        { name: "Shreya T", subRole: "SEO Specialist", social: "#" },
        { name: "Karan D", subRole: "Ads Manager", social: "#" },
        { name: "Naina L", subRole: "Email Mkt", social: "#" },
        { name: "Rajat B", subRole: "Influencer Lead", social: "#" }
      ],
    },
  ],
  recruitment: {
    isOpen: false,
    message:
      "Recruitments are currently closed. Follow us on social media to be notified when applications open!",
    ctaText: "Get Notified \u2192",
    ctaLink: "#",
  },
};

// Gallery Events — Immersive gallery data
export interface GalleryPhoto {
  src: string;
  caption: string;
}

export interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  coverImage: string;
  category: string;
  icon: string;
  color: string;
  photos: GalleryPhoto[];
  stats: { attendees: number; duration: string; rating: string };
}

export const galleryEvents: GalleryEvent[] = [
  {
    id: "serverless-workshop-jan",
    title: "Serverless Workshop",
    date: "January 2026",
    description:
      "Hands-on workshop covering AWS Lambda, API Gateway, and DynamoDB. 40+ students built their first serverless API.",
    coverImage: "/gallery/serverless-cover.jpg",
    category: "Workshop",
    icon: "\u26A1",
    color: "#4DA6FF",
    photos: [
      { src: "/gallery/serverless-1.jpg", caption: "Students coding their first Lambda function" },
      { src: "/gallery/serverless-2.jpg", caption: "Group photo after the workshop" },
      { src: "/gallery/serverless-3.jpg", caption: "Live demo of the serverless API" },
      { src: "/gallery/serverless-4.jpg", caption: "Q&A session with the instructor" },
      { src: "/gallery/serverless-5.jpg", caption: "Certificate distribution" },
      { src: "/gallery/serverless-6.jpg", caption: "Behind the scenes setup" },
    ],
    stats: { attendees: 42, duration: "3 hours", rating: "4.8/5" },
  },
  {
    id: "cloud-build-day",
    title: "Cloud Build Day Hackathon",
    date: "February 2026",
    description:
      "24-hour hackathon where 8 teams competed to build innovative cloud-native applications.",
    coverImage: "/gallery/hackathon-cover.jpg",
    category: "Hackathon",
    icon: "\uD83C\uDFD7\uFE0F",
    color: "#2DD4BF",
    photos: [
      { src: "/gallery/hack-1.jpg", caption: "Teams brainstorming at midnight" },
      { src: "/gallery/hack-2.jpg", caption: "The winning team celebrating" },
      { src: "/gallery/hack-3.jpg", caption: "Judges reviewing demos" },
      { src: "/gallery/hack-4.jpg", caption: "Late night coding sessions" },
      { src: "/gallery/hack-5.jpg", caption: "Pizza break at 2 AM" },
    ],
    stats: { attendees: 48, duration: "24 hours", rating: "4.9/5" },
  },
  {
    id: "aws-hero-talk",
    title: "AWS Hero Fireside Chat",
    date: "March 2026",
    description:
      "An intimate session with an AWS Community Hero discussing career paths in cloud computing.",
    coverImage: "/gallery/hero-talk-cover.jpg",
    category: "Guest Talk",
    icon: "\uD83C\uDF99\uFE0F",
    color: "#A78BFA",
    photos: [
      { src: "/gallery/talk-1.jpg", caption: "The AWS Hero on stage" },
      { src: "/gallery/talk-2.jpg", caption: "Packed auditorium" },
      { src: "/gallery/talk-3.jpg", caption: "Networking session after the talk" },
      { src: "/gallery/talk-4.jpg", caption: "Group photo with the speaker" },
    ],
    stats: { attendees: 80, duration: "2 hours", rating: "4.7/5" },
  },
  {
    id: "community-day-prep",
    title: "Community Day Hyderabad Prep",
    date: "March 2026",
    description:
      "Team preparation session for the upcoming AWS Community Day Hyderabad event.",
    coverImage: "/gallery/community-cover.jpg",
    category: "Community",
    icon: "\uD83C\uDF10",
    color: "#F472B6",
    photos: [
      { src: "/gallery/comm-1.jpg", caption: "Planning the booth design" },
      { src: "/gallery/comm-2.jpg", caption: "Rehearsing demo presentations" },
      { src: "/gallery/comm-3.jpg", caption: "Team meeting and task assignment" },
    ],
    stats: { attendees: 15, duration: "4 hours", rating: "4.6/5" },
  },
  {
    id: "cert-study-group",
    title: "CCP Certification Study Group",
    date: "January 2026",
    description:
      "Weekly study group sessions preparing members for the AWS Cloud Practitioner exam.",
    coverImage: "/gallery/cert-cover.jpg",
    category: "Study Group",
    icon: "\uD83D\uDCDA",
    color: "#FBBF24",
    photos: [
      { src: "/gallery/cert-1.jpg", caption: "Mock exam practice session" },
      { src: "/gallery/cert-2.jpg", caption: "Whiteboard session on cloud concepts" },
      { src: "/gallery/cert-3.jpg", caption: "Celebrating first batch of certifications" },
      { src: "/gallery/cert-4.jpg", caption: "Study materials and resources" },
    ],
    stats: { attendees: 25, duration: "Ongoing (8 weeks)", rating: "4.8/5" },
  },
  {
    id: "inauguration",
    title: "Club Inauguration Ceremony",
    date: "December 2025",
    description:
      "The official launch of AWS Cloud Club at VJIT with faculty, AWS representatives, and founding members.",
    coverImage: "/gallery/inaug-cover.jpg",
    category: "Community",
    icon: "\uD83C\uDF89",
    color: "#10B981",
    photos: [
      { src: "/gallery/inaug-1.jpg", caption: "Ribbon cutting ceremony" },
      { src: "/gallery/inaug-2.jpg", caption: "Founding team on stage" },
      { src: "/gallery/inaug-3.jpg", caption: "AWS representative keynote" },
      { src: "/gallery/inaug-4.jpg", caption: "First ever group photo" },
      { src: "/gallery/inaug-5.jpg", caption: "Faculty blessing the initiative" },
    ],
    stats: { attendees: 100, duration: "3 hours", rating: "5.0/5" },
  },
];

export const galleryCategories = [
  "All",
  "Workshop",
  "Hackathon",
  "Guest Talk",
  "Community",
  "Study Group",
] as const;

// Social Links
export const socialLinks = [
  { name: "LinkedIn", href: "#", icon: "Linkedin" },
  { name: "Twitter", href: "#", icon: "Twitter" },
  { name: "Instagram", href: "#", icon: "Instagram" },
  { name: "Discord", href: "#", icon: "MessageCircle" },
  { name: "GitHub", href: "#", icon: "Github" },
  { name: "YouTube", href: "#", icon: "Youtube" },
] as const;

// Footer Links
export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Join", href: "#join" },
  ],
  resources: [
    { label: "AWS Free Tier", href: "https://aws.amazon.com/free/" },
    { label: "AWS Educate", href: "https://aws.amazon.com/education/awseducate/" },
    { label: "Certification Guide", href: "#" },
    { label: "GitHub Repos", href: "#" },
    { label: "Club Guidelines", href: "#" },
  ],
  connect: [
    { label: "Discord Server", href: "#" },
    { label: "WhatsApp Group", href: "#" },
    { label: "Newsletter", href: "#" },
    { label: "Contact Us", href: "/contact" },
    { label: "Feedback", href: "/feedback" },
  ],
};

// Contact Subjects
export const contactSubjects = [
  "General Inquiry",
  "Sponsorship",
  "Collaboration",
  "Event Request",
  "Other",
] as const;

// Feedback Emojis
export const feedbackEmojis = [
  { emoji: "😐", label: "Okay", value: 1 },
  { emoji: "😊", label: "Good", value: 2 },
  { emoji: "😃", label: "Great", value: 3 },
  { emoji: "🤩", label: "Amazing", value: 4 },
  { emoji: "🔥", label: "Incredible", value: 5 },
];

// Feedback categories
export const feedbackCategories = [
  "Workshops",
  "Hackathons",
  "Guest Talks",
  "Community",
  "Resources",
  "Team",
];
