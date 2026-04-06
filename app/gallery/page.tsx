"use client";

import dynamic from "next/dynamic";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";

const DomeGallery = dynamic(() => import("@/components/ui/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="text-text-muted">Loading gallery...</div>
    </div>
  ),
});

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    alt: "AWS Cloud Workshop - Students learning cloud computing",
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
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-4">
        <SectionHeader
          label="Gallery"
          title="Moments & Memories"
          subtitle="A visual journey through our events and activities"
        />
      </div>

      <Reveal variant="fadeUp">
        <div className="relative" style={{ width: "100vw", height: "80vh" }}>
          <DomeGallery
            images={GALLERY_IMAGES}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale
            overlayBlurColor="var(--bg-primary, #0A0E17)"
          />
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1200px] px-6 py-8 text-center">
        <p className="text-sm text-text-muted">
          Drag to explore. Click any image to expand.
        </p>
      </div>
    </div>
  );
}
