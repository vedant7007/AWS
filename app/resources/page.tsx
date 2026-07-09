"use client";

import { Bebas_Neue, Sora, Space_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search, Loader2 } from "lucide-react";
import GlassCard from "@/components/resources/GlassCard";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const sora = Sora({ subsets: ["latin"] });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });

const CATEGORIES = [
  "All",
  "AWS Service Guide",
  "Learning Roadmap",
  "Tutorial",
  "Cloud Tips",
  "Certification Guide",
];

interface Resource {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  date?: string;
  coverImage?: string;
  authorName?: string;
  authorPhoto?: string;
  readTime?: string;
  createdAt?: number;
}

const DUMMY_RESOURCES: Resource[] = [
  {
    id: "1",
    slug: "intro-to-aws",
    title: "Mastering EC2 and Lambda",
    excerpt: "Learn the fundamentals of AWS compute services. A comprehensive guide for beginners.",
    category: "AWS Service Guide",
    publishedAt: "Oct 12, 2024",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    authorName: "Jane Doe",
    authorPhoto: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
    readTime: "8 min read",
  },
  {
    id: "2",
    slug: "cloud-practitioner-roadmap",
    title: "Cloud Practitioner Roadmap 2025",
    excerpt: "Step by step guide to clear the foundational cert with flying colors.",
    category: "Learning Roadmap",
    publishedAt: "Nov 01, 2024",
    coverImage: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=800",
    authorName: "Alex Smith",
    authorPhoto: "https://ui-avatars.com/api/?name=Alex+Smith&background=random",
    readTime: "12 min read",
  },
  {
    id: "3",
    slug: "s3-hosting-tutorial",
    title: "Hosting a React App on S3",
    excerpt: "Quick tutorial on deploying SPAs to S3 using CloudFront.",
    category: "Tutorial",
    publishedAt: "Jan 15, 2024",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800",
    authorName: "Sam Wilson",
    authorPhoto: "https://ui-avatars.com/api/?name=Sam+Wilson&background=random",
    readTime: "5 min read",
  },
  {
    id: "4",
    slug: "cost-optimization-tips",
    title: "AWS Cost Optimization Tips",
    excerpt: "Stop overpaying for your cloud infrastructure with these easy tweaks.",
    category: "Cloud Tips",
    publishedAt: "Mar 05, 2025",
    coverImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800",
    authorName: "Emily Chen",
    authorPhoto: "https://ui-avatars.com/api/?name=Emily+Chen&background=random",
    readTime: "4 min read",
  },
  {
    id: "5",
    slug: "solutions-architect-guide",
    title: "Pass Solutions Architect Associate",
    excerpt: "Study strategies and highly tested topics for the SAA-C03 exam.",
    category: "Certification Guide",
    publishedAt: "Apr 02, 2025",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
    authorName: "Marcus Webb",
    authorPhoto: "https://ui-avatars.com/api/?name=Marcus+Webb&background=random",
    readTime: "15 min read",
  },
  {
    id: "6",
    slug: "dynamodb-deepdive",
    title: "DynamoDB Advanced Patterns",
    excerpt: "Single-table design principles and secondary indexes explained.",
    category: "AWS Service Guide",
    publishedAt: "Apr 08, 2025",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
    authorName: "David Kim",
    authorPhoto: "https://ui-avatars.com/api/?name=David+Kim&background=random",
    readTime: "10 min read",
  },
  {
    id: "7",
    slug: "serverless-framework",
    title: "Building APIs with Serverless",
    excerpt: "Deploy API Gateway and Lambda in seconds with the Serverless framework.",
    category: "Tutorial",
    publishedAt: "Apr 10, 2025",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
    authorName: "Jane Doe",
    authorPhoto: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
    readTime: "7 min read",
  },
  {
    id: "8",
    slug: "iam-best-practices",
    title: "IAM Security Best Practices",
    excerpt: "Lock down your AWS account using minimum privileges and policies.",
    category: "AWS Service Guide",
    publishedAt: "May 12, 2025",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    authorName: "Sam Wilson",
    authorPhoto: "https://ui-avatars.com/api/?name=Sam+Wilson&background=random",
    readTime: "9 min read",
  },
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(7);

  useEffect(() => {
    async function fetchResources() {
      try {
        if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
          throw new Error("Firebase not configured");
        }
        const q = query(collection(db, "resources"), where("isPublished", "==", true));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Resource[];
        fetched.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setResources(fetched.length > 0 ? fetched : DUMMY_RESOURCES);
      } catch {
        setResources(DUMMY_RESOURCES);
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  const filtered = resources.filter((r) => {
    const matchSearch =
      (r.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.excerpt || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || r.category === activeCategory;
    return matchSearch && matchCat;
  });

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };

  return (
    <div
      className="min-h-screen pt-24 pb-32"
      style={{ background: "#0D1117", color: "#fff" }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h1
            className="text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-yellow-400 mb-4 drop-shadow-[0_4px_25px_rgba(255,153,0,0.3)]"
            style={{ fontFamily: bebas.style.fontFamily }}
          >
            Knowledge Hub
          </h1>
          <p
            className="text-white/70 max-w-xl text-lg"
            style={{ fontFamily: sora.style.fontFamily }}
          >
            Guides, roadmaps, tutorials, and deep dives to elevate your AWS Cloud journey.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between p-4 rounded-2xl border border-white/5"
          style={{ background: "rgba(22,27,34,0.5)", backdropFilter: "blur(12px)" }}>
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2"
              size={18}
              style={{ color: "rgba(255,255,255,0.4)" }}
            />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none transition-colors"
              style={{
                background: "rgba(13,17,23,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontFamily: sora.style.fontFamily,
              }}
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(7); }}
                className="whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all duration-300"
                style={{
                  fontFamily: spaceMono.style.fontFamily,
                  background: activeCategory === cat ? "#FF9900" : "rgba(255,255,255,0.05)",
                  color: activeCategory === cat ? "#0D1117" : "rgba(255,255,255,0.7)",
                  boxShadow: activeCategory === cat ? "0 0 15px rgba(255,153,0,0.4)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div
            className="flex flex-col items-center justify-center py-20 animate-pulse gap-4"
            style={{ color: "#FF9900", fontFamily: spaceMono.style.fontFamily }}
          >
            <Loader2 className="animate-spin" size={32} />
            Loading Knowledge Hub...
          </div>
        ) : displayed.length > 0 ? (
          <>
            <motion.div
              key={activeCategory + search}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {displayed.map((res, idx) => (
                <motion.div
                  key={res.id}
                  variants={item}
                  className={idx === 0 ? "md:col-span-2 lg:col-span-3" : ""}
                >
                  <GlassCard resource={res} isFeatured={idx === 0} bebasFont={bebas.style.fontFamily} soraFont={sora.style.fontFamily} monoFont={spaceMono.style.fontFamily} />
                </motion.div>
              ))}
            </motion.div>

            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setVisibleCount((p) => p + 6)}
                  className="group relative px-8 py-3 rounded-full overflow-hidden transition-all"
                  style={{
                    background: "#161B22",
                    border: "1px solid rgba(255,153,0,0.3)",
                    color: "#FF9900",
                    fontFamily: spaceMono.style.fontFamily,
                  }}
                >
                  <span className="relative z-10 font-bold tracking-widest uppercase text-sm">
                    Load More Resources
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            className="text-center py-32 rounded-3xl border border-white/5"
            style={{ background: "rgba(22,27,34,0.5)", fontFamily: sora.style.fontFamily }}
          >
            <Search className="mx-auto mb-4" size={48} style={{ color: "rgba(255,255,255,0.2)" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
              No resources found
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Try tweaking your search or changing the category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
