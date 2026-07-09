import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface Resource {
  slug: string;
  title?: string;
  excerpt?: string;
  description?: string;
  coverImage?: string;
  category?: string;
  authorName?: string;
  authorPhoto?: string;
  readTime?: string;
  publishedAt?: string;
  date?: string;
}

interface GlassCardProps {
  resource: Resource;
  isFeatured?: boolean;
  bebasFont?: string;
  soraFont?: string;
  monoFont?: string;
}

export default function GlassCard({
  resource,
  isFeatured = false,
  bebasFont,
  soraFont,
  monoFont,
}: GlassCardProps) {
  const title = resource.title || "Untitled Resource";
  const excerpt = resource.excerpt || resource.description || "No description provided.";
  const coverImage =
    resource.coverImage ||
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800";
  const category = resource.category || "Uncategorized";
  const authorName = resource.authorName || "AWS Admin";
  const authorPhoto =
    resource.authorPhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`;
  const readTime = resource.readTime || "5 min read";
  const publishedAt = resource.publishedAt || resource.date || "Just now";

  return (
    <Link
      href={`/resources/${resource.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl transition-all duration-300 border border-white/5",
        "hover:scale-[1.01] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(168,85,247,0.25)]",
        isFeatured ? "min-h-[400px]" : "min-h-[340px]"
      )}
      style={{ background: "rgba(22,27,34,0.6)", backdropFilter: "blur(12px)" }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/80 to-transparent z-10" />

      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes={isFeatured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-700 ease-out"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full p-6 md:p-8 flex flex-col justify-end">
        <div className="mb-4 flex items-center space-x-3">
          <span
            className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md"
            style={{
              background: "rgba(255,153,0,0.9)",
              color: "#0D1117",
              fontFamily: monoFont,
            }}
          >
            {category}
          </span>
          <span
            className="text-sm flex items-center gap-1.5 px-3 py-1 rounded-md border border-white/10 text-white/70"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(12px)",
              fontFamily: monoFont,
            }}
          >
            <Clock size={14} /> {readTime}
          </span>
        </div>

        <h3
          className={cn(
            "text-white mb-3 tracking-wide leading-tight group-hover:text-[#FF9900] transition-colors",
            isFeatured ? "text-5xl lg:text-6xl" : "text-3xl"
          )}
          style={{ fontFamily: bebasFont }}
        >
          {title}
        </h3>

        <p
          className={cn(
            "text-white/70 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6",
            isFeatured ? "max-w-3xl" : ""
          )}
          style={{ fontFamily: soraFont }}
        >
          {excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-auto pt-5 border-t border-white/10">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20">
            <Image src={authorPhoto} alt={authorName} fill unoptimized sizes="36px" className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-wide" style={{ fontFamily: soraFont }}>
              {authorName}
            </span>
            <span
              className="text-xs text-white/50 uppercase tracking-wider"
              style={{ fontFamily: monoFont }}
            >
              {publishedAt}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
