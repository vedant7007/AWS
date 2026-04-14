"use client";

import { Bebas_Neue, Sora } from "next/font/google";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const sora = Sora({ subsets: ["latin"] });

const DomeGallery = dynamic(() => import("@/components/ui/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[100vh] items-center justify-center bg-black">
      <div
        className="animate-pulse"
        style={{ color: "#8B5CF6", fontFamily: "monospace" }}
      >
        Loading Galaxy...
      </div>
    </div>
  ),
});

interface GalleryImage {
  src: string;
  alt: string;
}

const FALLBACK_IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    alt: "AWS Cloud Workshop — Students learning cloud computing",
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
    alt: "Hackathon team brainstorming session",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    alt: "Tech talk with industry professionals",
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
    alt: "AWS Community Day event",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    alt: "Team collaboration during build day",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
    alt: "Group photo after certification workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
    alt: "Keynote presentation at tech summit",
  },
  {
    src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop",
    alt: "Students coding during workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    alt: "Club members working on cloud project",
  },
  {
    src: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=600&h=400&fit=crop",
    alt: "AWS certification celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    alt: "Innovation lab session",
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    alt: "Networking event with AWS professionals",
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    alt: "Coding session — cloud architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    alt: "Laptop open at hackathon",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    alt: "AWS CloudFront dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    alt: "Cloud infrastructure visualization",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    alt: "Matrix style code display",
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    alt: "Team discussion at whiteboard",
  },
  {
    src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=400&fit=crop",
    alt: "Cloud computing concept art",
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    alt: "Server room infrastructure",
  },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
          throw new Error("Firebase config not set");
        }
        const snapshot = await getDocs(collection(db, "galleryImages"));
        const fetched: GalleryImage[] = snapshot.docs.map((doc) => ({
          src: doc.data().imageUrl || doc.data().url || "",
          alt: doc.data().caption || "Gallery Image",
        }));
        setImages(fetched.length > 0 ? fetched : FALLBACK_IMAGES);
      } catch {
        setImages(FALLBACK_IMAGES);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Animated Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        className="absolute top-6 md:top-10 w-full z-50 text-center pointer-events-none flex flex-col items-center"
      >
        <h1
          className="text-5xl md:text-[6rem] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-400 drop-shadow-[0_4px_15px_rgba(168,85,247,0.5)]"
          style={{ fontFamily: bebas.style.fontFamily }}
        >
          MOMENTS & MEMORIES
        </h1>
        <p
          className="text-sm md:text-lg text-purple-200/80 mt-2 tracking-widest font-semibold"
          style={{ fontFamily: sora.style.fontFamily }}
        >
          AWS CLOUD CLUB VJIT — OUR JOURNEY
        </p>
        <p
          className="text-xs text-purple-400/50 mt-1 tracking-wider"
          style={{ fontFamily: sora.style.fontFamily }}
        >
          Drag to explore · Click any image to expand
        </p>
      </motion.div>

      {/* Gallery Layer */}
      <div className="absolute inset-0 z-10 w-full h-full">
        {loading ? (
          <div
            className="w-full h-full flex justify-center items-center animate-pulse"
            style={{ color: "#8B5CF6", fontFamily: "monospace" }}
          >
            Loading Galaxy...
          </div>
        ) : (
          <DomeGallery
            images={images}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            autoRotationSpeed={0.3}
            grayscale={false}
            overlayBlurColor="#000000"
          />
        )}
      </div>
    </div>
  );
}
