import { Bebas_Neue, Sora, Space_Mono } from "next/font/google";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/atom-one-dark.css";
import ReadingProgress from "@/components/resources/ReadingProgress";
import StickyTOC from "@/components/resources/StickyTOC";
import ShareBar from "@/components/resources/ShareBar";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const sora = Sora({ subsets: ["latin"] });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });

const MOCK_MDX = `
Welcome to this essential guide. In this article we'll cover the fundamentals.

## Getting Started

AWS provides a broad set of global cloud-based products including compute, storage, databases, analytics, networking, mobile, developer tools, management tools, IoT, security and enterprise applications.

\`\`\`javascript
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

ec2.describeInstances({}, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});
\`\`\`

## Core Concepts

Understanding the core concepts is essential to building cloud-native applications.

### When to Use EC2

- Long-running workloads
- Custom OS configurations
- High memory or compute requirements

### When to Use Lambda

- Event-driven applications
- Short-lived tasks (max 15 min)
- Microservice architectures

| Feature | EC2 | Lambda |
|---------|-----|--------|
| Pricing | Per Hour | Per Compute ms |
| Management | IaaS | Serverless |
| Max Runtime | Unlimited | 15 minutes |

## Best Practices

Follow these best practices for production workloads.

> Always tag your AWS resources. It makes cost tracking and governance dramatically easier.

Use IAM roles instead of access keys wherever possible, and enable CloudTrail for audit logging.
`;

const MOCK_RESOURCE = {
  title: "Mastering EC2 and Lambda",
  publishedAt: "Oct 12, 2024",
  category: "AWS Service Guide",
  authorName: "Jane Doe",
  authorPhoto: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
  readTime: "8 min read",
  coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
};

interface ResourceData {
  title?: string;
  publishedAt?: string;
  date?: string;
  category?: string;
  authorName?: string;
  authorPhoto?: string;
  readTime?: string;
  coverImage?: string;
  content?: string;
}

export default async function ResourceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let markdownContent = MOCK_MDX;
  let resourceInfo: ResourceData = MOCK_RESOURCE;

  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId && projectId !== "PLACEHOLDER") {
      const q = query(collection(db, "resources"), where("slug", "==", slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data() as ResourceData;
        if (data.content) markdownContent = data.content;
        resourceInfo = data;
      }
    }
  } catch (err) {
    console.error("Error fetching resource:", err);
  }

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rehypePlugins: [rehypeHighlight as any],
    },
  };

  const cover = resourceInfo.coverImage || MOCK_RESOURCE.coverImage;
  const author = resourceInfo.authorName || "AWS Admin";
  const authorPhoto =
    resourceInfo.authorPhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random`;

  return (
    <div
      className="min-h-screen pt-20 pb-32"
      style={{ background: "#0D1117", color: "#fff", fontFamily: sora.style.fontFamily }}
    >
      <ReadingProgress />

      {/* Hero Cover */}
      <div className="relative w-full h-[50vh] md:h-[60vh] max-h-[600px] mb-12 flex justify-center items-end overflow-hidden">
        <Image
          src={cover}
          alt={resourceInfo.title || "Resource"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/60 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-3xl px-4 md:px-6 pb-8 md:pb-16 pt-32">
          <Link
            href="/resources"
            className="inline-flex items-center mb-6 px-3 py-1.5 rounded-full backdrop-blur-md text-sm transition-colors"
            style={{
              color: "#FF9900",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: spaceMono.style.fontFamily,
            }}
          >
            <ChevronLeft size={16} className="mr-1" /> Back to Knowledge Hub
          </Link>

          <div className="flex flex-wrap gap-3 mb-5">
            <span
              className="px-3 py-1 text-xs font-bold uppercase rounded-md"
              style={{
                background: "#FF9900",
                color: "#0D1117",
                fontFamily: spaceMono.style.fontFamily,
              }}
            >
              {resourceInfo.category}
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl leading-tight text-white drop-shadow-md tracking-wide mb-6"
            style={{ fontFamily: bebas.style.fontFamily }}
          >
            {resourceInfo.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                <Image src={authorPhoto} alt={author} fill unoptimized sizes="40px" className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm">{author}</p>
                <p
                  className="text-xs text-white/50 uppercase tracking-wider"
                  style={{ fontFamily: spaceMono.style.fontFamily }}
                >
                  {resourceInfo.publishedAt || resourceInfo.date}
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/20" />

            <div
              className="flex items-center gap-2 text-sm text-white/60 px-3 py-1.5 rounded-lg border border-white/10"
              style={{
                background: "rgba(255,255,255,0.05)",
                fontFamily: spaceMono.style.fontFamily,
              }}
            >
              <Clock size={16} style={{ color: "#FF9900" }} />
              {resourceInfo.readTime || "5 min read"}
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="container mx-auto px-4 max-w-7xl flex flex-col xl:flex-row gap-12 items-start">
        {/* Main article */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-3xl">
            <ShareBar title={resourceInfo.title || "AWS Cloud Club Resource"} />
            <article className="article-content markdown-body block">
              <MDXRemote source={markdownContent} options={mdxOptions} />
            </article>
          </div>
        </div>

        {/* Sticky TOC */}
        <StickyTOC htmlContent={markdownContent} monoFont={spaceMono.style.fontFamily} />
      </div>
    </div>
  );
}
