import HeroBio from "@/components/HeroBio";
import AboutSection from "@/components/AboutSection";
import BentoShowcase from "@/components/BentoShowcase";
import StillsCarousel from "@/components/StillsCarousel";
import BrandNetwork from "@/components/BrandNetwork";
import FilmographySection from "@/components/FilmographySection";
import RecentCodingSection from "@/components/RecentCodingSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-gray-100 flex flex-col items-center selection:bg-[#C84B2F]/20 selection:text-[#C84B2F]">
      {/* 1. Hero Section with Full-Bleed Video Ambience & Massive Typography */}
      <HeroBio />

      {/* 2. Statement & Profile: Fikri Mulya Rachmat (About Me) */}
      <AboutSection />

      {/* 3. Featured Works (L&M Living Bento Video Grid — click opens source link) */}
      <BentoShowcase />

      {/* 4. Visual Vault — Flowing 35mm On-Set & BTS Archive Carousel */}
      <StillsCarousel />

      {/* 5. Network & Collaborators — Production House & Brand Logos */}
      <BrandNetwork />

      {/* 6. Production Index (Clean 4-Column Filmography Logbook) */}
      <FilmographySection />

      {/* 7. Recent Coding & Digital Experiments (Secondary Technical Identity) */}
      <RecentCodingSection />

      {/* 8. Minimalist Footer with Direct Links */}
      <ContactSection />
    </main>
  );
}
